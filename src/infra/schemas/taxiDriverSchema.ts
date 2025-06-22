import { z } from "zod";

export const taxiDriverSchema = z.object({
    name: z.string().min(1, "Name is required").regex(/^[^<>]*$/, "Sem tags HTML"),
    photoURLs: z.union([z.string(), z.array(z.string()),]).transform((value) => Array.isArray(value) ? value[0] : value),
    phone: z.string().max(15, "Phone number must be at most 15 characters long").regex(/^[^<>]*$/, "Sem tags HTML"),
    workingDescription: z.string().min(1, "Working description is required").regex(/^[^<>]*$/, "Sem tags HTML")
});
