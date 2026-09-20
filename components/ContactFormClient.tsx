'use client'

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactInsertSchema, type ContactInsert } from "@/schemas/contact";
import { sendMessageAction } from "@/lib/actions/contact";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, Mail } from "lucide-react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

export function ContactFormClient() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactInsert>({
        resolver: zodResolver(contactInsertSchema),
        defaultValues: { senderName: "", senderEmail: "", message: "" },
    });

    const onSubmit = async (data: ContactInsert) => {
        const result = await sendMessageAction(data);
        if (result.error) {
            toast.error("Αποτυχία αποστολής μηνύματος. Δοκίμασε ξανά.");
            return;
        }
        toast.success("Το μήνυμα στάλθηκε! Θα σου απαντήσω σύντομα.");
        reset();
    };

    return (
        <div className="container mx-auto px-6 py-12 max-w-4xl">
            <Button
                variant="ghost"
                onClick={() => router.push("/")}
                className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white mb-8"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Πίσω στη Gallery
            </Button>

            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Επικοινωνία</h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                    Ενδιαφέρεσαι για μια παραγγελία ή για συνεργασία;
                    Στείλε μου ένα μήνυμα και θα σου απαντήσω το συντομότερο δυνατό.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12">
                <div className="relative">
                    <div className="relative bg-white dark:bg-black border-4 border-black dark:border-white rounded-[2.5rem] p-8 shadow-[6px_6px_0_0_rgba(0,0,0,1)] dark:shadow-[6px_6px_0_0_rgba(255,255,255,1)]">
                        <h2 className="text-black dark:text-white font-semibold text-xl mb-6">Συμπλήρωσε :</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" autoComplete="off">
                            <div className="bg-gray-50 dark:bg-[#0a0a0a] border-2 border-black dark:border-white rounded-2xl px-4 py-3">
                                <Label htmlFor="senderName" className="text-gray-600 dark:text-gray-300 text-xs tracking-wide">
                                    Το Όνομά σου
                                </Label>
                                <Input
                                    id="senderName"
                                    {...register("senderName")}
                                    className="bg-transparent border-none text-black dark:text-white mt-1 p-0 h-auto focus-visible:ring-0"
                                />
                                {errors.senderName && <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{errors.senderName.message}</p>}
                            </div>

                            <div className="bg-gray-50 dark:bg-[#0a0a0a] border-2 border-black dark:border-white rounded-2xl px-4 py-3">
                                <Label htmlFor="senderEmail" className="text-gray-600 dark:text-gray-300 text-xs tracking-wide">
                                    Το Email σου
                                </Label>
                                <Input
                                    id="senderEmail"
                                    type="email"
                                    {...register("senderEmail")}
                                    className="bg-transparent border-none text-black dark:text-white mt-1 p-0 h-auto focus-visible:ring-0"
                                />
                                {errors.senderEmail && <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{errors.senderEmail.message}</p>}
                            </div>

                            <div className="bg-gray-50 dark:bg-[#0a0a0a] border-2 border-black dark:border-white rounded-2xl px-4 py-3">
                                <Label htmlFor="message" className="text-gray-600 dark:text-gray-300 text-xs tracking-wide">
                                    Μήνυμα
                                </Label>
                                <Textarea
                                    id="message"
                                    {...register("message")}
                                    className="bg-transparent border-none text-black dark:text-white mt-1 p-0 min-h-[100px] resize-none focus-visible:ring-0"
                                />
                                {errors.message && <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{errors.message.message}</p>}
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black rounded-full"
                            >
                                {isSubmitting ? "Αποστολή..." : "Αποστολή Μηνύματος"}
                            </Button>
                        </form>
                    </div>
                    <div className="absolute -bottom-5 left-12 w-10 h-10 bg-white dark:bg-black border-l-4 border-b-4 border-black dark:border-white rotate-[-45deg] rounded-bl-xl" />
                </div>

                <div className="flex flex-col gap-6 justify-center">
                    <h2 className="text-black dark:text-white font-semibold text-xl">Βρες με Online</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Μπορείς επίσης να με βρεις στα social media ή να μου στείλεις απευθείας email.
                    </p>
                    <div className="flex flex-col gap-4">
                        <a href="https://www.instagram.com/mondastardust95/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
                            <FaInstagram className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            @mondastardust95
                        </a>
                        <a href="https://www.facebook.com/mondaki.dakogianni" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
                            <FaFacebookF className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            Mondaki Comics
                        </a>
                        <a href="https://www.linkedin.com/in/olia-ntakogianni-5332371a4/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
                            <FaLinkedinIn className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            Olia Ntakogianni
                        </a>
                        <a href="mailto:oliantakogianni@gmail.com" className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
                            <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            oliantakogianni@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}