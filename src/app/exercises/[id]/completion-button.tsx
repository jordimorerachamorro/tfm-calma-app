'use client'

import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { completeExercise } from "../actions";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";

export default function ExerciseCompletion({
    exerciseId,
    isCompleted
}: {
    exerciseId: string,
    isCompleted: boolean
}) {
    const [pending, startTransition] = useTransition();
    const [optimisticCompleted, setOptimisticCompleted] = useState(isCompleted);

    const handleComplete = () => {
        if (optimisticCompleted) return;

        startTransition(async () => {
            // Optimistic update
            setOptimisticCompleted(true);

            await completeExercise(exerciseId);
        });
    };

    return (
        <Button
            size="lg"
            className={cn(
                "rounded-full px-8 gap-2 transition-all duration-500",
                optimisticCompleted && "bg-green-600 hover:bg-green-700 text-white"
            )}
            onClick={handleComplete}
            disabled={pending || optimisticCompleted}
        >
            {pending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : optimisticCompleted ? (
                <>
                    <CheckCircle2 className="w-5 h-5" /> ¡Completado!
                </>
            ) : (
                <>
                    <CheckCircle2 className="w-5 h-5" /> Completar Ejercicio
                </>
            )}
        </Button>
    )
}
