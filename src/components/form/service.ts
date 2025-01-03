import { z } from "zod";

export const SearchSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .min(10, { message: "Description must be at least 10 characters" }),
  gitRepoUrl: z
    .string()
    .url({ message: "Invalid URL" })
    .min(1, { message: "URL is required" }),
  level: z.string().min(1, { message: "Skill level is required" }),
});

export type TypeSearchSchema = z.infer<typeof SearchSchema>;
