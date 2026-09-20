'use client'

import { useState } from "react";
import { createCategoryAction, updateCategoryAction, deleteCategoryAction } from "@/lib/actions/categories";
import type { Category, CategoryInsert } from "@/schemas/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash2, Plus, X, Check } from "lucide-react";
import { toast } from "sonner";

export function CategoriesAdminClient({ initialCategories }: { initialCategories: Category[] }) {
    const [categories, setCategories] = useState(initialCategories);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<CategoryInsert>({ name: "", slug: "", description: "" });

    const generateSlug = (name: string) =>
        name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

    const handleNameChange = (name: string) => {
        setForm(prev => ({ ...prev, name, slug: editingId ? prev.slug : generateSlug(name) }));
    };

    const handleSubmit = async () => {
        if (!form.name || !form.slug) {
            toast.error("Name and slug are required");
            return;
        }

        const result = editingId
            ? await updateCategoryAction(editingId, form)
            : await createCategoryAction(form);

        if (result.error) {
            toast.error("Failed to save category");
            return;
        }

        toast.success(editingId ? "Category updated" : "Category created");
        setShowForm(false);
        setEditingId(null);
        setForm({ name: "", slug: "", description: "" });
        window.location.reload();
    };

    const handleEdit = (cat: Category) => {
        setForm({ name: cat.name, slug: cat.slug, description: cat.description ?? "" });
        setEditingId(cat.id);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this category?")) return;
        const result = await deleteCategoryAction(id);
        if (result.error) {
            toast.error("Failed to delete category");
            return;
        }
        toast.success("Category deleted");
        setCategories(prev => prev.filter(c => c.id !== id));
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingId(null);
        setForm({ name: "", slug: "", description: "" });
    };

    return (
        <div className="container mx-auto px-6 py-12 max-w-3xl">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-black dark:text-white">Categories</h1>
                {!showForm && (
                    <Button onClick={() => setShowForm(true)} className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Category
                    </Button>
                )}
            </div>

            {showForm && (
                <div className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6 mb-8">
                    <h2 className="text-black dark:text-white font-semibold mb-4">
                        {editingId ? "Edit Category" : "New Category"}
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <Label className="text-gray-600 dark:text-gray-300">Name</Label>
                            <Input value={form.name} onChange={e => handleNameChange(e.target.value)} className="mt-1" placeholder="Fan Art" />
                        </div>
                        <div>
                            <Label className="text-gray-600 dark:text-gray-300">Slug</Label>
                            <Input value={form.slug} onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))} className="mt-1" placeholder="fan-art" />
                        </div>
                        <div>
                            <Label className="text-gray-600 dark:text-gray-300">Description (optional)</Label>
                            <Input value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} className="mt-1" placeholder="Description..." />
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button onClick={handleSubmit} className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black">
                                <Check className="w-4 h-4 mr-2" />
                                {editingId ? "Update" : "Create"}
                            </Button>
                            <Button onClick={handleCancel} variant="outline">
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {categories.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-20">No categories yet. Create one to get started.</div>
            ) : (
                <div className="space-y-3">
                    {categories.map((cat) => (
                        <div key={cat.id} className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-4 flex items-center justify-between">
                            <div>
                                <div className="text-black dark:text-white font-medium">{cat.name}</div>
                                <div className="text-gray-500 dark:text-gray-400 text-sm">/{cat.slug}</div>
                                {cat.description && <div className="text-gray-400 dark:text-gray-500 text-sm mt-1">{cat.description}</div>}
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={() => handleEdit(cat)} variant="outline" size="sm">
                                    <Pencil className="w-4 h-4" />
                                </Button>
                                <Button onClick={() => handleDelete(cat.id)} variant="destructive" size="sm">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}