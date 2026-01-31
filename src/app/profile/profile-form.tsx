'use client'

import { Button } from "@/components/ui/button";
import { updateProfile } from "./actions";
import { Save, Loader2 } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Guardando...
                </>
            ) : (
                <>
                    <Save className="w-4 h-4 mr-2" /> Guardar Cambios
                </>
            )}
        </Button>
    )
}

export default function ProfileForm({
    userEmail,
    initialFullName
}: {
    userEmail: string,
    initialFullName: string
}) {
    const handleSubmit = async (formData: FormData) => {
        await updateProfile(formData);
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium leading-none">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={userEmail}
                    disabled
                    className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground cursor-not-allowed opacity-70"
                />
                <p className="text-[0.8rem] text-muted-foreground">
                    El email no se puede cambiar.
                </p>
            </div>

            <div className="grid gap-2">
                <label htmlFor="fullName" className="text-sm font-medium leading-none">
                    Nombre Completo
                </label>
                <input
                    id="fullName"
                    name="fullName"
                    defaultValue={initialFullName}
                    placeholder="Tu nombre"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            <div className="pt-2 flex justify-end">
                <SubmitButton />
            </div>
        </form>
    )
}
