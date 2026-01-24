import { exercises } from "@/data/exercises";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, CheckCircle2, Timer } from "lucide-react";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    return exercises.map((exercise) => ({
        id: exercise.id,
    }))
}

export default function ExerciseDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const exercise = exercises.find((e) => e.id === params.id);

    if (!exercise) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen bg-muted/10">
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b px-4 h-16 flex items-center">
                <div className="container mx-auto flex items-center justify-between">
                    <Link href="/exercises" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Volver
                    </Link>
                    <span className="font-semibold text-sm">{exercise.title}</span>
                    <div className="w-10"></div> {/* Spacer for centering */}
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-2xl flex-1 flex flex-col gap-8">
                <div className="space-y-4">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground w-fit">
                        {exercise.category}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">{exercise.title}</h1>
                    <p className="text-lg text-muted-foreground">{exercise.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Timer className="w-4 h-4" /> Duración estimada: {exercise.duration}
                    </div>
                </div>

                <div className="bg-card border rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
                    <h2 className="font-semibold text-xl">Instrucciones</h2>
                    <div className="space-y-6">
                        {exercise.steps.map((step, index) => (
                            <div key={index} className="flex gap-4">
                                <div className="flex-none w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                                    {index + 1}
                                </div>
                                <p className="pt-1 text-foreground/90 leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>

                    {exercise.content && (
                        <div className="mt-8 pt-6 border-t prose prose-stone dark:prose-invert max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: exercise.content }} />
                        </div>
                    )}
                </div>

                <div className="pt-4 flex justify-center">
                    <Button size="lg" className="rounded-full px-8 gap-2">
                        <CheckCircle2 className="w-5 h-5" /> Completar Ejercicio
                    </Button>
                </div>
            </main>
        </div>
    )
}
