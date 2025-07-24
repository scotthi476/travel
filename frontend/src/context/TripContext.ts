import { createContext } from "react"
import type { Trip } from "../types"

interface TripContextType {
    trips: Trip[]
    fetchTrips: () => Promise<void>
    addTrip: (trip: Trip) => void
    updateTrip: (trip: Trip) => void
    deleteTrip: (id: string) => void
}

export const TripContext = createContext<TripContextType>({
    trips: [],
    fetchTrips: async () => {},
    addTrip: () => {},
    updateTrip: () => {},
    deleteTrip: () => {},
})
