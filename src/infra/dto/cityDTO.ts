import { z } from "zod";
import { citySchema } from "../schemas/citySchema";

export type cityDTO = z.infer<typeof citySchema>;