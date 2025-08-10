import { useMemo, useState } from "react"
import ExperienceMap from "../features/experience/ExperienceMap"
import type { Experience } from "../types"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { useExperienceContext } from "../contexts"
import Button from "../components/ui/Button"
import ShadowCard from "../layout/ShadowCard"
import ExperienceForm from "../components/forms/ExperienceForm"
import ExperienceGrid from "../features/experience/ExperienceGrid"

const MapPage = () => {
    // State for create mode and displaying form
    const [isCreateMode, setIsCreateMode] = useState(false)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [clickedPosition, setClickedPosition] = useState<
        [number, number] | null
    >(null)

    // State for map bounds
    const [mapBounds, setMapBounds] = useState<{
        north: number
        south: number
        east: number
        west: number
    } | null>(null)

    const navigate = useNavigate()
    // Get auth context
    const { currentUser } = useAuth()

    // CRUD operations from context
    const { items: experiences, createItem } = useExperienceContext()

    // Helper function to check if experience is within bounds
    const isExperienceInBounds = (
        experience: any,
        bounds: typeof mapBounds
    ) => {
        if (!bounds) return false

        const lat = parseFloat(experience.latitude?.toString() || "0")
        const lng = parseFloat(experience.longitude?.toString() || "0")

        return (
            lat >= bounds.south &&
            lat <= bounds.north &&
            lng >= bounds.west &&
            lng <= bounds.east
        )
    }

    // Filter experiences within map bounds
    const visibleExperiences = useMemo(() => {
        if (!mapBounds) return []

        return experiences.filter(
            (exp) =>
                exp.latitude &&
                exp.longitude &&
                isExperienceInBounds(exp, mapBounds)
        )
    }, [experiences, mapBounds])

    // Handle create mode toggle
    const toggleCreateMode = () => {
        setIsCreateMode(!isCreateMode)
        setShowCreateForm(false)
        setClickedPosition(null)
    }

    // Handle map click when in create mode
    const handleMapClick = (lat: number, lng: number) => {
        setClickedPosition([lat, lng])
        setShowCreateForm(true)
    }

    // Handle form cancellation
    const handleCancel = () => {
        setShowCreateForm(false)
        setClickedPosition(null)
    }

    // Handle creating new experience
    const handleCreate = async (
        experienceData: Omit<Experience, "id" | "createdAt" | "updatedAt">
    ) => {
        if (!currentUser) return

        try {
            // Add the current user's ID to the experience data
            const data = {
                ...experienceData,
                createdBy: currentUser.uid,
            }
            await createItem(data)
            navigate("/")
        } catch (error) {
            console.error("Failed to create experience:", error)
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Experience Map</h1>
            <ExperienceMap
                isCreateMode={isCreateMode}
                onMapClick={handleMapClick}
                tempMarkerPosition={clickedPosition}
                onBoundsChange={setMapBounds}
            />

            {/* Control Panel */}
            <div className="flex items-center gap-4 my-4">
                {isCreateMode ? (
                    <Button onClick={toggleCreateMode} variant="cancel">
                        Exit Create Mode
                    </Button>
                ) : (
                    <Button onClick={toggleCreateMode} variant="primary">
                        Enter Create Mode
                    </Button>
                )}
            </div>

            {/* Create Form (when visible) */}
            {showCreateForm && clickedPosition && (
                <ShadowCard>
                    <ExperienceForm
                        onSubmit={handleCreate}
                        onCancel={handleCancel}
                        initialData={{
                            latitude: clickedPosition[0],
                            longitude: clickedPosition[1],
                        }}
                    />
                </ShadowCard>
            )}

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">
                    Experiences in View ({visibleExperiences.length})
                </h2>

                {visibleExperiences.length === 0 ? (
                    <p className="text-gray-500">
                        Move the map to see experiences in this area
                    </p>
                ) : (
                    <ExperienceGrid experiences={visibleExperiences} />
                )}
            </div>
        </div>
    )
}

export default MapPage
