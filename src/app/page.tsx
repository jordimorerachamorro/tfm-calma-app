import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Wind, ShieldCheck, Sun } from "lucide-react";
import Link from "next/link";

// import { createClient } from "@/utils/supabase/server";
// import { User } from "lucide-react";

export default function Home() {
    // const supabase = await createClient();
    // const { data: { user } } = await supabase.auth.getUser();

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 md:py-32 max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in duration-700 slide-in-from-bottom-4">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium text-secondary-foreground bg-secondary/50 backdrop-blur-sm mb-4">
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                    Tu espacio seguro de crecimiento
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-3xl text-balance">
                    Gestiona tus emociones con <span className="text-primary">consciencia</span> y calma.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance">
                    Un compañero digital con enfoque humanista para momentos de estrés, ansiedad o simplemente para conocerte mejor.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button size="lg" className="h-12 px-8 text-base rounded-full" asChild>
                        <Link href="/register">
                            Comenzar mi viaje <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 text-base rounded-full bg-background/50 backdrop-blur-sm" asChild>
                        <Link href="/exercises">
                            Explorar ejercicios
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-20 bg-secondary/30">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Herramientas para cada momento</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Recursos diseñados por psicólogos para acompañarte en diferentes estados emocionales.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Feature 1 */}
                        <div className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                                <Wind className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Respiración y Calma</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Ejercicios guiados para reducir la ansiedad fisiológica y volver a tu centro en minutos.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center text-accent-foreground mb-6">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Diario Emocional</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Un espacio privado y seguro para volcar tus pensamientos y procesar tus vivencias diarias.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-card p-8 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6">
                                <Heart className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Autoestima</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Dinámicas para fortalecer tu autoconcepto y cultivar una relación amable contigo mismo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-10 border-t text-center text-sm text-muted-foreground">
                <p>© {new Date().getFullYear()} Calma. Un proyecto de TFM centrado en el bienestar.</p>
            </footer>
        </div>
    );
}
