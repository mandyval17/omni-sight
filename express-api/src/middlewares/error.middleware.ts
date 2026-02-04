import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/app-error.js';
import { sendError } from '../utils/response.js';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // Zod validation error
  if (err instanceof ZodError) {
    const errors: Record<string, string[]> = {};
    err.errors.forEach((e) => {
      const path = e.path.join('.');
      if (!errors[path]) errors[path] = [];
      errors[path].push(e.message);
    });
    sendError(res, 'Validation failed', 400, errors);
    return;
  }

  // Custom AppError
  if (err instanceof AppError) {
    sendError(res, err.message, err.statusCode, err.errors);
    return;
  }

  // Unknown error
  console.error('Unhandled error:', err);
  sendError(res, err instanceof Error ? err.message : 'Internal server error', 500);
};
