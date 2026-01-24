import { therapists } from "@/data/therapists";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Calendar, MapPin, Euro } from "lucide-react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function TherapistsPage() {
    return (
        <div className="container px-4 py-8 mx-auto space-y-8">
            <div className="flex items-center gap-2 mb-6">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Volver
                </Link>
            </div>

            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Especialistas</h1>
                <p className="text-muted-foreground">Encuentra el acompañamiento profesional que necesitas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {therapists.map((therapist) => (
                    <Card key={therapist.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row gap-4 items-center pb-2">
                            <div className="w-16 h-16 rounded-full bg-secondary overflow-hidden">
                                {/* Placeholder for avatar */}
                                <img src={therapist.image} alt={therapist.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-1">
                                <CardTitle className="text-lg">{therapist.name}</CardTitle>
                                <div className="flex flex-wrap gap-1">
                                    {therapist.specialty.map((spec) => (
                                        <span key={spec} className="text-[10px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground line-clamp-3">
                                {therapist.bio}
                            </p>
                            <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <BadgeCheck className="w-3 h-3 text-primary" /> Verificado
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-3 h-3" /> {therapist.availability}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Euro className="w-3 h-3" /> {therapist.rate}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" asChild>
                                <Link href={`/therapists/contact?id=${therapist.id}`}>
                                    <Calendar className="w-4 h-4 mr-2" /> Solicitar Cita
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
