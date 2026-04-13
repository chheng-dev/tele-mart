import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(255, "Name must be at most 255 characters."),
  description: z.string().max(10_000, "Description must be at most 10000 characters."),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
