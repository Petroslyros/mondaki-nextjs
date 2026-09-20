import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsById } from "@/lib/news";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("el-GR", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getNewsById(Number(id));
    if (!post) notFound();

    return (
        <div className="container mx-auto px-6 py-12 max-w-3xl">
            <Link href="/news">
                <Button variant="ghost" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Πίσω στα Νέα
                </Button>
            </Link>

            {post.imageUrl && (
                <div className="w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-[#121212] mb-8">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-[600px] object-contain mx-auto" />
                </div>
            )}

            <div className="text-gray-400 dark:text-gray-500 text-sm mb-2">{formatDate(post.insertedAt)}</div>
            <h1 className="text-3xl font-bold text-black dark:text-white mb-6">{post.title}</h1>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">{post.content}</p>
        </div>
    );
}