"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import gsap from "gsap";
import { ExternalLink, ChevronDown } from "lucide-react";
import { GithubIcon } from "./Icons";

const projectList = [
{
    title: "Atlas — Live Weather Instrument",
    description: "A high-performance weather dashboard featuring real-time atmospheric data, procedural HTML5 Canvas loops for rain and storm effects, and immersive 3D card physics powered by GSAP.",
    tech: ["HTML5", "CSS3", "JavaScript", "GSAP", "Canvas API"],
    image: "/projects/atlas-preview.png", // ئەو ناڤ و مۆدێلێ وێنەیێ مە د فۆڵدەرێ public دا داناى
},
    {
        title: "Security Threat Radar",
        description: "A premium network administration dashboard that charts active device logs, tracks threat patterns via Python analytics, and issues early alert reports.",
        tech: ["Next.js", "Python", "Chart.js"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80",
    },
    {
        title: "Premium Creative Ledger",
        description: "Sleek portfolio with customizable layouts, fluid GSAP dynamic curves, and high-fidelity Bento styling parameters built for designers.",
        tech: ["Next.js", "React", "GSAP"],
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80",
    },
    {
        title: "AI Semantic Search",
        description: "High-performance search engine built with Pinecone vector backend and Next.js. Processes natural language embeddings under 50ms with custom relevance weights.",
        tech: ["Next.js", "Pinecone", "OpenAI"],
        image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=600&auto=format&fit=crop&q=80",
    },
    {
        title: "P2P Decentralized Storage",
        description: "Encrypted file sharing portal using IPFS and local AES-256 block processing. Insulates client assets from centralized service providers natively in the browser.",
        tech: ["React", "IPFS", "Cryptography"],
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=80",
    },
    {
        title: "Cloud Health Monitor",
        description: "Real-time node administration scanner mapping Pod loads, memory leaks, and routing anomalies. Sends custom webhook diagnostics directly to engineering channels.",
        tech: ["Go", "Kubernetes", "Prometheus"],
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&auto=format&fit=crop&q=80",
    }
];

const Projects = () => {
    const { t } = useLanguage();
    const projectsRef = useRef<HTMLDivElement>(null);
    const [selectedProject, setSelectedProject] = useState<typeof projectList[0] | null>(null);
    const [showAll, setShowAll] = useState(false);

    const visibleProjects = showAll ? projectList : projectList.slice(0, 3);

    useEffect(() => {
        if (!projectsRef.current) return;
        const cards = projectsRef.current.querySelectorAll(".project-card");

        gsap.set(cards, { opacity: 0, y: 35 });

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    gsap.to(cards, {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out"
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.02 }
        );

        observer.observe(projectsRef.current);
        return () => observer.disconnect();
    }, [showAll]);

    const handleShowMore = () => {
        setShowAll(true);
        // Animate new cards after state update
        setTimeout(() => {
            if (!projectsRef.current) return;
            const allCards = projectsRef.current.querySelectorAll(".project-card");
            // Only animate newly visible cards (index 3+)
            const newCards = Array.from(allCards).slice(3);
            gsap.fromTo(newCards,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }
            );
        }, 50);
    };

    return (
        <section id="projects" ref={projectsRef} className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="mb-16 flex flex-col items-center text-center">
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block mb-2">{t.projects.subtitle}</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">{t.projects.title}</h2>
                <div className="w-12 h-[2px] bg-white/20 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleProjects.map((project, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedProject(project)}
                        className="project-card group relative rounded-3xl overflow-hidden flex flex-col h-[380px] cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-zinc-950/70 border border-white/5 hover:border-white/12 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:-translate-y-1.5"
                    >
                        {/* Card Number Badge */}
                        <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-30 w-9 h-9 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center">
                            <span className="text-[11px] font-bold text-white font-mono">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                        </div>

                        {/* Animated Glowing border effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

                        {/* Background Image with Ken Burns Scale Effect */}
                        <div className="absolute inset-0 z-0 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-transparent z-10 transition-colors duration-500 group-hover:bg-zinc-950/85" />
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover grayscale-[35%] opacity-55 group-hover:grayscale-0 group-hover:opacity-65 group-hover:scale-108 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80";
                                }}
                            />
                        </div>

                        {/* Card Content Wrapper */}
                        <div className="relative z-20 flex flex-col justify-end h-full p-6 sm:p-7">
                            {/* Tech tags with slide down fade-in */}
                            <div className="flex flex-wrap gap-1.5 mb-3 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75">
                                {project.tech.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="text-[9px] uppercase font-mono tracking-wider bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-lg text-zinc-300 backdrop-blur-sm"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h3 className="text-base font-bold text-white mb-2 leading-tight tracking-tight uppercase group-hover:text-zinc-300 transition-colors duration-300">
                                {project.title}
                            </h3>

                            {/* Description - Expand height smoothly & fade in */}
                            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
                                <div className="overflow-hidden">
                                    <p className="text-zinc-400 text-xs leading-relaxed mb-4 normal-case font-light">
                                        {project.description}
                                    </p>
                                </div>
                            </div>

                            {/* Actions / Footer */}
                            <div className="flex items-center justify-between pt-4 mt-1 border-t border-white/5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100" onClick={(e) => e.stopPropagation()}>
                                <button
                                    onClick={() => setSelectedProject(project)}
                                    className="flex items-center text-[10px] font-semibold text-white hover:text-zinc-350 transition-colors gap-1.5 uppercase font-mono bg-transparent border-0 cursor-pointer"
                                >
                                    {t.projects.view}
                                    <ExternalLink size={10} className="w-[10px] h-[10px]" />
                                </button>
                                <a
                                    href="#"
                                    className="w-7 h-7 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition duration-300"
                                >
                                    <GithubIcon size={12} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show More / Show Less Button */}
            {projectList.length > 3 && (
                <div className="flex justify-center mt-12">
                    {showAll ? (
                        <button
                            onClick={() => {
                                setShowAll(false);
                                const section = document.getElementById("projects");
                                if (section) {
                                    section.scrollIntoView({ behavior: "smooth" });
                                }
                            }}
                            className="group flex items-center gap-2.5 px-7 py-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-white/12 text-zinc-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                        >
                            <span>Show Less</span>
                            <ChevronDown size={14} className="group-hover:-translate-y-0.5 transition-transform duration-300 rotate-180" />
                        </button>
                    ) : (
                        <button
                            onClick={handleShowMore}
                            className="group flex items-center gap-2.5 px-7 py-3 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.07] hover:border-white/12 text-zinc-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                        >
                            <span>Show All Projects</span>
                            <span className="text-[10px] font-mono text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded">{projectList.length - 3}+</span>
                            <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform duration-300" />
                        </button>
                    )}
                </div>
            )}

            {/* Modal Overlay to read project details */}
            {selectedProject && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg select-none cursor-default"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto bg-zinc-950 border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col gap-5 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Glow ambient */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.015] rounded-full blur-3xl pointer-events-none" />

                        {/* Close button */}
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-zinc-400 hover:text-white transition duration-200 cursor-pointer z-10"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Project Image banner */}
                        <div className="relative h-40 sm:h-48 w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 flex-shrink-0">
                            <img
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                            {/* Number badge in modal */}
                            <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md flex items-center justify-center">
                                <span className="text-xs font-bold text-white font-mono">
                                    {String(projectList.indexOf(selectedProject) + 1).padStart(2, "0")}
                                </span>
                            </div>
                        </div>

                        {/* Text and stats */}
                        <div className="flex flex-col gap-4">
                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-1.5">
                                {selectedProject.tech.map((tech, i) => (
                                    <span
                                        key={i}
                                        className="text-[9px] uppercase font-mono tracking-wider bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-lg text-zinc-300"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg sm:text-xl font-black text-white leading-tight uppercase tracking-tight">
                                {selectedProject.title}
                            </h3>

                            {/* Long Details / Description paragraph */}
                            <p className="text-zinc-400 text-xs sm:text-xs leading-relaxed font-light normal-case">
                                {selectedProject.description}
                                <br />
                                <br />
                                This engineering workspace delivers high-performance data processing, smooth responsive views, and seamless architectural scaling. Developed using premium component structures, modular styling logic, and robust state orchestration systems configured for enterprise-level deployments.
                            </p>

                            {/* Links Footer */}
                            <div className="flex items-center gap-4 mt-1 pt-4 border-t border-white/5">
                                <a
                                    href="https://aram108.github.io/weather/"
                                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold transition duration-200 uppercase"
                                >
                                    <span>Visit Site</span>
                                    <ExternalLink size={12} />
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/11 border border-white/5 text-zinc-300 hover:text-white text-xs font-bold transition duration-200 uppercase"
                                >
                                    <GithubIcon size={12} />
                                    <span>Codebase</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;
