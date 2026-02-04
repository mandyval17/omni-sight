import type { NextFunction, Response } from 'express';
import { config } from '../../config/env.js';
import type { AuthRequest } from '../../types/index.js';
import { sendSuccess } from '../../utils/response.js';
import type { LoginInput, RegisterInput } from './auth.schema.js';
import { authService } from './auth.service.js';

function setCookies(
  res: Response,
  accessToken: string,
  refreshToken: string,
  accessMaxAge: number,
  refreshMaxAge: number
) {
  res.cookie('access_token', accessToken, { ...config.cookie, maxAge: accessMaxAge });
  res.cookie('refresh_token', refreshToken, { ...config.cookie, maxAge: refreshMaxAge });
}

function clearCookies(res: Response) {
  res.cookie('access_token', '', { ...config.cookie, maxAge: 0 });
  res.cookie('refresh_token', '', { ...config.cookie, maxAge: 0 });
}

export const authController = {
  async register(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const input = req.body as RegisterInput;
      const user = await authService.register(input);
      sendSuccess(res, user, 'Registration successful', 201);
    } catch (error) {
      next(error);
    }
  },

  async login(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const input = req.body as LoginInput;
      console.log('input', input);
      const result = await authService.login(input);
      setCookies(res, result.accessToken, result.refreshToken, result.accessMaxAgeMs, result.refreshMaxAgeMs);
      sendSuccess(res, { user: result.user });
    } catch (error) {
      next(error);
    }
  },

  async logout(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (req.user?.id) {
        await authService.logout(req.user.id);
      }
      clearCookies(res);
      sendSuccess(res, { ok: true });
    } catch (error) {
      next(error);
    }
  },

  async refresh(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.cookies?.refresh_token;
      const result = await authService.refresh(refreshToken);
      setCookies(res, result.accessToken, result.refreshToken, result.accessMaxAgeMs, result.refreshMaxAgeMs);
      sendSuccess(res, { user: result.user });
    } catch (error) {
      next(error);
    }
  },

  async me(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await authService.me(req.user!.id);
      sendSuccess(res, user);
    } catch (error) {
      next(error);
    }
  },
};
