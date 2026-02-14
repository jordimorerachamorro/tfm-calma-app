'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createJournalEntry(formData: FormData) {
    const supabase = await createClient();

    // Verificar autenticación
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/login');
    }

    const content = formData.get('content') as string;
    const mood = formData.get('mood') as string;

    if (!content) {
        return { error: 'El contenido es obligatorio' };
    }

    const { error } = await supabase
        .from('journal_entries')
        .insert({
            user_id: user.id,
            content,
            mood,
        });

    if (error) {
        console.error('Error al crear entrada:', error);
        // los errores de acceso a datos no deben exponerse al cliente en este formulario simple
        throw new Error('Error al guardar la entrada');
    }

    revalidatePath('/journal');
    redirect('/journal');
}

export async function getJournalEntries() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching entries:', error);
        return [];
    }

    return data;
}
