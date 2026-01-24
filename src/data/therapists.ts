export interface Therapist {
    id: string;
    name: string;
    specialty: string[];
    bio: string;
    availability: 'Online' | 'Presencial' | 'Híbrido';
    rate: string;
    image: string; // URL or placeholder
}

export const therapists: Therapist[] = [
    {
        id: 't1',
        name: 'Dra. Elena García',
        specialty: ['Ansiedad', 'Gestión del Estrés'],
        bio: 'Psicóloga clínica con 10 años de experiencia. Enfoque cognitivo-conductual con integración de mindfulness.',
        availability: 'Online',
        rate: '60€/sesión',
        image: 'https://ui.shadcn.com/avatars/01.png'
    },
    {
        id: 't2',
        name: 'Marc Soler',
        specialty: ['Duelo', 'Autoestima'],
        bio: 'Terapeuta humanista centrado en el acompañamiento emocional y procesos de pérdida.',
        availability: 'Híbrido',
        rate: '55€/sesión',
        image: 'https://ui.shadcn.com/avatars/02.png'
    },
    {
        id: 't3',
        name: 'Laura Méndez',
        specialty: ['Crecimiento Personal', 'Mindfulness'],
        bio: 'Especialista en desarrollo personal y técnicas de reducción de estrés basadas en la consciencia plena.',
        availability: 'Online',
        rate: '70€/sesión',
        image: 'https://ui.shadcn.com/avatars/03.png'
    }
];
