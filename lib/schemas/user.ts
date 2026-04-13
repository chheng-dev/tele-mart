import { z } from "zod";

export const userFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(255, "Name must be at most 255 characters."),
  email: z.string().email("Invalid email address."),
  emailVerified: z.boolean().default(false),
  image: z.string().optional(),
  role: z.string(),
});

export type UserFormValues = z.infer<typeof userFormSchema>;

export const userUpdateSchema = userFormSchema.partial();

export type UserUpdateValues = z.infer<typeof userUpdateSchema>;
