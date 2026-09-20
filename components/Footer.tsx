import { Mail } from "lucide-react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";


const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: "Instagram", url: "https://www.instagram.com/mondastardust95/", icon: FaInstagram },
        { name: "Facebook", url: "https://www.facebook.com/mondaki.dakogianni", icon: FaFacebookF },
        { name: "LinkedIn", url: "https://www.linkedin.com/in/olia-ntakogianni-5332371a4/", icon: FaLinkedinIn },
        { name: "Email", url: "mailto:oliantakogianni@gmail.com", icon: Mail },
    ];

    const quickLinks = [
        { label: "Gallery", url: "/" },
        { label: "News", url: "/news" },
        { label: "About me", url: "/about" },
        { label: "Contact", url: "/contact" },
    ];

    return (
        <footer className="bg-gray-50 dark:bg-[#121212] text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-[#2a2a2a]">
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div className="text-center md:text-left">
                        <img src="/logo-light.png" alt="MondakiComics" className="h-20 w-auto mx-auto md:mx-0 dark:hidden mb-2" />
                        <img src="/logo-dark.png" alt="MondakiComics" className="h-20 w-auto mx-auto md:mx-0 hidden dark:block mb-2" />
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Original comics and illustrations
                        </p>
                    </div>

                    <div className="text-center">
                        <h4 className="text-black dark:text-white font-semibold mb-3">Quick Links</h4>
                        <div className="flex flex-col gap-2 text-sm">
                            {quickLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.url}
                                    className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="text-center md:text-right">
                        <h4 className="text-black dark:text-white font-semibold mb-3">Follow</h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                            oliantakogianni@gmail.com
                        </p>
                        <div className="flex gap-4 justify-center md:justify-end">
                            {socialLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        target={link.name === "Email" ? undefined : "_blank"}
                                        rel={link.name === "Email" ? undefined : "noopener noreferrer"}
                                        className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition hover:scale-110 transform"
                                        aria-label={link.name}
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-[#2a2a2a] pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div>
                            © {currentYear}{" "}
                            <span className="font-medium text-black dark:text-white">Mondaki</span>
                            . All Rights Reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;