import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "Calma - Tu espacio de gestión emocional",
    description: "Herramientas y ejercicios para el bienestar emocional. Un enfoque humanista para el estrés, la ansiedad y el crecimiento personal.",
};

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
                <main className="flex min-h-screen flex-col">
                    {children}
                </main>
            </body>
        </html>
    );
}
