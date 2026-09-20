'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import type { Artwork } from "@/schemas/artworks";

export function ArtworkDetailClient({ artwork }: { artwork: Artwork }) {
    const router = useRouter();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const images = artwork.images ?? [];
    const currentImage = images[selectedImageIndex];

    return (
        <div className="container mx-auto px-6 py-12 max-w-5xl">
            <Button
                variant="ghost"
                onClick={() => router.push("/")}
                className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-8"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Gallery
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                    <div className="rounded-lg overflow-hidden aspect-square">
                        {currentImage ? (
                            <img
                                src={currentImage.imageUrl}
                                alt={currentImage.altText ?? artwork.title}
                                className="w-full h-full object-contain"
                            />
                        ) : artwork.coverImageUrl ? (
                            <img
                                src={artwork.coverImageUrl}
                                alt={artwork.title}
                                className="w-full h-full object-contain"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
                                No image
                            </div>
                        )}
                    </div>

                    {images.length > 1 && (
                        <div className="mt-4">
                            <div className="flex items-center justify-between mb-3">
                                <button
                                    onClick={() => setSelectedImageIndex(i => Math.max(0, i - 1))}
                                    disabled={selectedImageIndex === 0}
                                    className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-30 transition"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <span className="text-gray-500 dark:text-gray-400 text-sm">
                                    {selectedImageIndex + 1} / {images.length}
                                </span>
                                <button
                                    onClick={() => setSelectedImageIndex(i => Math.min(images.length - 1, i + 1))}
                                    disabled={selectedImageIndex === images.length - 1}
                                    className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white disabled:opacity-30 transition"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {images.map((img, index) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition ${
                                            index === selectedImageIndex
                                                ? "border-black dark:border-white"
                                                : "border-gray-200 dark:border-[#2a2a2a] hover:border-gray-400 dark:hover:border-gray-500"
                                        }`}
                                    >
                                        <img
                                            src={img.imageUrl}
                                            alt={img.altText ?? `Image ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        {artwork.categoryName && (
                            <Badge className="bg-black text-white dark:bg-white dark:text-black mb-3">
                                {artwork.categoryName}
                            </Badge>
                        )}
                        <h1 className="text-3xl font-bold text-black dark:text-white">
                            {artwork.title}
                        </h1>
                    </div>

                    {artwork.description && (
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {artwork.description}
                        </p>
                    )}

                    <div className="mt-auto pt-8">
                        <p className="text-gray-400 dark:text-gray-500 text-sm mb-4">
                            Interested in this work? Get in touch!
                        </p>
                        <Button
                            onClick={() => router.push("/contact")}
                            className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black w-full"
                        >
                            Contact Me
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}