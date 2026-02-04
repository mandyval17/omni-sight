import type { Response } from 'express';
import type { ApiErrorResponse, ApiResponse } from '../types/index.js';

export function sendSuccess<T>(res: Response, data: T, message = 'Success', status = 200): void {
  const response: ApiResponse<T> = { data, message };
  res.status(status).json(response);
}

export function sendError(
  res: Response,
  message: string,
  status = 400,
  errors?: Record<string, string[]>
): void {
  const response: ApiErrorResponse = { data: null, message, ...(errors && { errors }) };
  res.status(status).json(response);
}
