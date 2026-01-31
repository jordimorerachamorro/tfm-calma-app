import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "./actions";
import { User, LogOut } from "lucide-react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ProfileForm from "./profile-form";

export default async function ProfilePage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    return (
        <div className="container max-w-2xl px-4 py-8 mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
                    >
                        <ChevronLeft className="w-4 h-4 mr-1" /> Volver al inicio
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
                    <p className="text-muted-foreground">Gestiona tu información personal.</p>
                </div>
                <form action={signOut}>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90 hover:bg-destructive/10">
                        <LogOut className="w-4 h-4 mr-2" /> Cerrar sesión
                    </Button>
                </form>
            </div>

            <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 space-y-8">
                    {/* Header with Avatar Placeholder */}
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <User className="w-10 h-10" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold">{profile?.full_name || 'Usuario'}</h2>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                    </div>

                    <div className="border-t pt-6"></div>

                    {/* Edit Form */}
                    <ProfileForm
                        userEmail={user.email!}
                        initialFullName={profile?.full_name || ''}
                    />
                </div>
            </div>
        </div>
    );
}
