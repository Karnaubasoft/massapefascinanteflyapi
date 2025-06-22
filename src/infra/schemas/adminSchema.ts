import { z } from "zod";

export const adminSchema = z.object({
    name: z.string({required_error: "Name is required"}).regex(/^[^<>]*$/, "Sem tags HTML"),
    email: z.string({required_error: "Email is required"}).email({message: "Invalid email format"}),
    password: z.string({required_error: "Password is required"}).min(8, {message: "Password must be at least 8 characters long"}).regex(/^[^<>]*$/, "Sem tags HTML"),
});


export const adminLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).regex(/^[^<>]*$/, "Sem tags HTML"),
    remenberMe: z.boolean().optional().default(false)
});
