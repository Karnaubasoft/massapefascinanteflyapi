import { z } from "zod";
import { adminLoginSchema, adminSchema } from "../schemas/adminSchema";

export type adminDTO = z.infer<typeof adminSchema>;

export type adminLoginDTO = z.infer<typeof adminLoginSchema>;
