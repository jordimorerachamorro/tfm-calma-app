'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const fullName = formData.get('fullName') as string

    // We can also handle avatar upload later, for now just text fields

    const { error } = await supabase
        .from('profiles')
        .update({
            full_name: fullName,
            updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

    if (error) {
        return { error: 'Could not update profile' }
    }

    revalidatePath('/profile')
    return { message: 'Profile updated successfully' }
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}

export async function changePassword(formData: FormData) {
    const supabase = await createClient()

    const password = formData.get('new-password') as string
    const confirmPassword = formData.get('confirm-password') as string

    if (!password || !confirmPassword) {
        return { error: 'Las contraseñas son obligatorias' }
    }

    if (password !== confirmPassword) {
        return { error: 'Las contraseñas no coinciden' }
    }

    if (password.length < 6) {
        return { error: 'La contraseña debe tener al menos 6 caracteres' }
    }

    const { error } = await supabase.auth.updateUser({
        password: password
    })

    if (error) {
        console.error('Change password error:', error)
        return { error: 'No se pudo actualizar la contraseña' }
    }

    revalidatePath('/profile')
    return { message: 'Contraseña actualizada correctamente' }
}
