import { createClient } from "@/lib/supabase/server";
import type { Artwork } from "@/schemas/artworks";

type ArtworkRow = {
    Id: number;
    Title: string;
    Description: string | null;
    CoverImageUrl: string | null;
    IsPublished: boolean;
    SortOrder: number;
    InsertedAt: string;
    ArtworkCategories: { Name: string } | null;
    ArtworkImages: { Id: number; ImageUrl: string; AltText: string | null; SortOrder: number }[];
};

function mapArtwork(row: ArtworkRow): Artwork {
    return {
        id: row.Id,
        title: row.Title,
        description: row.Description,
        coverImageUrl: row.CoverImageUrl,
        isPublished: row.IsPublished,
        sortOrder: row.SortOrder,
        categoryName: row.ArtworkCategories?.Name ?? null,
        images: (row.ArtworkImages ?? [])
            .sort((a, b) => a.SortOrder - b.SortOrder)
            .map((img) => ({
                id: img.Id,
                imageUrl: img.ImageUrl,
                altText: img.AltText,
                sortOrder: img.SortOrder,
            })),
        insertedAt: row.InsertedAt,
    };
}

export async function getPublishedArtworks(): Promise<Artwork[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("Artworks")
        .select("*, ArtworkCategories(Name), ArtworkImages(*)")
        .eq("IsPublished", true)
        .eq("IsDeleted", false)
        .order("SortOrder", { ascending: true });

    if (error) throw new Error(error.message);
    return (data as ArtworkRow[]).map(mapArtwork);
}

export async function getArtworkById(id: number): Promise<Artwork | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("Artworks")
        .select("*, ArtworkCategories(Name), ArtworkImages(*)")
        .eq("Id", id)
        .eq("IsDeleted", false)
        .single();

    if (error) return null;
    return mapArtwork(data as ArtworkRow);
}