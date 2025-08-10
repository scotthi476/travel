import { useEffect, useState } from "react"
import { useTripContext } from "../../contexts"
import { useAuth } from "../../contexts/AuthContext"
import Button from "../../components/ui/Button"
import { useNavigate } from "react-router-dom"

interface Props {
    experienceId: number
    isOpen: boolean
    onClose: () => void
}

const AddToTripModal = ({ experienceId, isOpen, onClose }: Props) => {
    const { items: trips, loadItems, updateItem } = useTripContext()
    const { currentUser } = useAuth()
    const [selectedTripIds, setSelectedTripIds] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    // Filter to only user's trips
    const userTrips = trips.filter(
        (trip) => trip.createdBy === currentUser?.uid
    )

    const navigate = useNavigate()

    // Load on open
    useEffect(() => {
        if (isOpen && currentUser) {
            loadItems()
        }
    }, [isOpen, currentUser])

    const handleTripToggle = (tripId: string) => {
        setSelectedTripIds((prev) =>
            prev.includes(tripId)
                ? prev.filter((id) => id !== tripId)
                : [...prev, tripId]
        )
    }

    const handleSave = async () => {
        if (!currentUser) return

        setLoading(true)
        try {
            // Update only user's trips
            for (const trip of userTrips) {
                const shouldInclude = selectedTripIds.includes(trip.id)
                const currentlyIncludes = trip.experiences.includes(
                    experienceId.toString()
                )

                if (shouldInclude && !currentlyIncludes) {
                    // Add experience to trip
                    const updatedExperiences = [
                        ...trip.experiences,
                        experienceId.toString(),
                    ]
                    await updateItem(trip.id.toString(), {
                        experiences: updatedExperiences,
                    })
                } else if (!shouldInclude && currentlyIncludes) {
                    // Remove experience from trip
                    const updatedExperiences = trip.experiences.filter(
                        (id) => id !== experienceId.toString()
                    )
                    await updateItem(trip.id.toString(), {
                        experiences: updatedExperiences,
                    })
                }
            }
            onClose()
        } catch (error) {
            console.error("Failed to update trips:", error)
        } finally {
            setLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Add to Trip</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                    >
                        x
                    </button>
                </div>

                {userTrips.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">
                            You don't have any trips yet.
                        </p>
                        <Button
                            variant="primary"
                            onClick={() => navigate("/my-trips")}
                        >
                            Create Your First Trip
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
                            {userTrips.map((trip) => (
                                <label
                                    key={trip.id}
                                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedTripIds.includes(
                                            trip.id
                                        )}
                                        onChange={() =>
                                            handleTripToggle(trip.id)
                                        }
                                        className="w-4 h-4 hover:cursor-pointer"
                                    />
                                    <div className="flex-1">
                                        <div className="font-medium">
                                            {trip.title}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {trip.experiences.length}{" "}
                                            experiences
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            <Button
                                onClick={onClose}
                                variant="cancel"
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                variant="primary"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save"}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default AddToTripModal
