import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: {
        default: "Calma - Tu espacio de gestión emocional",
        template: "%s | Calma"
    },
    description: "Herramientas y ejercicios para el bienestar emocional. Un enfoque humanista para el estrés, la ansiedad y el crecimiento personal.",
    keywords: ["salud mental", "ansiedad", "estrés", "psicología", "mindfulness", "diario emocional"],
    authors: [{ name: "Calma Team" }],
    creator: "Calma App",
    openGraph: {
        type: "website",
        locale: "es_ES",
        url: "https://tfm-calma-app.vercel.app",
        title: "Calma - Gestión Emocional",
        description: "Tu espacio seguro para el crecimiento personal y la gestión emocional.",
        siteName: "Calma",
    },
    manifest: "/manifest.json",
};

export const viewport = {
    themeColor: "#0ea5e9",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

import Navbar from "@/components/navbar";

// ... importaciones existentes ...

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="h-full">
            <body className={cn(
                "min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary/20",
                outfit.variable
            )}>
                <Navbar />
                <main className="flex min-h-screen flex-col">
                    {children}
                </main>
            </body>
        </html>
    );
}
