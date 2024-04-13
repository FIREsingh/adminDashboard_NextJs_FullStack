import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string(), // username, email etc...
  password: z.string(),
});
