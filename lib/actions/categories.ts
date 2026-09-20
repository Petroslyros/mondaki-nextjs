'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { CategoryInsert } from "@/schemas/categories";

export async function createCategoryAction(data: CategoryInsert) {
    const supabase = await createClient();
    const { error } = await supabase.from("ArtworkCategories").insert({
        Name: data.name,
        Slug: data.slug,
        Description: data.description || null,
        IsDeleted: false,
        ModifiedAt: new Date().toISOString(),
    });

    if (error) {
        console.error("createCategoryAction error:", error);
        return { error: error.message };
    }
    revalidatePath("/admin/categories");
    return { error: null };
}

export async function updateCategoryAction(id: number, data: CategoryInsert) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("ArtworkCategories")
        .update({
            Name: data.name,
            Slug: data.slug,
            Description: data.description || null,
            ModifiedAt: new Date().toISOString(),
        })
        .eq("Id", id);

    if (error) {
        console.error("updateCategoryAction error:", error);
        return { error: error.message };
    }
    revalidatePath("/admin/categories");
    return { error: null };
}

export async function deleteCategoryAction(id: number) {
    const supabase = await createClient();
    const { error } = await supabase.from("ArtworkCategories").delete().eq("Id", id);

    if (error) {
        console.error("deleteCategoryAction error:", error);
        return { error: error.message };
    }
    revalidatePath("/admin/categories");
    return { error: null };
}