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

// Utility function that converts Date object in month year format
export function formatDateToMonthYear(date: Date): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
}

export const profileSchema = z.object({
  name: z.string().min(3).max(100),
  username: z.string().min(3).max(100),
  portfolioWebsite: z.string().min(0).max(1000),
  location: z.string().min(0).max(100),
  bio: z.string().min(0).max(1000),
});
