export type ExerciseCategory = 'Ansiedad' | 'Estrés' | 'Autoestima' | 'Duelo' | 'Crecimiento';

export interface Exercise {
    id: string;
    title: string;
    description: string;
    category: ExerciseCategory;
    duration: string;
    difficulty: 'Fácil' | 'Medio' | 'Difícil';
    // New structured fields
    purpose: string; // The "Why"
    frequency: string;
    materials?: string[];
    preparation?: string;
    steps: string[]; // The "How"
    template_url?: string; // Optional visual aid
    warning?: string; // Safety disclaimer
    audio_url?: string; // Optional guided audio
}

export const exercises: Exercise[] = [
    {
        id: 'respiracion-cuadrada',
        title: 'Respiración Cuadrada',
        description: 'Técnica de respiración simple para reducir la ansiedad en momentos de crisis.',
        category: 'Ansiedad',
        duration: '5 min',
        difficulty: 'Fácil',
        purpose: 'Esta técnica ayuda a regular el sistema nervioso parasimpático, reduciendo el cortisol y enviando una señal inmediata de calma al cerebro. Es ideal para cortar bucles de ansiedad o pánico incipiente.',
        frequency: 'Úsala siempre que sientas ansiedad aguda, o practica 5 minutos al día para entrenar tu respuesta de relajación.',
        materials: ['Ninguno', 'Ropa cómoda (opcional)'],
        steps: [
            'Siéntate cómodamente con la espalda recta y los pies en el suelo.',
            'Inhala profundamente por la nariz contando mentalmente hasta 4.',
            'Retén el aire en tus pulmones contando hasta 4.',
            'Exhala suavemente por la boca contando hasta 4.',
            'Mantén los pulmones vacíos contando hasta 4 antes de volver a empezar.',
            'Repite este ciclo durante al menos 5 minutos.'
        ],
        template_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop' // Abstract calm image as placeholder
    },
    {
        id: 'diario-gratitud',
        title: 'Diario de Gratitud',
        description: 'Ejercicio diario para cambiar el foco hacia lo positivo y mejorar la autoestima.',
        category: 'Autoestima',
        duration: '10 min',
        difficulty: 'Fácil',
        purpose: 'Nuestro cerebro tiene un sesgo negativo natural. Este ejercicio entrena activamente tu mente para detectar y valorar lo positivo, mejorando tu estado de ánimo general y autoconcepto a largo plazo.',
        frequency: 'Diariamente, preferiblemente antes de dormir o al despertar.',
        materials: ['Libreta o diario', 'Bolígrafo'],
        preparation: 'Busca un momento tranquilo donde nadie te interrumpa.',
        steps: [
            'Abre tu libreta en una página nueva.',
            'Escribe la fecha de hoy.',
            'Identifica 3 cosas específicas que hayan sucedido en las últimas 24 horas por las que te sientas agradecido.',
            'Escríbelas detallando "por qué" te hacen sentir bien.',
            'Tómate un momento para releerlas y conectar con esa sensación.'
        ]
    },
    {
        id: 'escaneo-corporal',
        title: 'Escaneo Corporal (Body Scan)',
        description: 'Meditación guiada para reconectar con el cuerpo y liberar tensión acumulada.',
        category: 'Estrés',
        duration: '15 min',
        difficulty: 'Medio',
        purpose: 'Nos enseña a identificar dónde acumulamos físicamente el estrés y nos permite soltar esa tensión conscientemente. Mejora la conexión mente-cuerpo.',
        frequency: '2-3 veces por semana, o cuando sientas mucha tensión física.',
        audio_url: 'https://palousemindfulness.com/es/disks/escaneo-corporal.mp3', // Audio guía de Palouse Mindfulness (MBSR)
        materials: ['Esterilla de yoga o cama/sofá', 'Manta ligera (opcional)'],
        preparation: 'Asegúrate de no tener frío y de usar ropa que no te apriete.',
        steps: [
            'Túmbate boca arriba con los brazos a los lados y las palmas hacia arriba.',
            'Cierra los ojos y haz tres respiraciones profundas.',
            'Lleva tu atención a los dedos de tus pies. Nota si hay frío, calor o cosquilleo.',
            'Sube lentamente tu atención por tobillos, gemelos y rodillas, soltando cualquier tensión que encuentres.',
            'Continúa subiendo por muslos, caderas, abdomen y pecho.',
            'Finaliza escaneando brazos, cuello y rostro, relajando la mandíbula.',
            'Quédate unos minutos sintiendo tu cuerpo como un todo antes de moverte.'
        ]
    },
    {
        id: 'carta-al-nino-interior',
        title: 'Carta al Niño Interior',
        description: 'Ejercicio profundo de sanación y autocompasión.',
        category: 'Crecimiento',
        duration: '30 min',
        difficulty: 'Difícil',
        purpose: 'Permite procesar heridas emocionales del pasado y desarrollar una voz interna más compasiva y protectora, reduciendo la autocrítica destructiva.',
        frequency: 'Puntual, cuando necesites trabajar un bloqueo emocional profundo.',
        warning: 'Este ejercicio puede ser emocionalmente intenso. Si sientes que puede desbordarte o despertar traumas pasados (como abusos), te recomendamos encarecidamente que lo realices bajo la supervisión de tu terapeuta.',
        materials: ['Papel y bolígrafo (mejor que digital)', 'Una foto tuya de pequeño (opcional)'],
        preparation: 'Este ejercicio puede ser emotivo. Hazlo en un lugar seguro y ten pañuelos cerca.',
        steps: [
            'Si tienes una foto, mírala unos instantes. Si no, cierra los ojos y visualízate a los 5-7 años.',
            'Empieza la carta: "Querido/a [tu nombre]..."',
            'Dile a ese niño/a lo que necesitaba escuchar entonces y no escuchó (ej: "Eres válido", "No fue culpa tuya", "Te quiero").',
            'Explícale que ahora tú eres el adulto y que te encargarás de cuidarle.',
            'Valida sus emociones: "Entiendo que tuvieras miedo...".',
            'Despídete con cariño.',
            'Lee la carta en voz alta para ti mismo si te sientes capaz.'
        ]
    }
];
