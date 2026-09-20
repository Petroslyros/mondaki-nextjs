import { getAllCategories } from "@/lib/categories";
import { CategoriesAdminClient } from "@/components/CategoriesAdminClient";

export default async function CategoriesAdminPage() {
    const categories = await getAllCategories();
    return <CategoriesAdminClient initialCategories={categories} />;
}