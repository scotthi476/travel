// config.ts - Simple environment configuration
export const config = {
    // API URL - defaults to local development
    // apiUrl: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
    apiUrl: "http://localhost:3001/api",

    // Environment flags
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
}
