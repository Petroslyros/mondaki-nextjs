'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { artworkInsertSchema, type ArtworkInsert, type Artwork } from "@/schemas/artworks";
import type { Category } from "@/schemas/categories";
import {
    createArtworkAction,
    updateArtworkAction,
} from "@/lib/actions/artworks";
import {
    addImageToArtworkAction,
    deleteArtworkImageAction,
    setCoverImageAction,
} from "@/lib/actions/artwork-images";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ArrowLeft, Upload, Trash2, Star } from "lucide-react";

type Props = {
    categories: Category[];
    artwork: Artwork | null;
    artworkId?: number;
};

export function ArtworkFormClient({ categories, artwork, artworkId }: Props) {
    const router = useRouter();
    const isEdit = Boolean(artworkId);

    const [images, setImages] = useState(artwork?.images ?? []);
    const [coverImageUrl, setCoverImageUrl] = useState<string | null>(artwork?.coverImageUrl ?? null);
    const [uploading, setUploading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
    } = useForm<ArtworkInsert>({
        resolver: zodResolver(artworkInsertSchema),
        defaultValues: {
            title: artwork?.title ?? "",
            description: artwork?.description ?? "",
            categoryId: undefined,
            isPublished: artwork?.isPublished ?? false,
            sortOrder: artwork?.sortOrder ?? 0,
        },
    });

    const isPublished = watch("isPublished");

    const onSubmit = async (data: ArtworkInsert) => {
        if (isEdit && artworkId) {
            const result = await updateArtworkAction(artworkId, data);
            if (result.error) {
                toast.error("Failed to update artwork");
                return;
            }
            toast.success("Artwork updated");
            router.push("/admin/artworks");
        } else {
            const result = await createArtworkAction(data);
            if (result.error || !result.id) {
                toast.error("Failed to create artwork");
                return;
            }
            toast.success("Artwork created");
            router.push(`/admin/artworks/${result.id}`);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!artworkId || !e.target.files?.length) return;

        setUploading(true);
        try {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append("file", file);

            const result = await addImageToArtworkAction(artworkId, formData);
            if (result.error || !result.image) {
                toast.error("Failed to upload image");
                return;
            }

            setImages(prev => [...prev, result.image]);
            if (images.length === 0) {
                setCoverImageUrl(result.image.imageUrl);
            }
            toast.success("Image uploaded");
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    const handleDeleteImage = async (imageId: number, imageUrl: string) => {
        if (!artworkId || !confirm("Delete this image?")) return;
        const result = await deleteArtworkImageAction(artworkId, imageId, imageUrl);
        if (result.error) {
            toast.error("Failed to delete image");
            return;
        }
        setImages(prev => prev.filter(i => i.id !== imageId));
        toast.success("Image deleted");
    };

    const handleSetCover = async (imageUrl: string) => {
        if (!artworkId) return;
        const result = await setCoverImageAction(artworkId, imageUrl);
        if (result.error) {
            toast.error("Failed to set cover image");
            return;
        }
        setCoverImageUrl(imageUrl);
        toast.success("Cover image updated");
    };

    return (
        <div className="container mx-auto px-6 py-12 max-w-4xl">
            <Button
                variant="ghost"
                onClick={() => router.push("/admin/artworks")}
                className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-8"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Artworks
            </Button>

            <h1 className="text-3xl font-bold text-black dark:text-white mb-8">
                {isEdit ? "Edit Artwork" : "New Artwork"}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6">
                    <h2 className="text-black dark:text-white font-semibold text-lg mb-6">Details</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Label>Title</Label>
                            <Input {...register("title")} className="mt-1" placeholder="My Amazing Comic" />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Textarea {...register("description")} className="mt-1 min-h-[100px]" placeholder="Tell us about this piece..." />
                        </div>

                        <div>
                            <Label>Category</Label>
                            <select
                                {...register("categoryId", { valueAsNumber: true })}
                                defaultValue={artwork?.categoryName ? categories.find(c => c.name === artwork.categoryName)?.id : undefined}
                                className="w-full mt-1 px-3 py-2 bg-white dark:bg-[#0a0a0a] border border-gray-300 dark:border-[#2a2a2a] text-black dark:text-white rounded-md"
                            >
                                <option value="">No category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Label>Sort Order</Label>
                            <Input type="number" {...register("sortOrder", { valueAsNumber: true })} className="mt-1" />
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <Switch checked={isPublished} onCheckedChange={(val) => setValue("isPublished", val)} id="isPublished" />
                            <Label htmlFor="isPublished" className="cursor-pointer">
                                {isPublished ? "Published" : "Draft"}
                            </Label>
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black mt-2">
                            {isSubmitting ? "Saving..." : isEdit ? "Update Artwork" : "Create Artwork"}
                        </Button>
                    </form>
                </div>

                <div className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6">
                    <h2 className="text-black dark:text-white font-semibold text-lg mb-2">Images</h2>

                    {!isEdit ? (
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                            Save the artwork first, then you can upload images.
                        </p>
                    ) : (
                        <>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                                Upload images for this artwork. Click the star to set the cover image.
                            </p>

                            <label className="block mb-6">
                                <div className={`flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-gray-300 dark:border-[#2a2a2a] rounded-lg cursor-pointer hover:border-black dark:hover:border-white transition text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}>
                                    <Upload className="w-4 h-4" />
                                    <span className="text-sm">{uploading ? "Uploading..." : "Click to upload image"}</span>
                                </div>
                                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
                            </label>

                            {images.length === 0 ? (
                                <p className="text-center text-gray-400 dark:text-gray-500 py-8">No images yet.</p>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    {images.map((img) => (
                                        <div key={img.id} className={`relative rounded-lg overflow-hidden border-2 group ${img.imageUrl === coverImageUrl ? "border-black dark:border-white" : "border-gray-200 dark:border-[#2a2a2a]"}`}>
                                            <img src={img.imageUrl} alt={img.altText ?? "Artwork image"} className="w-full aspect-square object-cover" />
                                            {img.imageUrl === coverImageUrl && (
                                                <div className="absolute top-1 left-1 bg-black dark:bg-white rounded-full p-1">
                                                    <Star className="w-3 h-3 text-white dark:text-black fill-current" />
                                                </div>
                                            )}
                                            <div className="absolute bottom-0 left-0 right-0 bg-black/60 flex gap-1 p-1 opacity-0 group-hover:opacity-100 transition">
                                                {img.imageUrl !== coverImageUrl && (
                                                    <button onClick={() => handleSetCover(img.imageUrl)} className="flex-1 flex items-center justify-center gap-1 text-xs text-white py-1 rounded bg-gray-700 hover:bg-gray-600">
                                                        <Star className="w-3 h-3" /> Cover
                                                    </button>
                                                )}
                                                <button onClick={() => handleDeleteImage(img.id, img.imageUrl)} className="flex items-center justify-center p-1 rounded bg-red-800/80 hover:bg-red-700 text-white">
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}