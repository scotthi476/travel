import { createContext } from "react"
import type { Trip } from "../types"

/*
 * Context type definition for Trip
 * Provides CRUD operations and state management for trips
 */
interface TripContextType {
    trips: Trip[]
    isLoading: boolean
    error: string | null
    fetchTrips: () => Promise<void>
    addTrip: (trip: Omit<Trip, "id">) => Promise<void>
    updateTrip: (trip: Trip) => Promise<void>
    deleteTrip: (id: string) => Promise<void>
    clearError: () => void
}

/*
 * React Context for Trip
 * Provides centralized state and operations for trip data
 *
 * Usage:
 * - Wrap components with TripProvider
 * - Use useContext(TripContext) to access state and methods
 */
export const TripContext = createContext<TripContextType>({
    trips: [],
    isLoading: false,
    error: null,
    fetchTrips: async () => {},
    addTrip: async () => {},
    updateTrip: async () => {},
    deleteTrip: async () => {},
    clearError: () => {},
})
