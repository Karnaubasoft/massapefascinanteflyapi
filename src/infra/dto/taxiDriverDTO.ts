import { z } from "zod"
import { taxiDriverSchema } from "../schemas/taxiDriverSchema"

export type taxiDriverDTO = z.infer<typeof taxiDriverSchema>;