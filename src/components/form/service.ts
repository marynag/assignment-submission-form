import { z } from "zod";

export const SearchSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  gitRepoUrl: z
    .string()
    .url({ message: "Invalid URL" })
    .min(1, { message: "URL is required" }),
  level: z.enum(["beginner", "intermediate", "advanced"]),
});

export type TypeSearchSchema = z.infer<typeof SearchSchema>;
