"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { en } from "../locales/en";
import { ku } from "../locales/ku";

type Language = "en" | "ku";
type Translations = typeof en;

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: Translations;
    isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<Language>("en");

    const t = lang === "en" ? en : ku;
    const isRtl = lang === "ku";

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, isRtl }}>
            <div dir={isRtl ? "rtl" : "ltr"}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
