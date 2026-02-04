import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'node:crypto';
import { prisma } from '../../../prisma/prisma.js';
import { config } from '../../config/env.js';
import type { JwtPayload } from '../../types/index.js';
import { BadRequestError, UnauthorizedError } from '../../utils/app-error.js';
import type { LoginInput, RegisterInput } from './auth.schema.js';

const SALT_ROUNDS = 10;
const USED_REFRESH_MAX = 50_000;
const usedRefreshTokens = new Map<string, string>();

function markTokenUsed(token: string, userId: string): void {
  if (usedRefreshTokens.size >= USED_REFRESH_MAX) usedRefreshTokens.clear();
  usedRefreshTokens.set(token, userId);
}

export const authService = {
  async register(input: RegisterInput) {
    try {
      const user = await prisma.user.create({
        data: {
          email: input.email,
          passwordHash: await bcrypt.hash(input.password, SALT_ROUNDS),
        },
      });
      return { id: user.id, email: user.email };
    } catch (error) {
      const prismaError = error as { code?: string };
      if (prismaError?.code === 'P2002') {
        throw new BadRequestError('Email already registered');
      }
      throw new BadRequestError(error instanceof Error ? error.message : 'Registration failed');
    }
  },

  async login(input: LoginInput) {
    const user = await prisma.user.findUnique({ where: { email: input.email } });
    console.log('user', user);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }
    console.log('user.passwordHash', user.passwordHash);
    const valid = await bcrypt.compare(input.password, user.passwordHash);
    console.log('valid', valid);
    if (!valid) {
      throw new UnauthorizedError('Invalid email or password');
    }
    console.log('valid', valid);

    const accessToken = this.issueAccessToken(user.id, user.email);
    const refreshToken = await this.issueRefreshToken(user.id);

    return {
      user: { id: user.id, email: user.email },
      accessToken,
      refreshToken: refreshToken.token,
      accessMaxAgeMs: config.jwt.accessExpiresMs,
      refreshMaxAgeMs: config.jwt.refreshExpiresMs,
    };
  },

  async logout(userId: string) {
    await prisma.refreshToken.deleteMany({ where: { userId } });
  },

  async refresh(refreshToken: string | undefined) {
    if (!refreshToken) {
      throw new UnauthorizedError('No refresh token');
    }

    // Check for token reuse
    const userIdFromReuse = usedRefreshTokens.get(refreshToken);
    if (userIdFromReuse) {
      usedRefreshTokens.delete(refreshToken);
      await prisma.refreshToken.deleteMany({ where: { userId: userIdFromReuse } });
      throw new UnauthorizedError('Refresh token reused; all sessions revoked');
    }

    const stored = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!stored || stored.expiresAt < new Date()) {
      if (stored) {
        await prisma.refreshToken.delete({ where: { id: stored.id } }).catch(() => { });
      }
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    // Delete old token and mark as used
    await prisma.refreshToken.delete({ where: { id: stored.id } });
    markTokenUsed(refreshToken, stored.userId);

    // Issue new tokens
    const accessToken = this.issueAccessToken(stored.user.id, stored.user.email);
    const newRefresh = await this.issueRefreshToken(stored.user.id);

    return {
      user: { id: stored.user.id, email: stored.user.email },
      accessToken,
      refreshToken: newRefresh.token,
      accessMaxAgeMs: config.jwt.accessExpiresMs,
      refreshMaxAgeMs: config.jwt.refreshExpiresMs,
    };
  },

  async me(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });
    if (!user) {
      throw new UnauthorizedError('User not found');
    }
    return user;
  },

  issueAccessToken(userId: string, email: string): string {
    const payload: JwtPayload = { sub: userId, email, type: 'access' };
    return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.accessExpires });
  },

  async issueRefreshToken(userId: string) {
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + config.jwt.refreshExpiresMs);
    await prisma.refreshToken.create({
      data: { token, userId, expiresAt },
    });
    return { token, expiresAt };
  },
};
