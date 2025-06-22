import { z } from "zod";

export const placeSchema = z.object({
    name: z.string({required_error: "Name is required"}).regex(/^[^<>]*$/, "Sem tags HTML"),
    location: z.string({required_error: "Location is required"}).regex(/^[^<>]*$/, "Sem tags HTML"),
    description: z.string({required_error: "Description is required"}).regex(/^[^<>]*$/, "Sem tags HTML"),
    photoURLs: z.array(z.string()),
    category: z.enum(['RESTAURANT', 'HOTEL', 'TOURIST_ATTRACTIONS', 'LANDSCAPE', 'HOSTING']),
    phone: z.string().max(15).regex(/^[^<>]*$/, "Sem tags HTML").optional(),
    instagram: z.string().regex(/^[^<>]*$/, "Sem tags HTML").optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
});



