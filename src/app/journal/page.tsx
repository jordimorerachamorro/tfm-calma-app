import { getJournalEntries } from "./actions";
import { JournalEntryCard } from "@/components/journal-entry-card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookHeart } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Diario Emocional | Calma",
    description: "Tu espacio privado para registrar pensamientos y emociones.",
};

export default async function JournalPage() {
    const entries = await getJournalEntries();

    return (
        <div className="container py-10 px-4 md:px-6 mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                        <BookHeart className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Diario Emocional</h1>
                        <p className="text-muted-foreground">Registra y reflexiona sobre tu día a día.</p>
                    </div>
                </div>
                <Button asChild>
                    <Link href="/journal/new">
                        <PlusCircle className="mr-2 h-4 w-4" /> Nueva Entrada
                    </Link>
                </Button>
            </div>

            {entries.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/30">
                    <BookHeart className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium">Tu diario está vacío</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                        Aún no has escrito ninguna entrada. Empieza hoy mismo a registrar tus pensamientos.
                    </p>
                    <Button variant="outline" asChild>
                        <Link href="/journal/new">
                            Escribir primera entrada
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                    {entries.map((entry) => (
                        <JournalEntryCard key={entry.id} entry={entry} />
                    ))}
                </div>
            )}
        </div>
    );
}
