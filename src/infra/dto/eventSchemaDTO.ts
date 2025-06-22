import { z } from "zod";
import { eventSchema } from "../schemas/eventSchema";

export type eventDTO = z.infer<typeof eventSchema>;