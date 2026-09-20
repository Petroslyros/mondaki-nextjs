import { z } from "zod";

export const artworkImageSchema = z.object({
    id: z.number().int(),
    imageUrl: z.string(),
    altText: z.string().nullable().optional(),
    sortOrder: z.number().int(),
});

export const artworkCategorySchema = z.object({
    id: z.number().int(),
    name: z.string(),
    slug: z.string(),
    description: z.string().nullable().optional(),
});

export const artworkSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    description: z.string().nullable().optional(),
    coverImageUrl: z.string().nullable().optional(),
    isPublished: z.boolean(),
    sortOrder: z.number().int(),
    categoryName: z.string().nullable().optional(),
    images: z.array(artworkImageSchema).default([]),
    insertedAt: z.string(),
});

export const artworkInsertSchema = z.object({
    categoryId: z.number().nullable().optional(),
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().optional(),
    isPublished: z.boolean(),
    sortOrder: z.number().int(),
});

export type Artwork = z.infer<typeof artworkSchema>;
export type ArtworkImage = z.infer<typeof artworkImageSchema>;
export type ArtworkInsert = z.infer<typeof artworkInsertSchema>;