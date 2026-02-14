import { test, expect } from '@playwright/test';

test.describe('TFM Calma App - Critical Flows', () => {

    // 1. Carga de la Página de Inicio (Prueba de Humo)
    test('should load homepage successfully', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Calma/);
        await expect(page.getByRole('heading', { name: "Gestiona tus emociones con consciencia y calma" })).toBeVisible();
    });

    // 2. Navegación a Ejercicios
    test('should navigate to exercises catalog', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('link', { name: 'Explorar ejercicios' }).click();
        await expect(page).toHaveURL(/.*exercises/);
        await expect(page.getByRole('heading', { name: 'Catálogo de Ejercicios' })).toBeVisible();
    });

    // 3. Vista de Detalle del Ejercicio
    test('should view exercise details', async ({ page }) => {
        await page.goto('/exercises');
        // Hacer clic en la primera tarjeta de ejercicio (asumiendo que "Respiración Consciente" o similar es la primera)
        await page.locator('a[href^="/exercises/"]').first().click();

        // Verificar elementos de la página de detalle
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible(); // Título
        await expect(page.getByText('¿Por qué funciona?')).toBeVisible(); // Sección de propósito
        await expect(page.getByText('Instrucciones Paso a Paso')).toBeVisible(); // Sección de pasos
    });

    // 4. Acceso a Rutas Protegidas (Seguridad)
    test('should redirect unauthenticated users from profile', async ({ page }) => {
        await page.goto('/profile');
        // Esperar redirección al login
        await expect(page).toHaveURL(/.*login/);
        await expect(page.getByRole('heading', { name: 'Bienvenido a Calma' })).toBeVisible(); // Cabecera del login
    });

    // 5. Directorio de Terapeutas
    test('should load therapist directory', async ({ page }) => {
        await page.goto('/therapists');
        await expect(page).toHaveTitle(/Directorio de Terapeutas/);
        await expect(page.getByRole('heading', { name: 'Encuentra tu terapeuta' })).toBeVisible();
        // Verificar si las tarjetas están presentes (asumiendo que los datos simulados se renderizan)
        await expect(page.locator('.rounded-xl').first()).toBeVisible(); // Clase genérica de tarjeta o similar
        // Mejor selector basado en mi implementación
        await expect(page.getByText('Dra. Elena García')).toBeVisible();
    });

    // 6. Acceso al Diario (Redirige si no se ha iniciado sesión)
    test('should redirect unauthenticated users from journal', async ({ page }) => {
        await page.goto('/journal');
        await expect(page).toHaveURL(/.*login/);
    });
});
