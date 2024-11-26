import { z } from 'zod';

export const AuthSignupSchema = {
    body: z.object({
        email: z.string().email(),
        password: z.string(),
        cpf: z.string().max(11, "Apenas os dígitos do CPF devem ser enviados"),
        name: z.string().min(3),
        phone: z.string().max(11, "Apenas od dígitos do telefone devem ser enviados")
    })
}