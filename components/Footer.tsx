"use client";

import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Mail, Phone, MapPin } from "lucide-react";
import { FacebookIcon, InstagramIcon, TwitterIcon, LinkedinIcon } from "./Icons";

const Footer = () => {
    const { t, isRtl } = useLanguage();

    const socialLinks = [
        { icon: LinkedinIcon, href: "https://www.linkedin.com/in/aram-zerevan-365572223?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
        { icon: TwitterIcon, href: "https://x.com/araam_dev?s=11" },
        { icon: InstagramIcon, href: "https://www.instagram.com/araam.dev?igsh=MWRpcGJjNzBsNHdycA==" },
        { icon: FacebookIcon, href: "https://www.facebook.com/share/1Jx9PM1hvq/?mibextid=wwXIfr" },
    ];

    const contactItems = [
        {
            icon: <Mail size={14} className="text-zinc-500 flex-shrink-0" />,
            label: "aramkrd8@gmail.com",
            href: "mailto:aramkrd8@gmail.com",
            ltr: false,
        },
        {
            icon: <Phone size={14} className="text-zinc-500 flex-shrink-0" />,
            label: "+964 750 843 9986",
            href: "tel:+9647508439986",
            ltr: true,
        },
        {
            icon: <MapPin size={14} className="text-zinc-500 flex-shrink-0" />,
            label: t.about.duhok,
            href: null,
            ltr: false,
        },
    ];

    const navItems = [
        { label: t.nav.home, href: "#home" },
        { label: t.nav.about, href: "#about" },
        { label: t.nav.projects, href: "#projects" },
    ];

    return (
        <footer id="contact" className="relative border-t border-white/5 bg-zinc-950 pt-20 pb-10 overflow-hidden">

            {/* Subtle top glow line */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Main columns ── */}
                <div
                    dir={isRtl ? "rtl" : "ltr"}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-10 pb-12 border-b border-white/5"
                >

                    {/* Col 1 — Brand */}
                    <div className="sm:col-span-1 flex flex-col gap-5">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold tracking-tight text-white">ARAAM</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                        </div>
                        <p className="text-zinc-500 text-xs leading-relaxed font-light max-w-[220px]">
                            {t.hero.description}
                        </p>
                        <div className="flex gap-2 mt-1">
                            {socialLinks.map((s, i) => (
                                <a
                                    key={i}
                                    href={s.href}
                                    className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/8 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/8 transition-all duration-200"
                                >
                                    <s.icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Col 2 — Navigation */}
                    <div className="flex flex-col gap-4">
                        <p className="text-white text-[10px] font-semibold uppercase tracking-widest">
                            {isRtl ? "ڕێکێشان" : "Navigation"}
                        </p>
                        <ul className="flex flex-col gap-2.5">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        className="text-zinc-500 text-sm hover:text-white transition-colors duration-200"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Col 3 — Contact */}
                    <div className="flex flex-col gap-4">
                        <p className="text-white text-[10px] font-semibold uppercase tracking-widest">
                            {t.contact.title}
                        </p>
                        <ul className="flex flex-col gap-3">
                            {contactItems.map((item, i) =>
                                item.href ? (
                                    <li key={i}>
                                        <a
                                            href={item.href}
                                            className="flex items-center gap-2.5 text-zinc-500 text-xs hover:text-white transition-colors duration-200"
                                        >
                                            {item.icon}
                                            {item.ltr ? (
                                                <span dir="ltr">{item.label}</span>
                                            ) : (
                                                <span>{item.label}</span>
                                            )}
                                        </a>
                                    </li>
                                ) : (
                                    <li key={i} className="flex items-center gap-2.5 text-zinc-500 text-xs">
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                </div>

                {/* Bottom copyright bar */}
                <div className="border-t border-white/5 pt-8 flex items-center justify-center text-zinc-600 text-[11px] font-mono text-center">
                    <span>© {new Date().getFullYear()} Aram Zeravan. {t.footer.rights}</span>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
