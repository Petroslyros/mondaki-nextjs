import { getPublishedArtworks } from "@/lib/artworks";
import { getAllCategories } from "@/lib/categories";
import { GalleryClient } from "@/components/GalleryClient";

export default async function Home() {
    const [artworks, categories] = await Promise.all([
        getPublishedArtworks(),
        getAllCategories(),
    ]);

    return <GalleryClient artworks={artworks} categories={categories} />;
}