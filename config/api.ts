const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export const apiConfig = {
    baseURL: API_BASE_URL,
    endpoints: {
        auth: {
            login: `${API_BASE_URL}/auth/login`,
            register: `${API_BASE_URL}/auth/register`,
            logout: `${API_BASE_URL}/auth/logout`,
            refresh: `${API_BASE_URL}/auth/refresh`,
            me: `${API_BASE_URL}/auth/me`, // para pegar dados do usuário atual
        },
        // Adicione outros endpoints conforme sua API
        users: `${API_BASE_URL}/users`,
        // images: `${API_BASE_URL}/images`,
        images: {
            all: `${API_BASE_URL}/images/all`,
            userImages: `${API_BASE_URL}/images/user/id`,
            myImages: `${API_BASE_URL}/images/me/images`
        }
    },
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 segundos
};

// Função auxiliar para construir URLs completas
export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;