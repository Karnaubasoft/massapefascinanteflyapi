import { z } from "zod";
import { roomSchema } from "../schemas/roomSchema";

export type RoomDTO = z.infer<typeof roomSchema>;