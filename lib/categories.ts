import { createClient } from "@/lib/supabase/server";
import type { Category } from "@/schemas/categories";

export async function getAllCategories(): Promise<Category[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("ArtworkCategories")
        .select("Id, Name, Slug, Description")
        .order("Name", { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []).map((row) => ({
        id: row.Id,
        name: row.Name,
        slug: row.Slug,
        description: row.Description,
    }));
}