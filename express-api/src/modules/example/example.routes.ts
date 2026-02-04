import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { exampleController } from './example.controller.js';
import { createExampleSchema } from './example.schema.js';

export const exampleRouter = Router();

// All example routes require authentication
exampleRouter.get('/examples', authMiddleware, exampleController.list);
exampleRouter.post('/example', authMiddleware, validate(createExampleSchema), exampleController.create);
