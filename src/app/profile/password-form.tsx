'use client'

import { Button } from "@/components/ui/button"
import { changePassword } from "./actions"
import { useTransition, useState } from "react"
import { Loader2, Lock, CheckCircle2, AlertCircle } from "lucide-react"

export default function PasswordForm() {
    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = (formData: FormData) => {
        setMessage(null)
        setError(null)

        startTransition(async () => {
            const result = await changePassword(formData)

            if (result.error) {
                setError(result.error)
            } else if (result.message) {
                setMessage(result.message)
                // Optional: reset form
                const form = document.getElementById('password-form') as HTMLFormElement
                form?.reset()
            }
        })
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <Lock className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-medium">Seguridad</h3>
            </div>

            <form id="password-form" action={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="new-password">Nueva contraseña</label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="new-password"
                            name="new-password"
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            minLength={6}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none" htmlFor="confirm-password">Confirmar contraseña</label>
                        <input
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            placeholder="Repite la contraseña"
                            minLength={6}
                            required
                        />
                    </div>
                </div>

                {message && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 text-sm rounded-md">
                        <CheckCircle2 className="w-4 h-4" />
                        {message}
                    </div>
                )}

                {error && (
                    <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <div className="flex justify-end">
                    <Button disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Actualizar contraseña
                    </Button>
                </div>
            </form>
        </div>
    )
}
