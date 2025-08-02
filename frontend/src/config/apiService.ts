import { config } from "./config"

// Simple error class for API errors
export class ApiError extends Error {
    status: number

    constructor(message: string, status: number) {
        super(message)
        this.name = "ApiError"
        this.status = status
    }
}

// Helper function to handle responses
const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const errorText = await response.text()
        throw new ApiError(
            errorText || `HTTP ${response.status}`,
            response.status
        )
    }

    // Handle empty responses
    if (response.status === 204) {
        return null
    }

    return response.json()
}

// Simple API service with CRUD operations
export const apiService = {
    // GET - Read items or single item
    async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${config.apiUrl}/${endpoint}`)
        return handleResponse(response)
    },

    // POST - Create new item
    async post<T>(endpoint: string, data: any): Promise<T> {
        const response = await fetch(`${config.apiUrl}/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        return handleResponse(response)
    },

    // PUT - Update existing item
    async put<T>(endpoint: string, data: any): Promise<T> {
        const response = await fetch(`${config.apiUrl}/${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        return handleResponse(response)
    },

    // DELETE - Remove item
    async delete(endpoint: string): Promise<void> {
        const response = await fetch(`${config.apiUrl}/${endpoint}`, {
            method: "DELETE",
        })
        await handleResponse(response)
    },
}

// Log API calls in development
if (config.isDevelopment) {
    const originalFetch = window.fetch
    window.fetch = async (...args) => {
        console.log("DEV ONLY: API Call:", args[0])
        const response = await originalFetch(...args)
        console.log(
            "DEV ONLY: API Response:",
            response.status,
            response.statusText
        )
        return response
    }
}
