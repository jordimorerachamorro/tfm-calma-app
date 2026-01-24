export type ExerciseCategory = 'Ansiedad' | 'Estrés' | 'Autoestima' | 'Duelo' | 'Crecimiento';

export interface Exercise {
    id: string;
    title: string;
    description: string;
    category: ExerciseCategory;
    duration: string; // e.g., "5 min", "15 min"
    difficulty: 'Fácil' | 'Medio' | 'Difícil';
    steps: string[];
    content?: string; // HTML or Markdown for detailed content
}

export const exercises: Exercise[] = [
    {
        id: 'respiracion-cuadrada',
        title: 'Respiración Cuadrada',
        description: 'Técnica de respiración simple para reducir la ansiedad en momentos de crisis.',
        category: 'Ansiedad',
        duration: '5 min',
        difficulty: 'Fácil',
        steps: [
            'Inhala contando hasta 4.',
            'Mantén el aire contando hasta 4.',
            'Exhala contando hasta 4.',
            'Mantén sin aire contando hasta 4.',
            'Repite el ciclo durante 5 minutos.'
        ],
        content: `
      <p>La respiración cuadrada (o Box Breathing) es una técnica utilizada incluso por los Navy SEALs para mantener la calma bajo presión.</p>
      <h3>¿Por qué funciona?</h3>
      <p>Al regular tu respiración, envías una señal directa a tu sistema nervioso parasimpático de que estás seguro, reduciendo casi inmediatamente los niveles de cortisol.</p>
    `
    },
    {
        id: 'diario-gratitud',
        title: 'Diario de Gratitud',
        description: 'Ejercicio diario para cambiar el foco hacia lo positivo y mejorar la autoestima.',
        category: 'Autoestima',
        duration: '10 min',
        difficulty: 'Fácil',
        steps: [
            'Busca un lugar tranquilo.',
            'Escribe 3 cosas por las que te sientas agradecido hoy.',
            'Intenta que sean cosas específicas de las últimas 24 horas.',
            'Reflexiona sobre cómo te hacen sentir estas cosas.'
        ]
    },
    {
        id: 'escaneo-corporal',
        title: 'Escaneo Corporal (Body Scan)',
        description: 'Meditación guiada para reconectar con el cuerpo y liberar tensión acumulada.',
        category: 'Estrés',
        duration: '15 min',
        difficulty: 'Medio',
        steps: [
            'Túmbate en una posición cómoda.',
            'Cierra los ojos y lleva la atención a tu respiración.',
            'Ve llevando la atención lentamente desde los dedos de los pies hasta la cabeza.',
            'Nota las sensaciones sin juzgar, solo observando.'
        ]
    },
    {
        id: 'carta-al-nino-interior',
        title: 'Carta al Niño Interior',
        description: 'Ejercicio profundo de sanación y autocompasión.',
        category: 'Crecimiento',
        duration: '30 min',
        difficulty: 'Difícil',
        steps: [
            'Visualízate a ti mismo cuando eras pequeño.',
            'Escribe una carta desde tu yo adulto dándole lo que necesitaba escuchar.',
            'Valida sus emociones y prométele protección.'
        ]
    }
];
