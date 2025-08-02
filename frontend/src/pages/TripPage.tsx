import { useNavigate, useParams } from "react-router-dom"
import TripForm from "../components/forms/TripForm"
import ShadowCard from "../layout/ShadowCard"
import { useTripContext } from "../contexts"
import { useAuth } from "../contexts/AuthContext"
import type { Trip } from "../types"

const TripPage = () => {
    const { tripId } = useParams()
    const navigate = useNavigate()
    const {
        items: trips,
        createItem,
        updateItem,
        deleteItem,
        isLoading,
        error,
        clearError,
    } = useTripContext()
    const { currentUser } = useAuth()

    const isEditing = Boolean(tripId)
    const existing = trips.find((t) => t.id.toString() === tripId)

    // Submit handler that handles both new trip and update trip
    const handleSubmit = async (
        data: Omit<Trip, "id" | "createdAt" | "createdBy" | "updatedAt">
    ) => {
        clearError()

        try {
            if (isEditing && existing) {
                // For editing, create a complete Trip object with required ID
                const updatedTrip = {
                    ...data,
                    id: existing?.id,
                    createdBy: currentUser ?? {
                        id: "placeholder-user",
                        username: "demo_user",
                        isLoggedIn: false,
                        authMethod: "guest",
                    },
                }
                await updateItem(existing.id, data)
            } else {
                // For new trips, create object without ID
                const newTrip = {
                    ...data,
                    createdBy: currentUser?.uid,
                }
                await createItem(newTrip)
            }
            navigate("/my-trips")
        } catch (err) {
            console.error("Failed to save trip:", err)
        }
    }

    // Show loading state
    if (isLoading || (isEditing && !existing && trips.length === 0)) {
        return (
            <div>
                <h1 className="text-xl font-semibold mb-4">
                    {isEditing ? "Edit Experience" : "Create Experience"}
                </h1>
                <ShadowCard>
                    <div className="flex items-center justify-center p-8">
                        <div className="text-gray-500">Saving trip...</div>
                    </div>
                </ShadowCard>
            </div>
        )
    }

    // Delete handler
    const handleDelete = async () => {
        if (!existing?.id) return

        const confirmed = window.confirm(
            "Are you sure you want to delete this trip?"
        )
        if (!confirmed) return

        try {
            await deleteItem(existing.id.toString())
            navigate("/")
        } catch (err) {
            console.error("Failed to delete experience:", err)
        }
    }

    const initialData = existing || undefined

    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">
                {isEditing ? "Edit Trip" : "Create Trip"}
            </h1>
            {/* Display error message if there's an error */}
            {error && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    <div className="flex justify-between items-center">
                        <span>{error}</span>
                        <button
                            onClick={clearError}
                            className="text-red-500 hover:text-red-700"
                        >
                            x
                        </button>
                    </div>
                </div>
            )}
            <ShadowCard>
                <TripForm
                    onSubmit={handleSubmit}
                    onDelete={isEditing ? handleDelete : undefined}
                    onCancel={() => navigate("/my-trips")}
                    initialData={initialData || undefined}
                    isEditing={isEditing}
                />
            </ShadowCard>
        </div>
    )
}

export default TripPage
