import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ThemeProvider } from '@/context/ThemeProvider'
import './globals.css'
import {AuthProvider} from "@/context/AuthProvider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner"

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
    title: 'MondakiComics',
    description: 'Original comics and illustrations',
    icons: {
        icon: '/favicon.png',
    },
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
        <body className="min-h-screen flex flex-col bg-white dark:bg-[#050505]">
        <ThemeProvider>
            <AuthProvider>
                <Header />
                <main className="flex-1 pt-20">{children}</main>
                <Footer />
            </AuthProvider>
        </ThemeProvider>
        <Toaster />
        </body>
        </html>
    )
}