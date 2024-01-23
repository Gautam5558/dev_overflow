import * as z from "zod";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const questionSchema = z.object({
  title: z.string().min(5).max(100),
  explanation: z.string().min(10),
  tags: z.array(z.string().min(1).max(10)).min(1).max(3),
});

export const answerSchema = z.object({
  solution: z.string().min(5).max(2000),
});
