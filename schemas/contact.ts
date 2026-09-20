import { z } from "zod";

export const contactMessageSchema = z.object({
    id: z.number().int(),
    senderName: z.string(),
    senderEmail: z.string(),
    message: z.string(),
    isRead: z.boolean(),
    receivedAt: z.string(),
});

export const contactInsertSchema = z.object({
    senderName: z.string().min(1, { message: "Name is required" }),
    senderEmail: z.string().email({ message: "Invalid email" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export type ContactMessage = z.infer<typeof contactMessageSchema>;
export type ContactInsert = z.infer<typeof contactInsertSchema>;