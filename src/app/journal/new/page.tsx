import { createJournalEntry } from "../actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Nueva Entrada | Diario Emocional",
    description: "Escribe una nueva entrada en tu diario.",
};

export default function NewJournalEntryPage() {
    return (
        <div className="container py-10 px-4 md:px-6 mx-auto max-w-2xl">
            <Link href="/journal" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ChevronLeft className="w-4 h-4 mr-1" /> Volver al diario
            </Link>

            <Card>
                <CardHeader>
                    <CardTitle>Nueva Entrada</CardTitle>
                    <CardDescription>
                        Tómate un momento para respirar y escribir cómo te sientes.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={createJournalEntry} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="mood">¿Cómo te sientes hoy?</Label>
                            <select
                                id="mood"
                                name="mood"
                                required
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="" disabled selected>Selecciona tu estado de ánimo</option>
                                <option value="Feliz">😄 Feliz</option>
                                <option value="Calmado">😌 Calmado</option>
                                <option value="Triste">😔 Triste</option>
                                <option value="Ansioso">😰 Ansioso</option>
                                <option value="Enofado">😠 Enfado</option>
                                <option value="Cansado">😴 Cansado</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Tus pensamientos</Label>
                            <Textarea
                                id="content"
                                name="content"
                                placeholder="Escribe aquí lo que pasa por tu mente..."
                                className="min-h-[200px] resize-y"
                                required
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <Button variant="outline" asChild>
                                <Link href="/journal">Cancelar</Link>
                            </Button>
                            <Button type="submit">
                                <Save className="w-4 h-4 mr-2" /> Guardar Entrada
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
