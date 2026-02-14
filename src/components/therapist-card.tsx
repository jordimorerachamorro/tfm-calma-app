import { Therapist } from "@/data/therapists";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CalendarDays, MapPin, Euro } from "lucide-react";

interface TherapistCardProps {
    therapist: Therapist;
}

export function TherapistCard({ therapist }: TherapistCardProps) {
    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 pb-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={therapist.image} alt={therapist.name} />
                    <AvatarFallback>{therapist.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-semibold text-lg">{therapist.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {therapist.specialty.map((spec) => (
                            <Badge key={spec} variant="secondary" className="text-xs">
                                {spec}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {therapist.bio}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{therapist.availability}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Euro className="h-4 w-4" />
                        <span>{therapist.rate}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">
                    Solicitar Cita <CalendarDays className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    );
}
