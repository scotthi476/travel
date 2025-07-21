import { useContext, useEffect, useState, type ReactNode } from "react"
import type { Trip } from "../types"
import { TripContext } from "./TripContext"

export const TripProvider = ({ children }: { children: ReactNode }) => {
    const [trips, setTrips] = useState<Trip[]>([])

    const fetchTrips = async () => {
        // TODO: Replace this with a real backend GET endpoint
        // const res = await fetch("api-endpoint");
        const res = await fetch("/api/trips.json")
        const data = await res.json()
        setTrips(data)
    }

    const addTrip = async (trip: Trip) => {
        // TODO: Replace with POST request to backend
        // await fetch("api-endpoint", { method: "POST", body: JSON.stringify(trip) });
        setTrips((prev) => [...prev, trip])
    }

    const updateTrip = async (trip: Trip) => {
        // TODO: Replace with PUT request to backend
        // await fetch(`api-endpoint/${trip.id}`, { method: "PUT", body: JSON.stringify(trip) });
        setTrips((prev) => prev.map((e) => (e.id === trip.id ? trip : e)))
    }

    const deleteTrip = async (id: string) => {
        // TODO: Replace with DELETE request to backend
        // await fetch(`api-endpoint/${id}`, { method: "DELETE" });
        setTrips((prev) => prev.filter((e) => e.id !== id))
    }

    useEffect(() => {
        fetchTrips()
    }, [])

    return (
        <TripContext.Provider
            value={{
                trips,
                fetchTrips,
                addTrip,
                updateTrip,
                deleteTrip,
            }}
        >
            {children}
        </TripContext.Provider>
    )
}

export const useTripContext = () => useContext(TripContext)
