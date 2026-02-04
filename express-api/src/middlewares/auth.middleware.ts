import type { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import type { AuthRequest, JwtPayload } from '../types/index.js';
import { UnauthorizedError } from '../utils/app-error.js';

export function authMiddleware(req: AuthRequest, _res: Response, next: NextFunction): void {
  try {
    const token = req.cookies?.access_token;
    if (!token) {
      throw new UnauthorizedError('No access token');
    }

    const payload = jwt.verify(token, config.jwt.secret) as JwtPayload;
    if (payload.type !== 'access') {
      throw new UnauthorizedError('Invalid token type');
    }

    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      next(error);
    } else {
      next(new UnauthorizedError('Invalid or expired token'));
    }
  }
}
