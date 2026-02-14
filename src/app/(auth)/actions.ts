'use server'

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error('Login error:', error)
        redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        redirect('/login?message=No se pudo registrar el usuario')
    }

    redirect('/login?message=Revisa tu email para continuar con el proceso de registro')
}

export async function register(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string

    const headersList = await (await import('next/headers')).headers()
    const origin = headersList.get('origin')

    console.log('Register attempt for:', email)
    console.log('Origin:', origin)

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            },
            emailRedirectTo: `${origin}/auth/callback`,
        },
    })

    if (error) {
        console.error('Register error (Supabase):', error)
        redirect(`/register?error=${encodeURIComponent('Error al registrarse: ' + error.message)}`)
    }

    console.log('Register successful:', data)

    if (data.user && data.user.identities && data.user.identities.length === 0) {
        console.warn('User registered but identity missing (User already exists?)')
        redirect('/login?message=El usuario ya existe. Intenta iniciar sesión.')
    }

    redirect('/login?message=Revisa tu email para completar el registro')
}

export async function resetPassword(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string

    const headersList = await (await import('next/headers')).headers()
    const origin = headersList.get('origin')

    console.log('Reset password request for:', email)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?next=/update-password`,
    })

    if (error) {
        console.error('Reset password error:', error)
        redirect('/forgot-password?error=No se pudo enviar el correo de recuperación')
    }

    redirect('/login?message=Revisa tu email para restablecer tu contraseña')
}

export async function updatePassword(formData: FormData) {
    const supabase = await createClient()
    const password = formData.get('new-password') as string
    const confirmPassword = formData.get('confirm-password') as string

    if (!password || !confirmPassword) {
        redirect('/update-password?error=Las contraseñas son obligatorias')
    }

    if (password !== confirmPassword) {
        redirect('/update-password?error=Las contraseñas no coinciden')
    }

    const { error } = await supabase.auth.updateUser({
        password: password
    })

    if (error) {
        console.error('Update password error:', error)
        redirect('/update-password?error=No se pudo actualizar la contraseña')
    }

    redirect('/profile?message=Contraseña actualizada correctamente')
}
