import { CATEGORY, TRANSACTION_STATUS, TRANSACTION_TYPE } from '@prisma/client';
import { z } from 'zod';

export const CreateTransactionSchema = {
    body: z.object({
        userId: z.string().uuid(),
        category: z.nativeEnum(CATEGORY),
        value: z.number(),
        type: z.nativeEnum(TRANSACTION_TYPE),
        description: z.string().max(256).nullable().optional(),
        status: z.nativeEnum(TRANSACTION_STATUS)
    })
}