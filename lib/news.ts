import { createClient } from "@/lib/supabase/server";
import type { NewsPost } from "@/schemas/news";

type NewsRow = {
    Id: number;
    Title: string;
    Content: string;
    ImageUrl: string | null;
    IsPublished: boolean;
    SortOrder: number;
    InsertedAt: string;
};

function mapNews(row: NewsRow): NewsPost {
    return {
        id: row.Id,
        title: row.Title,
        content: row.Content,
        imageUrl: row.ImageUrl,
        isPublished: row.IsPublished,
        sortOrder: row.SortOrder,
        insertedAt: row.InsertedAt,
    };
}

export async function getPublishedNews(): Promise<NewsPost[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("NewsPosts")
        .select("*")
        .eq("IsPublished", true)
        .eq("IsDeleted", false)
        .order("InsertedAt", { ascending: false });

    if (error) throw new Error(error.message);
    return (data as NewsRow[]).map(mapNews);
}

export async function getNewsById(id: number): Promise<NewsPost | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("NewsPosts")
        .select("*")
        .eq("Id", id)
        .eq("IsDeleted", false)
        .single();

    if (error) return null;
    return mapNews(data as NewsRow);
}

export async function getAllNewsAdmin(): Promise<NewsPost[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("NewsPosts")
        .select("*")
        .eq("IsDeleted", false)
        .order("SortOrder", { ascending: true });

    if (error) throw new Error(error.message);
    return (data as NewsRow[]).map(mapNews);
}