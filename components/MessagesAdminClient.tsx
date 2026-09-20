'use client'

import { useState } from "react";
import { markAsReadAction, deleteMessageAction } from "@/lib/actions/contact";
import type { ContactMessage } from "@/schemas/contact";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, MailOpen, Mail } from "lucide-react";
import { toast } from "sonner";

export function MessagesAdminClient({ initialMessages }: { initialMessages: ContactMessage[] }) {
    const [messages, setMessages] = useState(initialMessages);
    const [expanded, setExpanded] = useState<number | null>(null);

    const handleMarkAsRead = async (id: number) => {
        await markAsReadAction(id);
        setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this message?")) return;
        const result = await deleteMessageAction(id);
        if (result.error) {
            toast.error("Failed to delete message");
            return;
        }
        toast.success("Message deleted");
        setMessages(prev => prev.filter(m => m.id !== id));
    };

    const handleExpand = async (id: number) => {
        const isOpening = expanded !== id;
        setExpanded(isOpening ? id : null);
        if (!isOpening) return;

        const message = messages.find((m) => m.id === id);
        if (message && !message.isRead) {
            await handleMarkAsRead(id);
        }
    };

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

    return (
        <div className="container mx-auto px-6 py-12 max-w-3xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-black dark:text-white">Messages</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">{messages.filter(m => !m.isRead).length} unread</p>
                </div>
            </div>

            {messages.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-20">No messages yet.</div>
            ) : (
                <div className="space-y-3">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`bg-gray-50 dark:bg-[#121212] rounded-lg border transition ${msg.isRead ? "border-gray-200 dark:border-[#2a2a2a]" : "border-black dark:border-white"}`}>
                            <button onClick={() => handleExpand(msg.id)} className="w-full p-4 text-left flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3 min-w-0">
                                    {msg.isRead ? <MailOpen className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <Mail className="w-4 h-4 text-black dark:text-white flex-shrink-0" />}
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="text-black dark:text-white font-medium">{msg.senderName}</span>
                                            {!msg.isRead && <Badge className="bg-black dark:bg-white text-white dark:text-black text-xs">New</Badge>}
                                        </div>
                                        <div className="text-gray-500 dark:text-gray-400 text-sm truncate">{msg.senderEmail}</div>
                                    </div>
                                </div>
                                <div className="text-gray-400 dark:text-gray-500 text-xs flex-shrink-0">{formatDate(msg.receivedAt)}</div>
                            </button>

                            {expanded === msg.id && (
                                <div className="px-4 pb-4 border-t border-gray-200 dark:border-[#2a2a2a] pt-4">
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{msg.message}</p>
                                    <div className="flex gap-2">
                                        <a href={`mailto:${msg.senderEmail}`} className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-gray-200 dark:bg-[#2a2a2a] text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white text-sm transition">
                                            <Mail className="w-3 h-3" />
                                            Reply
                                        </a>
                                        <Button onClick={() => handleDelete(msg.id)} variant="destructive" size="sm">
                                            <Trash2 className="w-3 h-3 mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}