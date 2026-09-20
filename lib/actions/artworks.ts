'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { ArtworkInsert } from "@/schemas/artworks";


export async function createArtworkAction(data: ArtworkInsert) {
    const supabase = await createClient();
    const { data: created, error } = await supabase
        .from("Artworks")
        .insert({
            Title: data.title,
            Description: data.description || null,
            CategoryId: data.categoryId || null,
            IsPublished: data.isPublished,
            SortOrder: data.sortOrder,
            IsDeleted: false,
            ModifiedAt: new Date().toISOString(),
        })
        .select()
        .single();

    if (error) {
        console.error("createArtworkAction error:", error);
        return { error: error.message, id: null };
    }
    revalidatePath("/admin/artworks");
    return { error: null, id: created.Id };
}

export async function updateArtworkAction(id: number, data: ArtworkInsert) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("Artworks")
        .update({
            Title: data.title,
            Description: data.description || null,
            CategoryId: data.categoryId || null,
            IsPublished: data.isPublished,
            SortOrder: data.sortOrder,
            ModifiedAt: new Date().toISOString(),
        })
        .eq("Id", id);

    if (error) return { error: error.message };
    revalidatePath("/admin/artworks");
    revalidatePath(`/admin/artworks/${id}`);
    return { error: null };
}

export async function deleteArtworkAction(id: number) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("Artworks")
        .update({ IsDeleted: true, DeletedAt: new Date().toISOString() })
        .eq("Id", id);

    if (error) return { error: error.message };
    revalidatePath("/admin/artworks");
    return { error: null };
}

export async function togglePublishAction(id: number, currentState: boolean) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("Artworks")
        .update({ IsPublished: !currentState })
        .eq("Id", id);

    if (error) return { error: null, isPublished: currentState };
    revalidatePath("/admin/artworks");
    return { error: null, isPublished: !currentState };
}