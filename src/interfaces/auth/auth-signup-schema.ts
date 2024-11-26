import { z } from 'zod';

export const AuthSignupSchema = {
    body: z.object({
        email: z.string().email(),
        password: z.string()
    })
}