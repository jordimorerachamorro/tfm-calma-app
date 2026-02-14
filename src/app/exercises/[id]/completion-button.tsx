'use client'

import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, Circle } from "lucide-react";
import { toggleExerciseCompletion } from "../actions";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";

export default function CompletionButton({
    exerciseId,
    isCompleted: initialCompleted
}: {
    exerciseId: string,
    isCompleted: boolean
}) {
    const [isPending, startTransition] = useTransition();
    const [isCompleted, setIsCompleted] = useState(initialCompleted);

    const toggle = () => {
        startTransition(async () => {
            // Optimistic update
            setIsCompleted(!isCompleted);

            try {
                await toggleExerciseCompletion(exerciseId);
            } catch (error) {
                // Revert on error
                setIsCompleted(!isCompleted);
                console.error(error);
            }
        });
    };

    return (
        <Button
            size="lg"
            className={cn(
                "rounded-full px-8 gap-2 transition-all duration-500",
                isCompleted && "bg-green-600 hover:bg-green-700 text-white"
            )}
            onClick={toggle}
            disabled={isPending}
        >
            {isPending ? (
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
