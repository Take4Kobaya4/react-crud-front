import { z } from 'zod';

// 検索用のスキーマ
export const SearchSchema = z.object({
    query: z.string().optional(),
});

