# Calma - Tu espacio de gestión emocional (TFM)

> **Trabajo de Fin de Máster - Desarrollo de Aplicaciones Web**

**Calma** es una aplicación web diseñada con un enfoque humanista para acompañar a los usuarios en la gestión de sus emociones. Ofrece herramientas prácticas para situaciones de ansiedad, estrés o baja autoestima, facilitando el autoconocimiento y la conexión con terapeutas especializados.

---

## 📌 1. Descripción General
Este proyecto integra tecnologías modernas de desarrollo web con principios de "Calm Technology" (diseño no intrusivo). Su objetivo es proporcionar un espacio seguro y accesible donde los usuarios puedan:
*   Realizar ejercicios guiados de gestión emocional (respiración, mindfulness).
*   Mantener un **Diario Emocional** privado y seguro.
*   Registrar su progreso y hábitos.
*   Consultar un **Directorio de Terapeutas** profesionales.

## 🛠️ 2. Stack Tecnológico
*   **Frontend**: [Next.js 16](https://nextjs.org/) (App Router, Server Components).
*   **Lenguaje**: TypeScript (Tipado estricto para mayor robustez).
*   **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) + [Shadcn/ui](https://ui.shadcn.com/) (Diseño accesible y responsive).
*   **Backend / Auth**: [Supabase](https://supabase.com/) (PostgreSQL, Auth Helpers, RLS).
*   **Testing**: [Playwright](https://playwright.dev/) (Pruebas E2E).
*   **Extras**: Soporte PWA (Manifest), SEO optimizado, i18n (Código comentado en español).
*   **Despliegue**: Vercel.

## 🔒 3. Seguridad y Arquitectura
La seguridad es un pilar fundamental en **Calma**, dado el tratamiento de datos sensibles:
*   **Middleware**: Protección de rutas privadas (`/profile`) mediante `src/middleware.ts`, asegurando que solo usuarios autenticados accedan.
*   **Row Level Security (RLS)**: Políticas de base de datos en PostgreSQL que garantizan que cada usuario solo pueda leer/escribir su propio progreso (`user_progress`) y perfil (`profiles`).
*   **Autenticación**: Gestión de sesiones segura vía Supabase Auth (JWT).

## 🚀 4. Instalación y Ejecución

### Requisitos Previos
*   Node.js (v18 o superior).
*   Cuenta en Supabase (y proyecto creado).

### Pasos
1.  **Clonar el repositorio**:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd tfm-calma-app
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno**:
    Crea un archivo `.env.local` en la raíz:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
    NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key_anon
    ```

4.  **Base de Datos**:
    Ejecuta el script `db_schema.sql` (incluido en el repo) en el SQL Editor de Supabase para crear tablas y políticas.

5.  **Ejecutar en desarrollo**:
    ```bash
    npm run dev
    ```
    Visita [http://localhost:3000](http://localhost:3000).

## ✅ 5. Testing
El proyecto cuenta con una suite de pruebas End-to-End (E2E) con Playwright para verificar los flujos críticos (Navegación, Auth, Carga).

Ejecutar tests:
```bash
npx playwright test
```

## 📁 6. Estructura del Proyecto
*   `src/app`: Rutas y páginas (App Router).
    *   `(auth)`: Login/Register.
    *   `exercises`: Catálogo y detalle (con lógica de completado).
    *   `journal`: Diario emocional privado (protegido por RLS).
    *   `profile`: Área privada del usuario.
    *   `therapists`: Directorio de profesionales.
*   `src/components`: UI Kit reutilizable (Navbar, Cards, Alerts).
*   `src/lib` y `src/utils`: Clientes Supabase y utilidades.
*   `src/middleware.ts`: Barrera de seguridad para rutas protegidas.
*   `tests/`: Tests E2E.

## 📄 7. Presentación
El guion y esquema de la presentación para la defensa del TFM se encuentra en el archivo [SLIDES.md](./SLIDES.md).

## 🌐 8. Despliegue
URL de producción (Demo): [https://tfm-calma-app.vercel.app](https://tfm-calma-app.vercel.app)
