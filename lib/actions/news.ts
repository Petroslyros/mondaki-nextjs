'use server'

import { createClient } from "@/lib/supabase/server";
import { uploadImageToR2 } from "@/lib/r2";
import { revalidatePath } from "next/cache";
import type { NewsInsert } from "@/schemas/news";

export async function createNewsAction(data: NewsInsert) {
    const supabase = await createClient();
    const { error } = await supabase.from("NewsPosts").insert({
        Title: data.title,
        Content: data.content,
        IsPublished: data.isPublished,
        SortOrder: data.sortOrder,
        IsDeleted: false,
    });

    if (error) return { error: error.message };
    revalidatePath("/admin/news");
    return { error: null };
}

export async function updateNewsAction(id: number, data: NewsInsert) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("NewsPosts")
        .update({
            Title: data.title,
            Content: data.content,
            IsPublished: data.isPublished,
            SortOrder: data.sortOrder,
        })
        .eq("Id", id);

    if (error) return { error: error.message };
    revalidatePath("/admin/news");
    return { error: null };
}

export async function deleteNewsAction(id: number) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("NewsPosts")
        .update({ IsDeleted: true, DeletedAt: new Date().toISOString() })
        .eq("Id", id);

    if (error) return { error: error.message };
    revalidatePath("/admin/news");
    return { error: null };
}

export async function toggleNewsPublishAction(id: number, currentState: boolean) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("NewsPosts")
        .update({ IsPublished: !currentState })
        .eq("Id", id);

    if (error) return { error: null, isPublished: currentState };
    revalidatePath("/admin/news");
    return { error: null, isPublished: !currentState };
}

export async function setNewsImageAction(id: number, formData: FormData) {
    const file = formData.get("file") as File;
    if (!file) return { error: "No file provided", imageUrl: null };

    const imageUrl = await uploadImageToR2(file, "news");

    const supabase = await createClient();
    const { error } = await supabase.from("NewsPosts").update({ ImageUrl: imageUrl }).eq("Id", id);

    if (error) return { error: error.message, imageUrl: null };
    revalidatePath("/admin/news");
    return { error: null, imageUrl };
}