import { getAllCategories } from "@/lib/categories";
import { ArtworkFormClient } from "@/components/ArtworkFormClient";

export default async function NewArtworkPage() {
    const categories = await getAllCategories();
    return <ArtworkFormClient categories={categories} artwork={null} />;
}