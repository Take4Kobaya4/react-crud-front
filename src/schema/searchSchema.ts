import { z } from 'zod';

// 検索用のスキーマ
export const searchSchema = z.object({
    title: z.string(),
});

export type searchFormValues = z.infer<typeof searchSchema>;

