import { z } from "zod";

export const eventSchema = z.object({
    name: z.string({ required_error: "Name is required" }).min(1, { message: "Name must be at least 1 character long" }).regex(/^[^<>]*$/, "Sem tags HTML"),
    date: z.coerce.date({ required_error: "Date is required" }),
    lastDate: z.coerce.date({ required_error: "LastDate is required" }),
    location: z.string({ required_error: "Location is required" }).regex(/^[^<>]*$/, "Sem tags HTML"),
    description: z.string({ required_error: "Description is required" }).min(1, { message: "Description must be at least 1 character long" }).regex(/^[^<>]*$/, "Sem tags HTML"),
    active: z.preprocess(
        (val) => {
            if (val === 'true') return true;
            if (val === 'false') return false;
            return val;
        },
        z.boolean().optional().default(false)
    ),
    photoURLs: z.array(z.string()),
    instagram: z.string().regex(/^[^<>]*$/, "Sem tags HTML").optional()
});
