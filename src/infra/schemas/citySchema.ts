import { z } from "zod";

export const citySchema = z.object({
    name: z.string({required_error: "Name is required"}).regex(/^[^<>]*$/, "Sem tags HTML"),
    location: z.string({required_error: "Location is required"}).regex(/^[^<>]*$/, "Sem tags HTML"),
    description: z.string({required_error: "Description is required"}).regex(/^[^<>]*$/, "Sem tags HTML"),
    photoURLs: z.array(z.string()).default([]),
    instagram: z.string().regex(/^[^<>]*$/, "Sem tags HTML").optional(),
});