import { z } from "zod";
import { codeResetSchema, emailSenderSchema, forgotPasswordSchema } from "../schemas/emailSenderSchema";

export type emailSenderDTO = z.infer<typeof emailSenderSchema>;

export type forgotPasswordDTO = z.infer<typeof forgotPasswordSchema>;

export type codeResetDTO = z.infer<typeof codeResetSchema>;