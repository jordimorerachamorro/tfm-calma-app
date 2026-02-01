import { test, expect } from '@playwright/test';

test.describe('TFM Calma App - Critical Flows', () => {

    // 1. Homepage Load (Smoke Test)
    test('should load homepage successfully', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/Calma/);
        await expect(page.getByRole('heading', { name: "Tu espacio de gestión emocional" })).toBeVisible();
    });

    // 2. Navigation to Exercises
    test('should navigate to exercises catalog', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('link', { name: 'Explorar ejercicios' }).click();
        await expect(page).toHaveURL(/.*exercises/);
        await expect(page.getByRole('heading', { name: 'Catálogo de Ejercicios' })).toBeVisible();
    });

    // 3. Exercise Detail View
    test('should view exercise details', async ({ page }) => {
        await page.goto('/exercises');
        // Click on the first exercise card (assuming "Respiración Consciente" or similar is first)
        await page.locator('a[href^="/exercises/"]').first().click();

        // Verify detail page elements
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible(); // Title
        await expect(page.getByText('¿Por qué funciona?')).toBeVisible(); // Purpose section
        await expect(page.getByText('Instrucciones Paso a Paso')).toBeVisible(); // Steps section
    });

    // 4. Protected Route Access (Security)
    test('should redirect unauthenticated users from profile', async ({ page }) => {
        await page.goto('/profile');
        // Expect redirect to login
        await expect(page).toHaveURL(/.*login/);
        await expect(page.getByRole('heading', { name: 'Bienvenido a Calma' })).toBeVisible(); // Login header
    });

    // 5. Auth Flow (Mocked or real if env vars allow - skipping actual login to avoid side effects on prod DB during test without dedicated test user)
    // Ideally, use a test user or mock auth state.
});
