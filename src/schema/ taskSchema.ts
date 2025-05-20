import { z } from 'zod';

export const taskSchema = z.object({
    title: z.string().min(1, { message: 'タイトルは必須です' }),
    description: z.string().optional(),
    is_completed: z.boolean().default(false),
});

export type TaskFormInput = z.infer<typeof taskSchema>;
