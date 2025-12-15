// src/config/api.ts (ou criar um helper)
import { apiConfig } from './api';

interface LoginResponse {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}

export async function apiLogin(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch(apiConfig.endpoints.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao fazer login');
    }

    const data: LoginResponse = await response.json();
    return data;
}
