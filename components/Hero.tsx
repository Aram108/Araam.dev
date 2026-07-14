"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import gsap from "gsap";
import { ArrowRight, MapPin, Terminal } from "lucide-react";

const Hero = () => {
    const { t, isRtl } = useLanguage();
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(".hero-badge", { y: -15, opacity: 0, duration: 0.6 })
                .from(".hero-heading", { y: 30, opacity: 0, duration: 0.8 }, "-=0.3")
                .from(".hero-sub", { y: 20, opacity: 0, duration: 0.7 }, "-=0.4")
                .from(".hero-cta", { y: 15, opacity: 0, duration: 0.6 }, "-=0.3")
                .from(".hero-visuals", {
                    x: isRtl ? -45 : 45,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power4.out",
                }, "-=0.8");
        }, heroRef);

        return () => ctx.revert();
    }, [t, isRtl]);

    return (
        <section
            id="home"
            ref={heroRef}
            className="min-h-screen flex items-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
            {/* Mesh/Grid Background Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black_70%,transparent_100%)] pointer-events-none" />

            <div className={`max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10 ${isRtl ? "[direction:rtl]" : "[direction:ltr]"}`}>

                {/* Left column info */}
                <div className="lg:col-span-7 flex flex-col gap-6 text-start w-full" style={{ direction: isRtl ? "rtl" : "ltr" }}>

                    <div className="hero-badge flex items-center gap-2 w-fit px-4 py-2 rounded-full liquid-glass text-xs font-mono uppercase tracking-wider text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse" />
                        {t.hero.role}
                    </div>

                    <h1 className="hero-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
                        {t.hero.greeting} <br />
                        <span className="text-zinc-400">{t.hero.name}</span>
                    </h1>

                    <p className="hero-sub text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed font-light">
                        {t.hero.description}
                    </p>

                    <div className="hero-cta flex flex-wrap gap-4 pt-2">
                        <a
                            href="#projects"
                            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-zinc-200 text-black text-sm font-semibold transition-all duration-300"
                        >
                            {t.hero.view_work}
                            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                        </a>
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl liquid-glass text-sm font-medium text-zinc-300 hover:text-white transition-all duration-300"
                        >
                            {t.hero.cta}
                        </a>
                    </div>

                    <div className="hero-cta flex flex-wrap items-center gap-6 pt-4 text-xs font-mono text-zinc-500">
                        <span className="flex items-center gap-2">
                            <Terminal size={14} className="text-zinc-400" />
                            Software Architecture / Full Stack Engineering / Cyber Security
                        </span>
                        <span className="flex items-center gap-2">
                            <MapPin size={14} className="text-zinc-400" />
                            {t.about.duhok}
                        </span>
                    </div>

                </div>

                {/* Right column visuals (Image & Memoji) */}
                <div className="lg:col-span-5 flex justify-center lg:justify-end">
                    <div className="hero-visuals relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[350px] lg:h-[350px] select-none">

                        {/* Ambient glows (strictly grayscale) */}
                        <div className="absolute inset-0 rounded-[2rem] bg-white/5 blur-2xl opacity-40 pointer-events-none" />
                        <div className="absolute -inset-[1px] rounded-[2rem] bg-gradient-to-tr from-white/10 to-zinc-500/10 opacity-30 pointer-events-none" />

                        {/* Standard formal profile image */}
                        <div className="w-full h-full rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5 relative shadow-2xl">
                            <img
                                src="/aram-pic.jpg"
                                alt="Aram Zeravan"
                                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700 hover:scale-103"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src =
                                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80";
                                }}
                            />

                            {/* iOS 26 Overlapping Glass Status Badge holding a friendly wave Memoji */}
                            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl liquid-glass flex items-center justify-between border border-white/10 shadow-lg backdrop-blur-3xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-white/10 overflow-hidden flex-shrink-0">
                                        <img
                                            src="/happy.webp"
                                            alt="Aram Zeravan Memoji"
                                            className="w-full h-full object-cover scale-110"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80";
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Aram Z.</p>
                                        <p className="text-xs font-semibold text-white">Full Stack Developer</p>
                                    </div>
                                </div>
                                <div className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
