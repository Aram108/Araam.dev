"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BentoGrid from "../components/BentoGrid";
import Projects from "../components/Projects";
import Footer from "../components/Footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }, []);

  return (
    <main className="mesh-bg min-h-screen text-zinc-50 font-sans selection:bg-white/10 selection:text-white relative">
      <div className="moving-grid" />
      <Navbar />
      <Hero />
      <BentoGrid />
      <Projects />
      <Footer />
    </main>
  );
}
