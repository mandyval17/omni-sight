import type { NextFunction, Request, Response } from 'express';
import { sendSuccess } from '../../utils/response.js';
import type { CreateExampleInput } from './example.schema.js';
import { exampleService } from './example.service.js';

export const exampleController = {
  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const examples = await exampleService.findAll();
      sendSuccess(res, examples);
    } catch (error) {
      next(error);
    }
  },

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const input = req.body as CreateExampleInput;
      const example = await exampleService.create(input);
      sendSuccess(res, example, 'Example created', 201);
    } catch (error) {
      next(error);
    }
  },
};
