import { exercises } from "@/data/exercises";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clock, BarChart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

// Simple Card components since we didn't install them effectively yet via shadcn cli
// Actually I'll use inline standard Tailwind for now to be safe, or minimalist imports if I create the file.
// Let's assume I create `components/ui/card.tsx` next. For now, I'll mock them or write basic HTML.

export default function ExercisesPage() {
    return (
        <div className="container px-4 py-8 mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Catálogo de Ejercicios</h1>
                <p className="text-muted-foreground">Explora herramientas diseñadas para tu bienestar emocional.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exercises.map((exercise) => (
                    <div key={exercise.id} className="group relative flex flex-col justify-between rounded-xl border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all">
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
                                    {exercise.category}
                                </span>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {exercise.duration}
                                </span>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold tracking-tight text-xl group-hover:text-primary transition-colors">
                                    {exercise.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {exercise.description}
                                </p>
                            </div>
                        </div>
                        <div className="p-6 pt-0 mt-auto">
                            <Button asChild className="w-full rounded-full" variant="outline">
                                <Link href={`/exercises/${exercise.id}`}>
                                    Comenzar
                                </Link>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
