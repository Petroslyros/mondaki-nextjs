import Link from "next/link";
import { getDashboardStats } from "@/lib/dashboard";
import { Images, FolderOpen, MessageSquare, Newspaper } from "lucide-react";

export default async function AdminDashboardPage() {
    const stats = await getDashboardStats();

    const cards = [
        {
            label: "Total Artworks",
            value: stats.totalArtworks,
            sub: `${stats.publishedArtworks} published`,
            icon: Images,
            href: "/admin/artworks",
        },
        {
            label: "Categories",
            value: stats.totalCategories,
            sub: "Manage categories",
            icon: FolderOpen,
            href: "/admin/categories",
        },
        {
            label: "News Posts",
            value: stats.totalNews,
            sub: "Manage news",
            icon: Newspaper,
            href: "/admin/news",
        },
        {
            label: "Unread Messages",
            value: stats.unreadMessages,
            sub: "View all messages",
            icon: MessageSquare,
            href: "/admin/messages",
        },
    ];

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-black dark:text-white">Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Welcome back, Mondaki!</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <Link
                            key={card.label}
                            href={card.href}
                            className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#2a2a2a] hover:border-black dark:hover:border-white
                                       rounded-lg p-6 text-left transition duration-200 block"
                        >
                            <Icon className="w-8 h-8 text-black dark:text-white mb-4" />
                            <div className="text-3xl font-bold text-black dark:text-white mb-1">
                                {card.value}
                            </div>
                            <div className="text-black dark:text-white font-medium">{card.label}</div>
                            <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">{card.sub}</div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}