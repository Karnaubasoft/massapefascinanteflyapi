import { z } from "zod";

export const emailSenderSchema = z.object({
    email: z.string().email(),
    ip: z.string().ip()
})

export const forgotPasswordSchema = z.object({
    token: z.string().regex(/^[^<>]*$/, "Sem tags HTML"),
    password: z.string().regex(/^[^<>]*$/, "Sem tags HTML")
})

export const codeResetSchema = z.object({
    email: z.string().email(),
    code: z.string().length(8).regex(/^[^<>]*$/, "Sem tags HTML")
})