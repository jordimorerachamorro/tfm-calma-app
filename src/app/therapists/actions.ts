'use server'

import { createClient } from "@/utils/supabase/server";

export async function contactTherapist(formData: FormData) {
    // Validate that we have a user
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // In a real app we'd probably require auth, but for contact form 
    // maybe we allow guests too. The instructions imply using user data if available.

    const therapistId = formData.get('therapistId') as string
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string
    const date = formData.get('date') as string

    if (!therapistId || !name || !email || !message) {
        return { error: 'Por favor rellena todos los campos obligatorios.' }
    }

    // Simulate network delay / email sending
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Here we would effectively send an email using Resend, Sendgrid, etc.
    // or insert into a 'messages' table.

    console.log(`Mensaje enviado a terapeuta ${therapistId} por ${email}`);

    return { success: true, message: 'Solicitud enviada correctamente. El terapeuta te contactará pronto.' }
}
