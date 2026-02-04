import { prisma } from '../../../prisma/prisma.js';
import { BadRequestError, InternalError } from '../../utils/app-error.js';
import type { CreateExampleInput } from './example.schema.js';

export const exampleService = {
  async findAll() {
    try {
      const list = await prisma.example.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return list.map((e) => ({
        ...e,
        createdAt: e.createdAt.toISOString(),
      }));
    } catch (error) {
      throw new InternalError(error instanceof Error ? error.message : 'Failed to fetch examples');
    }
  },

  async create(input: CreateExampleInput) {
    try {
      const example = await prisma.example.create({
        data: { name: input.name, email: input.email },
      });
      return { ...example, createdAt: example.createdAt.toISOString() };
    } catch (error) {
      const prismaError = error as { code?: string };
      if (prismaError?.code === 'P2002') {
        throw new BadRequestError('Example already exists');
      }
      throw new InternalError(error instanceof Error ? error.message : 'Failed to create example');
    }
  },
};
