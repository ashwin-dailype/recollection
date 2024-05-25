import * as z from "zod";

// ============================================================
// USER
// ============================================================

export const SigninValidation = z.object({
  // email: z.string().email(),
  authToken: z.string(),
  // password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});
