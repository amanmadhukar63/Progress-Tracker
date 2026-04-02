import { email, string, z } from 'zod';

export const signupSchema = z.object({
  name: string().min(2),
  email: email(),
  password: string().min(6)
});

export const loginSchema = z.object({
  email: email(),
  password: string().min(6)
});