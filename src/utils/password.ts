export const passwordRules = {
    minLength: 8,
    message: "La contraseña debe tener al menos 8 caracteres, incluir mayúscula, minúscula, número y carácter especial.",
};

export function validatePassword(password: string): string | null {
    if (!password || password.length < passwordRules.minLength) {
        return `La contraseña debe tener al menos ${passwordRules.minLength} caracteres`;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[\W_]/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
        return passwordRules.message;
    }

    return null;
}
