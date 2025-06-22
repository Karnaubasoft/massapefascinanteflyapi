import { z } from "zod";

export const googleSchema = z.object({
    idToken: z.string().nonempty("ID Token is required")
})