import { useCallback, useEffect, useState, type ReactNode } from "react"
import type { Trip } from "../types"
import { TripContext } from "./TripContext"
import { mockTripList } from "../assets/trips"

// Configuration constants for API endpoints
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001"
const TRIPS_ENDPOINT = `${API_BASE_URL}/api/trips`

/*
 * Provider component for Trip context
 * Manages experience state and provides CRUD operations
 *
 * Features:
 * - Centralized state management for trips
 * - Loading and error state handling
 * - API integration
 */
export const TripProvider = ({ children }: { children: ReactNode }) => {
    // State management
    const [trips, setTrips] = useState<Trip[]>(mockTripList)
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

    // Fetch all trips from API
    const fetchTrips = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(TRIPS_ENDPOINT)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data: Trip[] = await response.json()
            setTrips(data)
        } catch (err) {
            // For development: fall back to mock data if API is not available
            console.warn("API not available, using mock data:", err)
            setTrips(mockTripList)
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Add new trip
    const addTrip = useCallback(
        async (tripData: Omit<Trip, "id">) => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await fetch(TRIPS_ENDPOINT, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(tripData),
                })
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const newTrip: Trip = await response.json()

                // Add the new trip to state
                setTrips((prev) => [...prev, newTrip])
            } catch (err) {
                handleError(err, "add trip")
            } finally {
                setIsLoading(false)
            }
        },
        [handleError]
    )

    // Update an existing trip
    const updateTrip = useCallback(
        async (updatedTrip: Trip) => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await fetch(
                    `${TRIPS_ENDPOINT}/${updatedTrip.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedTrip),
                    }
                )
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const serverTrip: Trip = await response.json()
                // Update the trip in state
                setTrips((prev) =>
                    prev.map((trip) =>
                        trip.id === serverTrip.id ? serverTrip : trip
                    )
                )
            } catch (err) {
                handleError(err, "update trip")
            } finally {
                setIsLoading(false)
            }
        },
        [handleError]
    )

    // Delete a trip
    const deleteTrip = useCallback(
        async (id: string) => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await fetch(`${TRIPS_ENDPOINT}/${id}`, {
                    method: "DELETE",
                })
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                // Remove the trip from state
                setTrips((prev) => prev.filter((trip) => trip.id !== id))
            } catch (err) {
                handleError(err, "delete trip")
            } finally {
                setIsLoading(false)
            }
        },
        [handleError]
    )

    // Initial data fetch
    useEffect(() => {
        fetchTrips()
    }, [fetchTrips])

    // Context value object
    const contextValue = {
        trips,
        isLoading,
        error,
        fetchTrips,
        addTrip,
        updateTrip,
        deleteTrip,
        clearError,
    }

    return (
        <TripContext.Provider value={contextValue}>
            {children}
        </TripContext.Provider>
    )
}
