import { therapists } from "@/data/therapists";
import { TherapistCard } from "@/components/therapist-card";
import { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Directorio de Terapeutas | Calma",
    description: "Encuentra profesionales de la salud mental especializados en ansiedad, autoestima y crecimiento personal.",
};

export default function TherapistsPage() {
    return (
        <div className="container py-10 px-4 md:px-6 mx-auto">
            <div className="flex items-center gap-2 mb-8">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Volver al inicio
                </Link>
            </div>

            <div className="flex flex-col items-center text-center space-y-4 mb-12">
                <h1 className="text-3xl font-bold tracking-tight">Encuentra tu terapeuta</h1>
                <p className="text-muted-foreground max-w-[600px] text-lg">
                    Conecta con psicólogos colegiados y terapeutas especializados que pueden acompañarte en tu proceso personal.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {therapists.map((therapist) => (
                    <TherapistCard key={therapist.id} therapist={therapist} />
                ))}
            </div>
        </div>
    );
}
