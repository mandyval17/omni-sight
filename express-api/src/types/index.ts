import type { Request } from 'express';

export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface ApiErrorResponse {
  data: null;
  message: string;
  errors?: Record<string, string[]>;
}

export interface JwtPayload {
  sub: string;
  email: string;
  type: 'access' | 'refresh';
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}
