// config.ts - Simple environment configuration
export const config = {
    // API URL - defaults to local development
    apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3001/api",

    // Environment flags
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
}
