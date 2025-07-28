import { useNavigate, useParams } from "react-router-dom"
import { useTripContext } from "../hooks/useTripContext"
import { useUserContext } from "../hooks/useUserContext"
import TripForm from "../components/forms/TripForm"
import { v4 } from "uuid"
import type { TripFormData } from "../types"
import ShadowCard from "../layout/ShadowCard"

const Trip = () => {
    const { tripId } = useParams()
    const navigate = useNavigate()
    const { trips, addTrip, updateTrip } = useTripContext()
    const { user } = useUserContext()

    const isEditing = Boolean(tripId)
    const existing = trips.find((t) => t.id === tripId)

    const handleSubmit = (data: TripFormData) => {
        const tripWithMeta = {
            ...data,
            id: isEditing && existing ? existing.id : v4(),
            createdBy: user ?? {
                id: "placeholder-user",
                username: "demo_user",
                isLoggedIn: false,
                authMethod: "guest",
            },
        }

        if (isEditing && existing) {
            updateTrip(tripWithMeta)
        } else {
            addTrip(tripWithMeta)
        }

        navigate("/my-trips")
    }

    const initialData = existing
        ? { title: existing.title, experiences: existing.experiences }
        : undefined

    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">
                {isEditing ? "Edit Trip" : "Create Trip"}
            </h1>
            <ShadowCard>
                <TripForm
                    onSubmit={handleSubmit}
                    onCancel={() => navigate("/my-trips")}
                    initialData={initialData}
                    isEditing={isEditing}
                />
            </ShadowCard>
        </div>
    )
}

export default Trip
