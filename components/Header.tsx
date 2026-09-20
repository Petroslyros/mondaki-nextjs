'use client'

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { AuthButton } from "@/components/AuthButton";
import { Menu, X, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const Header = () => {
    const { isAuthenticated, userRole } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="bg-gray-50 dark:bg-[#121212] w-full fixed top-0 z-50 shadow-md border-b border-gray-200 dark:border-[#2a2a2a]">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
                        <img src="/logo-light.png" alt="MondakiComics" className="h-20 w-auto dark:hidden" />
                        <img src="/logo-dark.png" alt="MondakiComics" className="h-20 w-auto hidden dark:block" />
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        <nav className="flex gap-6 text-gray-600 dark:text-gray-300 font-medium">
                            <Link href="/" className="hover:text-black dark:hover:text-white transition duration-200">
                                Gallery
                            </Link>
                            <Link href="/news" className="hover:text-black dark:hover:text-white transition duration-200">
                                News
                            </Link>
                            <Link href="/about" className="hover:text-black dark:hover:text-white transition duration-200">
                                About me
                            </Link>
                            <Link href="/contact" className="hover:text-black dark:hover:text-white transition duration-200">
                                Contact
                            </Link>
                            {isAuthenticated && userRole === "Admin" && (
                                <button
                                    onClick={() => router.push("/admin")}
                                    className="flex items-center gap-1 hover:text-black dark:hover:text-white transition duration-200"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Admin
                                </button>
                            )}
                        </nav>
                        <ThemeToggle />
                        {isAuthenticated && <AuthButton />}
                    </div>

                    <div className="flex items-center gap-4 md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
                        >
                            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {menuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-[#2a2a2a]">
                        <nav className="flex flex-col gap-3 py-4">
                            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition py-2" onClick={closeMenu}>
                                Gallery
                            </Link>
                            <Link href="/news" className="hover:text-black dark:hover:text-white transition duration-200">
                                News
                            </Link>
                            <Link href="/about" className="hover:text-black dark:hover:text-white transition duration-200">
                                About me
                            </Link>
                            <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition py-2" onClick={closeMenu}>
                                Contact
                            </Link>
                            {isAuthenticated && userRole === "Admin" && (
                                <Link href="/admin" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition py-2 flex items-center gap-1" onClick={closeMenu}>
                                    <LayoutDashboard className="w-4 h-4" />
                                    Admin
                                </Link>
                            )}
                        </nav>
                        {isAuthenticated && (
                            <div className="border-t border-gray-200 dark:border-[#2a2a2a] pt-4">
                                <AuthButton />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;