import { z } from "zod";
import { googleSchema } from "../schemas/googleSchema";

export type googleDTO = z.infer<typeof googleSchema>;