import { getAllNewsAdmin } from "@/lib/news";
import { NewsAdminClient } from "@/components/NewsAdminClient";

export default async function NewsAdminPage() {
    const news = await getAllNewsAdmin();
    return <NewsAdminClient initialNews={news} />;
}