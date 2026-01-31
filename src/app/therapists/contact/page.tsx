import { therapists } from "@/data/therapists";
import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MapPin, Euro, BadgeCheck } from "lucide-react";
import ContactForm from "./contact-form";

export default async function ContactTherapistPage({
    searchParams,
}: {
    searchParams: Promise<{ id: string }>;
}) {
    // 1. Get query param
    const { id: therapistId } = await searchParams;
    if (!therapistId) {
        redirect('/therapists');
    }

    // 2. Find therapist
    const therapist = therapists.find(t => t.id === therapistId);
    if (!therapist) {
        notFound();
    }

    // 3. Get user info for pre-filling
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Optional: Get profile name if available
    let userName = '';
    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', user.id)
            .single();
        userName = profile?.full_name || '';
    }

    return (
        <div className="container max-w-4xl px-4 py-8 mx-auto">
            <Link
                href="/therapists"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
                <ChevronLeft className="w-4 h-4 mr-1" /> Volver al directorio
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Left Column: Therapist Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-card border rounded-2xl p-6 shadow-sm space-y-6">
                        <div className="aspect-square relative rounded-xl overflow-hidden bg-muted">
                            <img
                                src={therapist.image}
                                alt={therapist.name}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">{therapist.name}</h1>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {therapist.specialty.map(spec => (
                                    <span key={spec} className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                                        {spec}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3 text-sm text-muted-foreground pt-2 border-t">
                            <div className="flex items-center gap-2">
                                <BadgeCheck className="w-4 h-4 text-primary" />
                                <span>Profesional Verificado</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{therapist.availability}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Euro className="w-4 h-4" />
                                <span>{therapist.rate}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Contact Form */}
                <div className="lg:col-span-2">
                    <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold mb-2">Solicitar Cita</h2>
                            <p className="text-muted-foreground">
                                Completa el formulario para contactar con {therapist.name}.
                                Recibirás una respuesta en menos de 24 horas.
                            </p>
                        </div>

                        <ContactForm
                            therapistId={therapist.id}
                            initialName={userName}
                            initialEmail={user?.email || ''}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
