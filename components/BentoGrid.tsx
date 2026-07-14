"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import gsap from "gsap";
import {
    MapPin,
    Languages,
    Shield,
    Code2,
    Terminal,
    User,
    Smile,
} from "lucide-react";

const BentoGrid = () => {
    const { t, isRtl } = useLanguage();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const items = ref.current.querySelectorAll(".bento-item");

        gsap.set(items, { opacity: 0, y: 30 });

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    gsap.to(items, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.08,
                        ease: "power3.out"
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.02 }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const stack = [
        { name: "Next.js" },
        { name: "React" },
        { name: "React Native" },
        { name: "Tailwind CSS" },
        { name: "TypeScript" },
        { name: "PHP" },
        { name: "MySQL" },
        { name: "Python" },
        { name: "GSAP" },
        { name: "HTML & CSS" }
    ];

    // RTL-aware positioning: memoji goes to the opposite side
    const memojiSide = isRtl ? "-left-3" : "-right-3";
    const memojiSideSm = isRtl ? "-left-3" : "-right-3";
    const textSide = isRtl ? "me-auto" : "";

    return (
        <section id="about" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="mb-16 flex flex-col items-center text-center">
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                    {t.about.subtitle}
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">{t.about.title}</h2>
                <div className="w-12 h-[2px] bg-white/20 rounded-full" />
            </div>

            {/* Bento Grid layout */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[140px] sm:auto-rows-[185px]">

                {/* 1. PROFILE card — col 2, row 2 — with memoji */}
                <div className="bento-item col-span-2 row-span-2 bg-zinc-950 border border-white/5 rounded-3xl p-5 sm:p-7 flex flex-col justify-between group overflow-hidden relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />

                    {/* Top row: memoji bubble + PROFILE tag */}
                    <div className="flex items-center justify-between z-10">
                        <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-zinc-800/90 to-zinc-950 border border-white/10 overflow-hidden flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-500">
                            <img
                                src="/happy.webp"
                                alt="Aram Memoji"
                                className="w-full h-full object-contain scale-110"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80";
                                }}
                            />
                        </div>
                        <span className="flex items-center gap-1.5 text-[9px] font-mono text-zinc-500 tracking-wider uppercase border border-white/5 px-2.5 py-1 rounded-xl bg-white/[0.01]">
                            <User size={10} className="text-zinc-500" />
                            <span>PROFILE</span>
                        </span>
                    </div>

                    {/* Content */}
                    <div className="z-10">
                        <h3 className="text-xl font-bold text-white mb-3">{t.hero.name}</h3>
                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">{t.about.description}</p>
                    </div>
                </div>

                {/* 2. Wave Greetings — Solid Gray */}
                <div className="bento-item col-span-1 row-span-1 bg-zinc-900 border border-zinc-800 rounded-3xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden relative group shadow">
                    {/* Memoji bubble - RTL-aware, placed inside to avoid clipping */}
                    <div className={`absolute ${isRtl ? "left-3" : "right-3"} top-3 w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-zinc-800/90 to-zinc-950/90 border border-white/10 flex items-center justify-center p-1 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 z-0`}>
                        <img
                            src="/star-eye.webp"
                            alt="Aram Wave Memoji"
                            className="w-[88%] h-[88%] object-contain"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80";
                            }}
                        />
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center z-10">
                        <Smile size={14} className="text-white" />
                    </div>
                    <div className={`z-10 max-w-[125px] ${textSide}`}>
                        <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5 flex items-center gap-1">
                            <span>Greetings</span>
                            <span>👋</span>
                        </p>
                        <p className="text-[11px] font-medium text-white leading-snug">Always open to discuss interesting projects.</p>
                    </div>
                </div>

                {/* 3. Location — Glassmorphism */}
                <div className="bento-item col-span-1 row-span-1 bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-3xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden shadow-xl">
                    <div className={`absolute ${isRtl ? "left-3" : "right-3"} top-3 w-16 h-16 opacity-10 pointer-events-none`}>
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-white stroke-2">
                            <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
                            <circle cx="50" cy="50" r="25" />
                            <line x1="50" y1="5" x2="50" y2="95" />
                            <line x1="5" y1="50" x2="95" y2="50" />
                        </svg>
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <MapPin size={15} className="text-white" />
                    </div>
                    <div>
                        <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">{t.about.location}</p>
                        <div className="flex items-center gap-1.5">
                            <p className="text-xs font-semibold text-white">{t.about.duhok}</p>
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* 4. Active Workspace — Carbon Black — memoji top-right */}
                <div className="bento-item col-span-1 row-span-1 bg-zinc-950 border border-white/5 rounded-3xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden relative group shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]">
                    {/* Active Workspace memoji bubble - RTL-aware, top positioned inside to avoid clipping */}
                    <div className={`absolute ${isRtl ? "left-4" : "right-4"} top-4 w-[64px] h-[64px] rounded-2xl bg-gradient-to-br from-zinc-850 to-zinc-950 border border-white/10 flex items-center justify-center p-1 shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 z-0`}>
                        <img
                            src="/on-mac.webp"
                            alt="Aram Coding Memoji"
                            className="w-[88%] h-[88%] object-contain"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80";
                            }}
                        />
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center z-10">
                        <Terminal size={13} className="text-white" />
                    </div>
                    <div className={`z-10 max-w-[125px] ${textSide}`}>
                        <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">Active Workspace</p>
                        <p className="text-[11px] font-medium text-white leading-snug">Full Stack Engineering</p>
                    </div>
                </div>

                {/* 5. Cyber Security — Glassmorphism (same style as Location) */}
                <div className="bento-item col-span-1 row-span-1 bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-3xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden shadow-xl">
                    <div className={`absolute ${isRtl ? "left-3" : "right-3"} top-3 w-16 h-16 opacity-10 pointer-events-none`}>
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-white stroke-2">
                            <polygon points="50,5 95,30 95,70 50,95 5,70 5,30" strokeDasharray="3 3" />
                            <polygon points="50,25 75,40 75,65 50,80 25,65 25,40" />
                        </svg>
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <Shield size={14} className="text-white" />
                    </div>
                    <div>
                        <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider mb-0.5">{t.about.cyber}</p>
                        <div className="flex items-center gap-1.5">
                            <p className="text-xs font-semibold text-white">{t.about.cyber_level}</p>
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* 6. Languages — Solid Gray */}
                <div className="bento-item col-span-2 lg:col-span-2 row-span-2 lg:row-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.02),transparent_40%)] pointer-events-none" />

                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center z-10 animate-fade">
                        <Languages size={15} className="text-white" />
                    </div>

                    <div className="space-y-4 my-auto w-full z-10" dir="ltr">
                        <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">{t.about.languages}</h4>
                        {[
                            { name: "Kurdish", lvl: "Native", val: 100 },
                            { name: "English", lvl: "B1", val: 60 },
                            { name: "Arabic", lvl: "A2", val: 40 }
                        ].map((lg) => (
                            <div key={lg.name} className="space-y-1">
                                <div className="flex justify-between text-[11px] font-mono">
                                    <span className="text-zinc-300">{lg.name}</span>
                                    <span className="text-zinc-500 text-[10px]">{lg.lvl}</span>
                                </div>
                                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
                                    <div className="bg-zinc-500 h-full rounded-full transition-all duration-700 group-hover:bg-white/80" style={{ width: `${lg.val}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-tight z-10">
                        Badini Dialect Main
                    </div>
                </div>

                {/* 7. Tech Stack — Glassmorphism with white/silver mesh background */}
                <div className="bento-item col-span-2 row-span-2 bg-gradient-to-br from-white/[0.04] to-white/[0.005] border border-white/10 backdrop-blur-xl rounded-3xl p-5 sm:p-7 flex flex-col justify-between group overflow-hidden relative shadow-2xl">
                    {/* Symmetrical white/silver mesh glow inside the card */}
                    <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none" />
                    <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />

                    {/* Header */}
                    <div className="flex items-center gap-3 z-10">
                        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <Code2 size={16} className="text-white" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold tracking-tight text-white">{t.tech.title}</h4>
                            <p className="text-[10px] text-zinc-500 font-mono tracking-wider uppercase mt-0.5">{t.tech.subtitle}</p>
                        </div>
                    </div>

                    {/* Tech Badge Grid */}
                    <div className="flex flex-wrap gap-2 pt-4 pb-2 z-10 my-auto">
                        {stack.map((s, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1.5 rounded-xl text-[11px] font-medium text-white/90 bg-white/[0.025] border border-white/8 hover:bg-white/[0.08] hover:border-white/20 hover:text-white transition-all duration-300 cursor-default shadow-[0_2px_10px_rgba(255,255,255,0.01)] hover:-translate-y-0.5"
                            >
                                {s.name}
                            </span>
                        ))}
                    </div>

                    {/* Footer text */}
                    <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider z-10">
                        Modern Tech Ecosystem
                    </div>
                </div>

            </div>
        </section>
    );
};

export default BentoGrid;
