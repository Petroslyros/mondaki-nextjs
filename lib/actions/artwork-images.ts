'use server'

import { createClient } from "@/lib/supabase/server";
import { uploadImageToR2, deleteImageFromR2 } from "@/lib/r2";
import { revalidatePath } from "next/cache";

export async function addImageToArtworkAction(artworkId: number, formData: FormData) {
    const file = formData.get("file") as File;
    if (!file) return { error: "No file provided" };

    const imageUrl = await uploadImageToR2(file, "artworks");

    const supabase = await createClient();
    const { data, error } = await supabase
        .from("ArtworkImages")
        .insert({ ArtworkId: artworkId, ImageUrl: imageUrl, SortOrder: 0 })
        .select()
        .single();

    if (error) return { error: error.message };

    // Αν είναι η πρώτη εικόνα, όρισέ την ως cover
    const { data: existing } = await supabase
        .from("ArtworkImages")
        .select("Id")
        .eq("ArtworkId", artworkId);

    if (existing && existing.length === 1) {
        await supabase.from("Artworks").update({ CoverImageUrl: imageUrl }).eq("Id", artworkId);
    }

    revalidatePath(`/admin/artworks/${artworkId}`);
    return {
        error: null,
        image: { id: data.Id, imageUrl: data.ImageUrl, altText: data.AltText, sortOrder: data.SortOrder },
    };
}

export async function deleteArtworkImageAction(artworkId: number, imageId: number, imageUrl: string) {
    await deleteImageFromR2(imageUrl);

    const supabase = await createClient();
    const { error } = await supabase.from("ArtworkImages").delete().eq("Id", imageId);

    if (error) return { error: error.message };
    revalidatePath(`/admin/artworks/${artworkId}`);
    return { error: null };
}

export async function setCoverImageAction(artworkId: number, imageUrl: string) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("Artworks")
        .update({ CoverImageUrl: imageUrl })
        .eq("Id", artworkId);

    if (error) return { error: error.message };
    revalidatePath(`/admin/artworks/${artworkId}`);
    return { error: null };
}