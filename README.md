# Calma - Tu espacio de gestión emocional (TFM)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 📌 Descripción General
**Calma** es una aplicación web diseñada con enfoque humanista para acompañar a los usuarios en la gestión de sus emociones. Ofrece herramientas prácticas para situaciones de ansiedad, estrés o baja autoestima, además de facilitar el autoconocimiento a través del journaling y la conexión con terapeutas especializados.

Este proyecto ha sido desarrollado como Trabajo de Fin de Máster, integrando tecnologías modernas de desarrollo web con principios de "Calm Technology" (diseño no intrusivo y relajante).

## 🛠️ Stack Tecnológico
- **Frontend**: [Next.js 16](https://nextjs.org/) (App Router, Server Components).
- **Lenguaje**: TypeScript.
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) + Shadcn/ui (componentes accesibles).
- **Iconografía**: Lucide React.
- **Backend / Auth**: [Supabase](https://supabase.com/) (Autenticación y Base de Datos).
- **Despliegue**: Optimizado para Vercel.

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Node.js (v18 o superior).
- Una cuenta en Supabase (para las credenciales, o usar modo mock simple).

### Pasos
1. **Clonar el repositorio**:
   \`\`\`bash
   git clone <URL_DEL_REPOSITORIO>
   cd tfm-project
   \`\`\`

2. **Instalar dependencias**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Configurar variables de entorno**:
   Copiar el archivo de ejemplo y rellenar con tus claves de Supabase:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Variables requeridas en \`.env.local\`:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key_anon
   \`\`\`

4. **Ejecutar en desarrollo**:
   \`\`\`bash
   npm run dev
   \`\`\`
   Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## 📁 Estructura del Proyecto
- \`src/app\`: Rutas y páginas (Next.js App Router).
  - \`(auth)\`: Rutas de autenticación (login, register).
  - \`exercises\`: Catálogo y detalle de ejercicios.
  - \`therapists\`: Directorio de especialistas.
- \`src/components\`: Componentes reutilizables (Botones, Tarjetas, Layouts).
- \`src/data\`: Datos estáticos (Mocks) para prototipado rápido.
- \`src/lib\`: Utilidades y configuración de librerías.
- \`src/utils\`: Clientes de Supabase (Server y Browser).

## ✨ Funcionalidades Principales
1.  **Landing Page**: Presentación de valor y acceso rápido.
2.  **Autenticación**: Registro y Login seguro (Email/Password via Supabase).
3.  **Catálogo de Herramientas**: Ejercicios guiados para Ansiedad, Estrés, Autoestima, etc.
4.  **Detalle Interactivo**: Pasos a paso de ejercicios como "Respiración Cuadrada" o "Escaneo Corporal".
5.  **Directorio de Terapeutas**: Listado de profesionales con filtros simulados y opción de contacto.

## 🌐 Despliegue
El proyecto está listo para ser desplegado en **Vercel**:
1.  Subir el código a GitHub.
2.  Importar el repo en Vercel Dashboard.
3.  Añadir las variables de entorno (`NEXT_PUBLIC_SUPABASE_...`).
4.  Deploy.

URL de producción: [tfm-calma-app.vercel.app](https://tfm-calma-app.vercel.app)

## 📄 Presentación
Las diapositivas de defensa del TFM se encuentran disponibles en el enlace adjunto a la entrega o en la carpeta \`docs/\`.
