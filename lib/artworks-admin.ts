import { createClient } from "@/lib/supabase/server";
import type { Artwork } from "@/schemas/artworks";

export async function getAllArtworksAdmin(): Promise<Artwork[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("Artworks")
        .select("*, ArtworkCategories(Name), ArtworkImages(*)")
        .eq("IsDeleted", false)
        .order("SortOrder", { ascending: true });

    if (error) throw new Error(error.message);

    return (data ?? []).map((row: any) => ({
        id: row.Id,
        title: row.Title,
        description: row.Description,
        coverImageUrl: row.CoverImageUrl,
        isPublished: row.IsPublished,
        sortOrder: row.SortOrder,
        categoryName: row.ArtworkCategories?.Name ?? null,
        images: (row.ArtworkImages ?? []).map((img: any) => ({
            id: img.Id,
            imageUrl: img.ImageUrl,
            altText: img.AltText,
            sortOrder: img.SortOrder,
        })),
        insertedAt: row.InsertedAt,
    }));
}