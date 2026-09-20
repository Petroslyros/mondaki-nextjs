import { createClient } from "@/lib/supabase/server";
import { getAllNewsAdmin } from "@/lib/news";

export async function getDashboardStats() {
    const supabase = await createClient();

    const [artworksRes, categoriesRes, unreadRes, news] = await Promise.all([
        supabase.from("Artworks").select("IsPublished").eq("IsDeleted", false),
        supabase.from("ArtworkCategories").select("Id"),
        supabase.from("ContactMessages").select("Id").eq("IsRead", false),
        getAllNewsAdmin(),
    ]);

    const artworks = artworksRes.data ?? [];

    return {
        totalArtworks: artworks.length,
        publishedArtworks: artworks.filter(a => a.IsPublished).length,
        totalCategories: categoriesRes.data?.length ?? 0,
        unreadMessages: unreadRes.data?.length ?? 0,
        totalNews: news.length,
    };
}