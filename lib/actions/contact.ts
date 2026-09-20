'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { ContactInsert } from "@/schemas/contact";

export async function sendMessageAction(data: ContactInsert) {
    const supabase = await createClient();
    const { error } = await supabase.from("ContactMessages").insert({
        SenderName: data.senderName,
        SenderEmail: data.senderEmail,
        Message: data.message,
        IsRead: false,
    });

    if (error) {
        console.error("sendMessageAction error:", error);
        return { error: error.message };
    }
    return { error: null };
}

export async function markAsReadAction(id: number) {
    const supabase = await createClient();
    const { error } = await supabase
        .from("ContactMessages")
        .update({ IsRead: true })
        .eq("Id", id);

    if (error) return { error: error.message };
    revalidatePath("/admin/messages");
    return { error: null };
}

export async function deleteMessageAction(id: number) {
    const supabase = await createClient();
    const { error } = await supabase.from("ContactMessages").delete().eq("Id", id);

    if (error) return { error: error.message };
    revalidatePath("/admin/messages");
    return { error: null };
}