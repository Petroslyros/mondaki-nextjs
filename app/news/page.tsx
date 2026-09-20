import Link from "next/link";
import { getPublishedNews } from "@/lib/news";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("el-GR", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function NewsPage() {
    const news = await getPublishedNews();

    return (
        <div className="container mx-auto px-6 py-12 max-w-3xl">
            <Link href="/">
                <Button variant="ghost" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Πίσω στη Gallery
                </Button>
            </Link>

            <h1 className="text-4xl font-bold text-black dark:text-white mb-10 text-center">Νέα</h1>

            {news.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-20">Δεν υπάρχουν νέα αυτή τη στιγμή.</div>
            ) : (
                <div className="flex flex-col gap-6">
                    {news.map((post) => (
                        <Link
                            key={post.id}
                            href={`/news/${post.id}`}
                            className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#2a2a2a] hover:border-black dark:hover:border-white rounded-lg p-6 flex gap-5 transition"
                        >
                            {post.imageUrl && (
                                <div className="flex-shrink-0 w-40 h-40 rounded-lg overflow-hidden bg-gray-200 dark:bg-[#0a0a0a]">
                                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="text-gray-400 dark:text-gray-500 text-sm mb-2">{formatDate(post.insertedAt)}</div>
                                <h2 className="text-black dark:text-white font-semibold text-xl mb-3">{post.title}</h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">{post.content}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}