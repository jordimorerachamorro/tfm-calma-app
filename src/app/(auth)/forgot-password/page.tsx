import { Button } from "@/components/ui/button";
import { resetPassword } from "../actions";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function ForgotPasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ message: string, error: string }>;
}) {
    const { message, error } = await searchParams;

    return (
        <div className="bg-card border rounded-2xl shadow-sm p-8 space-y-6">
            <div className="space-y-2 text-center">
                <Link
                    href="/login"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Volver al login
                </Link>
                <h1 className="text-2xl font-semibold tracking-tight">Recuperar contraseña</h1>
                <p className="text-sm text-muted-foreground">
                    Introduce tu email y te enviaremos un enlace para restablecerla.
                </p>
            </div>

            <form className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">Email</label>
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        required
                    />
                </div>

                {message && (
                    <div className="p-3 bg-secondary/50 text-secondary-foreground text-sm rounded-md text-center">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md text-center">
                        {error}
                    </div>
                )}

                <Button formAction={resetPassword} className="w-full">
                    Enviar enlace
                </Button>
            </form>
        </div>
    )
}
