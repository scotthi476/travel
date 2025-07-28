import type { Trip } from "../types"
import "./TripList.tsx"
import TripList from "./TripList.tsx"
import "./AddTrip.tsx"
import { useNavigate } from "react-router-dom"
import { useTripContext } from "../hooks/useTripContext.ts"
import Button from "../components/ui/Button.tsx"

//Reference : https://www.youtube.com/watch?v=R1uTPIOuT8s React Simple CRUD Application

const MyTrips = () => {
    const navigate = useNavigate()
    const { trips, deleteTrip } = useTripContext()

    const handleAddTrip = () => {
        navigate("/trip")
    }

    const handleEditTrip = (trip: Trip) => {
        navigate(`/trip/${trip.id}`)
    }

    const handleDeleteTrip = (trip: Trip) => {
        deleteTrip(trip.id)
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
                    _list={trips}
                    onDeleteClickHnd={handleDeleteTrip}
                    onEdit={handleEditTrip}
                />
            </section>
        </>
    )
}

export default MyTrips
