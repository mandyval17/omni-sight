import { z } from 'zod';

export const ExampleSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string(),
});

export type Example = z.infer<typeof ExampleSchema>;

export const ExampleFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
});

export type ExampleFormData = z.infer<typeof ExampleFormSchema>;
