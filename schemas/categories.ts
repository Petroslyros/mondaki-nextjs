import { z } from "zod";

export const categorySchema = z.object({
    id: z.number().int(),
    name: z.string(),
    slug: z.string(),
    description: z.string().nullable().optional(),
});

export const categoryInsertSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    slug: z.string().min(1, { message: "Slug is required" }),
    description: z.string().optional(),
});

export type Category = z.infer<typeof categorySchema>;
export type CategoryInsert = z.infer<typeof categoryInsertSchema>;