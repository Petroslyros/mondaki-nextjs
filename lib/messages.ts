import { createClient } from "@/lib/supabase/server";
import type { ContactMessage } from "@/schemas/contact";

type MessageRow = {
    Id: number;
    SenderName: string;
    SenderEmail: string;
    Message: string;
    IsRead: boolean;
    ReceivedAt: string;
};

export async function getAllMessages(): Promise<ContactMessage[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("ContactMessages")
        .select("*")
        .order("ReceivedAt", { ascending: false });

    if (error) throw new Error(error.message);
    return (data as MessageRow[]).map((row) => ({
        id: row.Id,
        senderName: row.SenderName,
        senderEmail: row.SenderEmail,
        message: row.Message,
        isRead: row.IsRead,
        receivedAt: row.ReceivedAt,
    }));
}