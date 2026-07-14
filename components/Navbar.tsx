"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import {
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    LinkedinIcon,
    TiktokIcon,
} from "./Icons";

const UKFlag = () => (
    <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0 border border-white/10 select-none flex items-center justify-center">
        <img
            src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg"
            alt="UK Flag"
            className="w-full h-full object-cover scale-[1.1]"
        />
    </div>
);

const KurdistanFlag = () => (
    <div className="w-4 h-4 rounded-full overflow-hidden flex-shrink-0 border border-white/10 select-none flex items-center justify-center">
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Flag_of_Kurdistan.svg"
            alt="Kurdistan Flag"
            className="w-full h-full object-cover scale-[1.1]"
        />
    </div>
);

const Navbar = () => {
    const { lang, setLang, t, isRtl } = useLanguage();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close language selector when clicking outer layout
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const navLinks = [
        { name: t.nav.home, href: "#home" },
        { name: t.nav.about, href: "#about" },
        { name: t.nav.projects, href: "#projects" },
        { name: t.nav.contact, href: "#contact" },
    ];

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const targetId = href.replace("#", "");
        const elem = document.getElementById(targetId);
        if (elem) {
            elem.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav className="fixed inset-x-0 z-50 top-0 select-none">
            <div className="mx-4 sm:mx-6 lg:mx-8 mt-4">
                {/* iOS 26 Liquid Glass pill shaped navbar with extensive blur */}
                <div className="max-w-5xl mx-auto liquid-glass rounded-2xl px-5 sm:px-6 py-1 shadow-xl">
                    <div className="flex items-center justify-between h-14">

                        {/* Logo */}
                        <a href="#home" onClick={(e) => handleScroll(e, "#home")} className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                            <span>ARAAM</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                        </a>

                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleScroll(e, link.href)}
                                    className="px-3.5 py-1.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-205"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>

                        {/* Language & Actions */}
                        <div className="flex items-center gap-2">
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsLangOpen(!isLangOpen)}
                                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200 border border-white/5 bg-white/[0.01] cursor-pointer"
                                >
                                    {lang === "en" ? <UKFlag /> : <KurdistanFlag />}
                                    <span>{lang === "en" ? "English" : "کوردی"}</span>
                                    <ChevronDown size={12} className={`transition-transform duration-300 ${isLangOpen ? "rotate-180" : ""}`} />
                                </button>

                                <div
                                    className={`absolute top-full mt-2 w-32 liquid-glass rounded-xl overflow-hidden py-1 shadow-2xl z-50 transition-all duration-300 ${isRtl ? "left-0" : "right-0"} ${isLangOpen
                                        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                                        : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                                        }`}
                                >
                                    <button
                                        onClick={() => {
                                            setLang("en");
                                            setIsLangOpen(false);
                                        }}
                                        className={`w-full text-start px-3 py-2 text-xs font-medium font-sans flex items-center justify-between transition-colors whitespace-nowrap cursor-pointer ${lang === "en" ? "text-white bg-white/10" : "text-zinc-500 hover:text-zinc-100 hover:bg-white/5"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <UKFlag />
                                            <span>English</span>
                                        </div>
                                        {lang === "en" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </button>
                                    <button
                                        onClick={() => {
                                            setLang("ku");
                                            setIsLangOpen(false);
                                        }}
                                        className={`w-full text-start px-3 py-2 text-xs font-medium flex items-center justify-between transition-colors whitespace-nowrap cursor-pointer ${lang === "ku" ? "text-white bg-white/10" : "text-zinc-500 hover:text-zinc-100 hover:bg-white/5"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <KurdistanFlag />
                                            <span>کوردی</span>
                                        </div>
                                        {lang === "ku" && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Menu Icon */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
                            >
                                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                            </button>
                        </div>

                    </div>

                    {/* Smooth height transition mobile menu panel containing social media icons */}
                    <div
                        className={`md:hidden overflow-hidden transition-all duration-550 ease-in-out ${isMobileMenuOpen
                            ? "max-h-[480px] opacity-100 mt-1 py-5 border-t border-white/5"
                            : "max-h-0 opacity-0 mt-0 py-0 border-t-0 pointer-events-none"
                            }`}
                    >
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="px-4 py-3 rounded-xl text-base sm:text-lg font-bold text-zinc-300 hover:text-white hover:bg-white/5 transition-all text-center tracking-wide"
                                    onClick={(e) => {
                                        handleScroll(e, link.href);
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    {link.name}
                                </a>
                            ))}

                            {/* Integrated Social Channels wrapped in rounded covers */}
                            <div className="flex items-center justify-center gap-4 mt-6 pt-5 border-t border-white/5">
                                <a
                                    href="https://www.linkedin.com/in/aram-zerevan-365572223?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-450 hover:text-white hover:bg-white/10 hover:border-white/12 transition-all duration-300"
                                >
                                    <LinkedinIcon size={16} />
                                </a>
                                <a
                                    href="https://x.com/araam_dev?s=11"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-450 hover:text-white hover:bg-white/10 hover:border-white/12 transition-all duration-300"
                                >
                                    <TwitterIcon size={16} />
                                </a>
                                <a
                                    href="https://www.instagram.com/araam.dev?igsh=MWRpcGJjNzBsNHdycA=="
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-450 hover:text-white hover:bg-white/10 hover:border-white/12 transition-all duration-300"
                                >
                                    <InstagramIcon size={16} />
                                </a>
                                <a
                                    href="https://www.facebook.com/share/1Jx9PM1hvq/?mibextid=wwXIfr"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-450 hover:text-white hover:bg-white/10 hover:border-white/12 transition-all duration-300"
                                >
                                    <FacebookIcon size={16} />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
