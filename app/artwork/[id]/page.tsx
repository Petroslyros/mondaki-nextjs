import { notFound } from "next/navigation";
import { getArtworkById } from "@/lib/artworks";
import { ArtworkDetailClient } from "@/components/ArtworkDetailClient";

export default async function ArtworkDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const artwork = await getArtworkById(Number(id));

    if (!artwork) notFound();

    return <ArtworkDetailClient artwork={artwork} />;
}