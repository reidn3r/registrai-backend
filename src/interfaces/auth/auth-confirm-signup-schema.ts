import { z } from 'zod';

export const ConfirmSignupSchema = {
    querystring: z.object({
        token_hash: z.string(),
        type: z.string(),
        next: z.string()
    })                
}