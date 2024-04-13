import { z } from "zod";
export const usernameValidation = z
  .string()
  .min(2, "username must be atleast 2 characters.")
  .max(20, "username must cannot exceed 20 characters.")
  .regex(/^[a-zA-Z0-9_]+$/, "username must not contain special characters");

export const registerSchema = z
  .object({
    username: usernameValidation,
    email: z.string().email({ message: "invalid email address" }),
    password: z
      .string()
      .min(4, { message: "password must be atleast 4 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
