'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function completeExercise(exerciseId: string) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        // If not logged in, maybe redirect to login or just return error
        redirect('/login')
    }

    const { error } = await supabase
        .from('user_progress')
        .insert({
            user_id: user.id,
            exercise_id: exerciseId,
        })

    // Ignore duplicate key error (if already completed)
    if (error && error.code !== '23505') {
        console.error('Error completing exercise:', error)
        return { error: 'Could not mark exercise as completed' }
    }

    revalidatePath('/exercises')
    revalidatePath(`/exercises/${exerciseId}`)
    return { message: 'Exercise completed successfully' }
}
