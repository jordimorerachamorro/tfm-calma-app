'use client'

import { Button } from "@/components/ui/button";
import { contactTherapist } from "../actions";
import { useState } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

export default function ContactForm({
    therapistId,
    initialName,
    initialEmail
}: {
    therapistId: string,
    initialName: string,
    initialEmail: string
}) {
    const [isPending, setIsPending] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (formData: FormData) => {
        setIsPending(true);
        setError(null);

        // Append therapist ID if not present in visible fields (it is as hidden input below)

        const result = await contactTherapist(formData);

        setIsPending(false);

        if (result.error) {
            setError(result.error);
        } else if (result.success) {
            setIsSuccess(true);
        }
    }

    if (isSuccess) {
        return (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">¡Solicitud Enviada!</h3>
                <p className="text-green-700 dark:text-green-400">
                    Hemos enviado tu solicitud correctamente. El especialista se pondrá en contacto contigo a la brevedad.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => window.history.back()}>
                    Volver al listado
                </Button>
            </div>
        )
    }

    return (
        <form action={handleSubmit} className="space-y-6">
            <input type="hidden" name="therapistId" value={therapistId} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Nombre</label>
                    <input
                        id="name"
                        name="name"
                        defaultValue={initialName}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tu nombre"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        defaultValue={initialEmail}
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="tucorreo@ejemplo.com"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">Preferencia de Fecha</label>
                <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Mensaje</label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    placeholder="Cuéntanos brevemente qué necesitas..."
                />
            </div>

            {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md">
                    {error}
                </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                {isPending ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Enviando...
                    </>
                ) : (
                    <>
                        <Send className="w-4 h-4 mr-2" /> Enviar Solicitud
                    </>
                )}
            </Button>
        </form>
    )
}
