import { z } from "zod";

export const photoSchema = z.object({
    photoURLs: z.string().regex(/^[^<>]*$/, "Sem tags HTML")
})