import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Smile, Frown, Meh, CloudRain, Sun } from "lucide-react";

interface JournalEntry {
    id: string;
    content: string;
    mood: string | null;
    created_at: string;
}

interface JournalEntryCardProps {
    entry: JournalEntry;
}

const getMoodIcon = (mood: string | null) => {
    switch (mood?.toLowerCase()) {
        case 'feliz': return <Smile className="w-5 h-5 text-green-500" />;
        case 'triste': return <Frown className="w-5 h-5 text-blue-500" />;
        case 'ansioso': return <CloudRain className="w-5 h-5 text-gray-500" />;
        case 'calmado': return <Sun className="w-5 h-5 text-orange-500" />;
        default: return <Meh className="w-5 h-5 text-gray-400" />;
    }
};

export function JournalEntryCard({ entry }: JournalEntryCardProps) {
    const formattedDate = new Intl.DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }).format(new Date(entry.created_at));

    return (
        <Card className="hover:bg-accent/50 transition-colors">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-medium flex items-center gap-2">
                        {getMoodIcon(entry.mood)}
                        <span className="capitalize">{entry.mood || 'Sin estado'}</span>
                    </CardTitle>
                    <time className="text-xs text-muted-foreground flex items-center">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        {formattedDate}
                    </time>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 whitespace-pre-wrap">
                    {entry.content}
                </p>
            </CardContent>
        </Card>
    );
}
