import { getAllArtworksAdmin } from "@/lib/artworks-admin";
import { ArtworksAdminClient } from "@/components/ArtworksAdminClient";

export default async function ArtworksAdminPage() {
    const artworks = await getAllArtworksAdmin();
    return <ArtworksAdminClient initialArtworks={artworks} />;
}