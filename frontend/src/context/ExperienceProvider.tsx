import { useCallback, useEffect, useState, type ReactNode } from "react"
import type { Experience } from "../types"
import { ExperienceContext } from "./ExperienceContext"
import { mockExperiences } from "../assets/experiences"

// Configuration constants for API endpoints
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001"
const EXPERIENCES_ENDPOINT = `${API_BASE_URL}/api/experiences`

/*
 * Provider component for Experience context
 * Manages experience state and provides CRUD operations
 *
 * Features:
 * - Centralized state management for experiences
 * - Loading and error state handling
 * - API integration
 */
export const ExperienceProvider = ({ children }: { children: ReactNode }) => {
    // State management
    const [experiences, setExperiences] =
        useState<Experience[]>(mockExperiences)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Generic error handler for API operations
    const handleError = useCallback((error: unknown, operation: string) => {
        console.error(`Failed to ${operation}:`, error)
        const errorMessage =
            error instanceof Error
                ? error.message
                : `Failed to ${operation}. Please try again.`
        setError(errorMessage)
        setIsLoading(false)
    }, [])

    // Clear any existing error state
    const clearError = useCallback(() => {
        setError(null)
    }, [])

    // Fetch all experiences from API
    const fetchExperiences = useCallback(async () => {
        try {
            const response = await fetch(EXPERIENCES_ENDPOINT)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data: Experience[] = await response.json()
            setExperiences(data)
        } catch (err) {
            // For development: fall back to mock data if API is not available
            console.warn("API not available, using mock data:", err)
            setExperiences(mockExperiences)
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Add new experience
    const addExperience = useCallback(
        async (experienceData: Omit<Experience, "id">) => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await fetch(EXPERIENCES_ENDPOINT, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(experienceData),
                })
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const newExperience: Experience = await response.json()
                // Add the new experience to state
                setExperiences((prev) => [...prev, newExperience])
            } catch (err) {
                handleError(err, "add experience")
            } finally {
                setIsLoading(false)
            }
        },
        [handleError]
    )

    // Update an existing experience
    const updateExperience = useCallback(
        async (updatedExperience: Experience) => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await fetch(
                    `${EXPERIENCES_ENDPOINT}/${updatedExperience.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedExperience),
                    }
                )
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const serverExperience: Experience = await response.json()
                // Update the experience in state
                setExperiences((prev) =>
                    prev.map((exp) =>
                        exp.id === serverExperience.id ? serverExperience : exp
                    )
                )
            } catch (err) {
                handleError(err, "update experience")
            } finally {
                setIsLoading(false)
            }
        },
        [handleError]
    )

    // Delete experience
    const deleteExperience = useCallback(
        async (id: string) => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await fetch(`${EXPERIENCES_ENDPOINT}/${id}`, {
                    method: "DELETE",
                })
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                // Remove the experience from state
                setExperiences((prev) => prev.filter((exp) => exp.id !== id))
            } catch (err) {
                handleError(err, "delete experience")
            } finally {
                setIsLoading(false)
            }
        },
        [handleError]
    )

    // Initial data fetch
    useEffect(() => {
        fetchExperiences()
    }, [fetchExperiences])

    // Context value object
    const contextValue = {
        experiences,
        isLoading,
        error,
        fetchExperiences,
        addExperience,
        updateExperience,
        deleteExperience,
        clearError,
    }

    return (
        <ExperienceContext.Provider value={contextValue}>
            {children}
        </ExperienceContext.Provider>
    )
}
