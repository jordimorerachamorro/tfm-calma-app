'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function toggleExerciseCompletion(exerciseId: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Check if already completed
    const { data: existing } = await supabase
        .from('user_progress')
        .select('id')
        .eq('user_id', user.id)
        .eq('exercise_id', exerciseId)
        .single()

    if (existing) {
        // If exists, delete it (unmark)
        const { error } = await supabase
            .from('user_progress')
            .delete()
            .eq('id', existing.id)

        if (error) {
            console.error('Error unmarking exercise:', error)
            throw new Error('No se pudo desmarcar el ejercicio')
        }
    } else {
        // If not exists, insert it (mark)
        const { error } = await supabase
            .from('user_progress')
            .insert({
                user_id: user.id,
                exercise_id: exerciseId,
            })

        if (error) {
            console.error('Error completing exercise:', error)
            throw new Error('No se pudo marcar el ejercicio como completado')
        }
    }

    revalidatePath('/exercises')
    revalidatePath(`/exercises/${exerciseId}`)
    revalidatePath('/profile')
}
