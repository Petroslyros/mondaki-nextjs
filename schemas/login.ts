import { z } from "zod";

export const userLoginSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export type UserLogin = z.infer<typeof userLoginSchema>;