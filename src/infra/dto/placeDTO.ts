import { z } from "zod";
import { placeSchema } from "../schemas/placeSchema";

export type placeDTO = z.infer<typeof placeSchema>