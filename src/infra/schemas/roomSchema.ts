import { z } from "zod";

export const roomSchema = z.object({
    price: z.coerce.number().min(0, "Price must be a positive number"),
    available: z.preprocess(
        (val) => {
            if (val === 'true') return true;
            if (val === 'false') return false;
            return val;
        },
        z.boolean().optional().default(true)
    ),
    description: z.string().optional(),
    photoURLs: z.array(z.string()).optional()
});