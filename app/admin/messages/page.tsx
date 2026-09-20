import { getAllMessages } from "@/lib/messages";
import { MessagesAdminClient } from "@/components/MessagesAdminClient";

export default async function MessagesPage() {
    const messages = await getAllMessages();
    return <MessagesAdminClient initialMessages={messages} />;
}