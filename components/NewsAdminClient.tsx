'use client'

import { useState } from "react";
import {
    createNewsAction,
    updateNewsAction,
    deleteNewsAction,
    toggleNewsPublishAction,
    setNewsImageAction,
} from "@/lib/actions/news";
import type { NewsPost, NewsInsert } from "@/schemas/news";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, X, Check, Eye, EyeOff, Upload } from "lucide-react";
import { toast } from "sonner";

export function NewsAdminClient({ initialNews }: { initialNews: NewsPost[] }) {
    const [news, setNews] = useState(initialNews);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState<NewsInsert>({ title: "", content: "", isPublished: false, sortOrder: 0 });
    const [uploadingId, setUploadingId] = useState<number | null>(null);

    const handleSubmit = async () => {
        if (!form.title || !form.content) {
            toast.error("Ο τίτλος και το περιεχόμενο είναι υποχρεωτικά");
            return;
        }

        const result = editingId
            ? await updateNewsAction(editingId, form)
            : await createNewsAction(form);

        if (result.error) {
            toast.error("Αποτυχία αποθήκευσης");
            return;
        }

        toast.success(editingId ? "Το νέο ενημερώθηκε" : "Το νέο δημιουργήθηκε");
        setShowForm(false);
        setEditingId(null);
        setForm({ title: "", content: "", isPublished: false, sortOrder: 0 });
        window.location.reload();
    };

    const handleEdit = (post: NewsPost) => {
        setForm({ title: post.title, content: post.content, isPublished: post.isPublished, sortOrder: post.sortOrder });
        setEditingId(post.id);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Διαγραφή αυτού του νέου;")) return;
        const result = await deleteNewsAction(id);
        if (result.error) {
            toast.error("Αποτυχία διαγραφής");
            return;
        }
        toast.success("Το νέο διαγράφηκε");
        setNews(prev => prev.filter(n => n.id !== id));
    };

    const handleTogglePublish = async (id: number, currentState: boolean) => {
        const result = await toggleNewsPublishAction(id, currentState);
        setNews(prev => prev.map(n => n.id === id ? { ...n, isPublished: result.isPublished } : n));
    };

    const handleImageUpload = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        setUploadingId(id);
        try {
            const formData = new FormData();
            formData.append("file", e.target.files[0]);
            const result = await setNewsImageAction(id, formData);
            if (result.error || !result.imageUrl) {
                toast.error("Αποτυχία ανεβάσματος εικόνας");
                return;
            }
            setNews(prev => prev.map(n => n.id === id ? { ...n, imageUrl: result.imageUrl } : n));
            toast.success("Η εικόνα ανέβηκε");
        } finally {
            setUploadingId(null);
            e.target.value = "";
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingId(null);
        setForm({ title: "", content: "", isPublished: false, sortOrder: 0 });
    };

    return (
        <div className="container mx-auto px-6 py-12 max-w-3xl">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-black dark:text-white">Νέα</h1>
                {!showForm && (
                    <Button onClick={() => setShowForm(true)} className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black">
                        <Plus className="w-4 h-4 mr-2" />
                        Νέα Ανάρτηση
                    </Button>
                )}
            </div>

            {showForm && (
                <div className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-6 mb-8">
                    <h2 className="text-black dark:text-white font-semibold mb-4">
                        {editingId ? "Επεξεργασία Νέου" : "Νέα Ανάρτηση"}
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <Label>Τίτλος</Label>
                            <Input value={form.title} onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))} className="mt-1" placeholder="π.χ. Θα με βρείτε στη Comicdom!" />
                        </div>
                        <div>
                            <Label>Περιεχόμενο</Label>
                            <Textarea value={form.content} onChange={e => setForm(prev => ({ ...prev, content: e.target.value }))} className="mt-1 min-h-[120px]" placeholder="Λεπτομέρειες..." />
                        </div>
                        {!editingId && (
                            <p className="text-gray-400 dark:text-gray-500 text-sm">
                                Αποθήκευσε πρώτα το νέο, και μετά θα μπορείς να ανεβάσεις φωτογραφία.
                            </p>
                        )}
                        <div className="flex gap-3 pt-2">
                            <Button onClick={handleSubmit} className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black">
                                <Check className="w-4 h-4 mr-2" />
                                {editingId ? "Ενημέρωση" : "Δημιουργία"}
                            </Button>
                            <Button onClick={handleCancel} variant="outline">
                                <X className="w-4 h-4 mr-2" />
                                Ακύρωση
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {news.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-20">Δεν υπάρχουν νέα ακόμα.</div>
            ) : (
                <div className="space-y-3">
                    {news.map((post) => (
                        <div key={post.id} className="bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#2a2a2a] rounded-lg p-4">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0">
                                    <label className="block w-20 h-20 rounded-lg overflow-hidden border border-gray-300 dark:border-[#2a2a2a] cursor-pointer relative bg-gray-100 dark:bg-[#0a0a0a]">
                                        {post.imageUrl ? (
                                            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500">
                                                {uploadingId === post.id ? <span className="text-xs">...</span> : (
                                                    <>
                                                        <Upload className="w-4 h-4" />
                                                        <span className="text-[10px] mt-1">Εικόνα</span>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(post.id, e)} disabled={uploadingId === post.id} className="hidden" />
                                    </label>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="text-black dark:text-white font-medium">{post.title}</span>
                                            <Badge className={post.isPublished ? "bg-green-600 text-white" : "bg-gray-400 dark:bg-gray-600 text-white"}>
                                                {post.isPublished ? "Δημοσιευμένο" : "Πρόχειρο"}
                                            </Badge>
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0">
                                            <Button onClick={() => handleTogglePublish(post.id, post.isPublished)} variant="outline" size="sm">
                                                {post.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </Button>
                                            <Button onClick={() => handleEdit(post)} variant="outline" size="sm">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button onClick={() => handleDelete(post.id)} variant="destructive" size="sm">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">{post.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}