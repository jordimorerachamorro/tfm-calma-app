import { exercises } from "@/data/exercises";
import Link from "next/link";
import { ChevronLeft, Timer } from "lucide-react";
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
    params: { id: string };
}) {
    const exercise = exercises.find((e) => e.id === params.id);

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
            .eq('exercise_id', params.id)
            .single();

        if (data) {
            isCompleted = true;
        }
    }

    return (
        <div className="flex flex-col min-h-screen bg-muted/10">
            {/* Header removed, using global Navbar */}

            <main className="container mx-auto px-4 py-8 max-w-2xl flex-1 flex flex-col gap-6">
                <div>
                    <Link href="/exercises" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-4">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Volver al catálogo
                    </Link>
                </div>

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
                    <ExerciseCompletion exerciseId={exercise.id} isCompleted={isCompleted} />
                </div>
            </main>
        </div>
    )
}

