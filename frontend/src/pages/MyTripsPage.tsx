import type { Trip } from "../types/index.ts"
import "./TripList.tsx"
import TripList from "./TripList.tsx"
import { useNavigate } from "react-router-dom"
import Button from "../components/ui/Button.tsx"
import { useTripContext } from "../contexts/index.ts"
import { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext.tsx"

//Reference : https://www.youtube.com/watch?v=R1uTPIOuT8s React Simple CRUD Application

const MyTripsPage = () => {
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    const { items: trips, loadItems, deleteItem } = useTripContext()

    useEffect(() => {
        loadItems()
    }, [])

    const userTrips = trips.filter(
        (trip) => trip.createdBy === currentUser?.uid
    )

    const handleAddTrip = () => {
        navigate("/trip")
    }

    const handleEditTrip = (trip: Trip) => {
        navigate(`/trip/${trip.id}`)
    }

    const handleDeleteTrip = (trip: Trip) => {
        deleteItem(trip.id)
    }

    return (
        <>
            <div>
                <br />
                <h1>My Trips</h1>
                <br />
            </div>
            <section>
                <Button onClick={handleAddTrip}>Add Trip</Button>
                <TripList
                    list={userTrips}
                    onDeleteClickHnd={handleDeleteTrip}
                    onEdit={handleEditTrip}
                />
            </section>
        </>
    )
}

export default MyTripsPage
