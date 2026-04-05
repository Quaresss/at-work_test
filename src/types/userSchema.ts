import { z } from 'zod';

export const userFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Минимум 2 символа')
    .max(64, 'Максимум 64 символа'),
  username: z
    .string()
    .min(2, 'Минимум 2 символа')
    .max(64, 'Максимум 64 символа'),
  email: z.string().email('Некорректный email'),
  city: z
    .string()
    .min(2, 'Минимум 2 символа')
    .max(64, 'Максимум 64 символа'),
  phone: z
    .string()
    .regex(/^[\d\s()+\-x]+$/i, 'Только цифры')
    .refine((value) => /\d/.test(value), 'Только цифры'),
  companyName: z
    .string()
    .min(2, 'Минимум 2 символа')
    .max(64, 'Максимум 64 символа'),
});

export type UserFormData = z.infer<typeof userFormSchema>;
