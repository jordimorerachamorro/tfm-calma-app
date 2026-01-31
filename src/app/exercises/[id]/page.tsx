import { exercises } from "@/data/exercises";
import Link from "next/link";
import { ChevronLeft, Timer, Target, ClipboardList, Zap, ArrowRight, BookOpen } from "lucide-react";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import ExerciseCompletion from "./completion-button";

export function generateStaticParams() {
    return exercises.map((exercise) => ({
        id: exercise.id,
    }))
}

export default async function ExerciseDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const exercise = exercises.find((e) => e.id === id);

    if (!exercise) {
        notFound();
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let isCompleted = false;
    if (user) {
        const { data } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', user.id)
            .eq('exercise_id', id)
            .single();

        if (data) {
            isCompleted = true;
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-muted/10">
            <main className="container mx-auto px-4 py-8 max-w-4xl flex-1 flex flex-col gap-8">
                {/* Header Section */}
                <div>
                    <Link href="/exercises" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Volver al catálogo
                    </Link>
                    <div className="space-y-4">
                        <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground w-fit">
                            {exercise.category}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">{exercise.title}</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">{exercise.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
                            <div className="flex items-center gap-1.5 bg-background border px-3 py-1.5 rounded-full">
                                <Timer className="w-4 h-4" />
                                <span>{exercise.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-background border px-3 py-1.5 rounded-full">
                                <Zap className="w-4 h-4" />
                                <span>Dificultad: {exercise.difficulty}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left & Main Content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Section 1: The Why */}
                        <section className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <Target className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-semibold">¿Por qué funciona?</h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {exercise.purpose}
                            </p>
                        </section>

                        {/* Section 3: Execution */}
                        <section className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <BookOpen className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-semibold">Instrucciones Paso a Paso</h2>
                            </div>

                            <div className="space-y-4">
                                {exercise.steps.map((step, index) => (
                                    <div key={index} className="flex gap-4 p-4 rounded-xl bg-muted/30 border border-transparent hover:border-muted-foreground/20 transition-colors">
                                        <div className="flex-none w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-sm">
                                            {index + 1}
                                        </div>
                                        <p className="pt-1 text-foreground/90 leading-relaxed font-medium">{step}</p>
                                    </div>
                                ))}
                            </div>

                            {exercise.template_url && (
                                <div className="mt-8 pt-6 border-t">
                                    <h3 className="font-medium mb-4 flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-amber-500" /> Ayuda Visual
                                    </h3>
                                    <div className="rounded-xl overflow-hidden border bg-muted relative aspect-video">
                                        <img
                                            src={exercise.template_url}
                                            alt={`Guía visual para ${exercise.title}`}
                                            className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                            <p className="text-white font-medium text-sm">Ejemplo visual del ejercicio</p>
                                        </div>
                                    </div>
                                </div>
                            )}


                        </section>
                    </div>

                    {/* Right Sidebar: Prep & Frequency */}
                    <div className="space-y-6">
                        <section className="bg-card border rounded-2xl p-6 shadow-sm space-y-6 sticky top-24">
                            <div>
                                <h3 className="font-semibold flex items-center gap-2 mb-4">
                                    <ClipboardList className="w-4 h-4 text-primary" /> Preparación
                                </h3>

                                <div className="space-y-4 text-sm text-muted-foreground">
                                    <div>
                                        <strong className="text-foreground block mb-1">Frecuencia recomendada</strong>
                                        <p>{exercise.frequency}</p>
                                    </div>

                                    {exercise.materials && exercise.materials.length > 0 && (
                                        <div>
                                            <strong className="text-foreground block mb-1">Material necesario</strong>
                                            <ul className="list-disc pl-4 space-y-1">
                                                {exercise.materials.map(m => (
                                                    <li key={m}>{m}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {exercise.preparation && (
                                        <div>
                                            <strong className="text-foreground block mb-1">Antes de empezar</strong>
                                            <p>{exercise.preparation}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-4 border-t">
                                {user ? (
                                    <>
                                        <ExerciseCompletion exerciseId={exercise.id} isCompleted={isCompleted} />
                                        {isCompleted && (
                                            <p className="text-xs text-center text-muted-foreground mt-3">
                                                ¡Bien hecho! Puedes repetir este ejercicio tantas veces como necesites.
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center space-y-2">
                                        <p className="text-sm text-muted-foreground">Inicia sesión para registrar tu actividad</p>
                                        <Link href="/login" className="text-xs font-medium text-primary hover:underline">
                                            Ir a Iniciar Sesión
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    )
}
