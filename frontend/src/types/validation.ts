import { z } from "zod";

export const goalSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["a","b"]),
  start_date: z.date(),
  end_date: z.date().optional()
});