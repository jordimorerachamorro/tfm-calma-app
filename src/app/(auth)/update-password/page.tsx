import { Button } from "@/components/ui/button";
import { updatePassword } from "../actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function UpdatePasswordPage({
    searchParams,
}: {
    searchParams: Promise<{ message: string, error: string }>;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // If not authenticated (code exchange failed or direct access), redirect to login
    // The callback route should have exchanged the code for a session cookie
    if (!user) {
        redirect('/login?error=El enlace ha expirado o no es válido');
    }

    const { message, error } = await searchParams;

    return (
        <div className="bg-card border rounded-2xl shadow-sm p-8 space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Nueva contraseña</h1>
                <p className="text-sm text-muted-foreground">
                    Introduce tu nueva contraseña a continuación.
                </p>
            </div>

            <form className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none" htmlFor="new-password">Nueva contraseña</label>
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="new-password"
                        name="new-password"
                        type="password"
                        required
                        minLength={6}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none" htmlFor="confirm-password">Confirmar contraseña</label>
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="confirm-password"
                        name="confirm-password"
                        type="password"
                        required
                        minLength={6}
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

                <Button formAction={updatePassword} className="w-full">
                    Actualizar contraseña
                </Button>
            </form>
        </div>
    )
}
