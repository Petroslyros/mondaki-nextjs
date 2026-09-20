'use client'

import { useState } from "react";
import Link from "next/link";
import { deleteArtworkAction, togglePublishAction } from "@/lib/actions/artworks";
import type { Artwork } from "@/schemas/artworks";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Eye, EyeOff, Image } from "lucide-react";
import { toast } from "sonner";

export function ArtworksAdminClient({ initialArtworks }: { initialArtworks: Artwork[] }) {
    const [artworks, setArtworks] = useState(initialArtworks);

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this artwork and all its images?")) return;
        const result = await deleteArtworkAction(id);
        if (result.error) {
            toast.error("Failed to delete artwork");
            return;
        }
        toast.success("Artwork deleted");
        setArtworks(prev => prev.filter(a => a.id !== id));
    };

    const handleTogglePublish = async (id: number, currentState: boolean) => {
        const result = await togglePublishAction(id, currentState);
        setArtworks(prev =>
            prev.map(a => a.id === id ? { ...a, isPublished: result.isPublished } : a)
        );
        toast.success(result.isPublished ? "Artwork published" : "Artwork unpublished");
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-black dark:text-white">Artworks</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        {artworks.length} total · {artworks.filter(a => a.isPublished).length} published
                    </p>
                </div>
                <Link href="/admin/artworks/new">
                    <Button className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black">
                        <Plus className="w-4 h-4 mr-2" />
                        New Artwork
                    </Button>
                </Link>
            </div>

            {artworks.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-20">
                    No artworks yet. Create your first one!
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {artworks.map((artwork) => (
                        <div
                            key={artwork.id}
                            className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#2a2a2a] rounded-lg overflow-hidden"
                        >
                            <div className="aspect-square bg-gray-200 dark:bg-[#2a2a2a] relative">
                                {artwork.coverImageUrl ? (
                                    <img
                                        src={artwork.coverImageUrl}
                                        alt={artwork.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 gap-2">
                                        <Image className="w-8 h-8" />
                                        <span className="text-xs">No image</span>
                                    </div>
                                )}
                                <div className="absolute top-2 right-2">
                                    <Badge className={artwork.isPublished ? "bg-green-600 text-white" : "bg-gray-500 text-white"}>
                                        {artwork.isPublished ? "Published" : "Draft"}
                                    </Badge>
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="text-black dark:text-white font-semibold truncate mb-1">
                                    {artwork.title}
                                </h3>
                                {artwork.categoryName && (
                                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                                        {artwork.categoryName}
                                    </p>
                                )}
                                <p className="text-gray-400 dark:text-gray-500 text-xs mb-3">
                                    {artwork.images?.length ?? 0} image{(artwork.images?.length ?? 0) !== 1 ? "s" : ""}
                                </p>

                                <div className="flex gap-2">
                                    <Link href={`/admin/artworks/${artwork.id}`} className="flex-1">
                                        <Button variant="outline" size="sm" className="w-full">
                                            <Pencil className="w-3 h-3 mr-1" />
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => handleTogglePublish(artwork.id, artwork.isPublished)}
                                        variant="outline"
                                        size="sm"
                                        title={artwork.isPublished ? "Unpublish" : "Publish"}
                                    >
                                        {artwork.isPublished ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                    </Button>
                                    <Button onClick={() => handleDelete(artwork.id)} variant="destructive" size="sm">
                                        <Trash2 className="w-3 h-3" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}