'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import type { Artwork } from "@/schemas/artworks";
import type { Category } from "@/lib/categories";

export function GalleryClient({ artworks, categories }: { artworks: Artwork[]; categories: Category[] }) {
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const router = useRouter();

    const filtered = selectedCategory
        ? artworks.filter(a => a.categoryName === categories.find(c => c.id === selectedCategory)?.name)
        : artworks;

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-12">
                <h1
                    className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-wide"
                    style={{ fontFamily: "'Komika Hand', cursive" }}
                >
                    Mondaki<span className="text-gray-500 dark:text-gray-400">Comics</span>
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-base italic max-w-xl mx-auto">
                    Original comics and illustrations
                </p>
            </div>

            {categories.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center mb-10">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                            selectedCategory === null
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : "bg-gray-100 dark:bg-[#121212] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2a2a2a]"
                        }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                                selectedCategory === cat.id
                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                    : "bg-gray-100 dark:bg-[#121212] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2a2a2a]"
                            }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            )}

            {filtered.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-20">
                    No artworks found.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filtered.map((artwork) => (
                        <div
                            key={artwork.id}
                            onClick={() => router.push(`/artwork/${artwork.id}`)}
                            className="bg-gray-50 dark:bg-[#121212] rounded-lg overflow-hidden cursor-pointer
                                       border border-gray-200 dark:border-[#2a2a2a] hover:border-black dark:hover:border-white
                                       transition duration-300 hover:scale-105 group"
                        >
                            <div className="aspect-square overflow-hidden bg-gray-200 dark:bg-[#2a2a2a]">
                                {artwork.coverImageUrl ? (
                                    <img
                                        src={artwork.coverImageUrl}
                                        alt={artwork.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                                        No image
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="text-black dark:text-white font-semibold truncate">
                                    {artwork.title}
                                </h3>
                                {artwork.categoryName && (
                                    <Badge
                                        variant="secondary"
                                        className="mt-2 bg-gray-200 dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-300 text-xs"
                                    >
                                        {artwork.categoryName}
                                    </Badge>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}