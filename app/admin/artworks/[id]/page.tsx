import { notFound } from "next/navigation";
import { getAllCategories } from "@/lib/categories";
import { getArtworkById } from "@/lib/artworks";
import { ArtworkFormClient } from "@/components/ArtworkFormClient";

export default async function EditArtworkPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [categories, artwork] = await Promise.all([
        getAllCategories(),
        getArtworkById(Number(id)),
    ]);

    if (!artwork) notFound();

    return <ArtworkFormClient categories={categories} artwork={artwork} artworkId={Number(id)} />;
}