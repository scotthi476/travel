import ExperienceForm from "../components/forms/ExperienceForm"
import ShadowCard from "../layout/ShadowCard"
import { useNavigate, useParams } from "react-router-dom"
import { useExperienceContext } from "../contexts"
import { useEffect, useState } from "react"
import type { Experience } from "../types"
import { useAuth } from "../contexts/AuthContext"
import ExperienceGrid from "../features/experience/ExperienceGrid"

const ExperiencePage = () => {
    // Get params
    const { experienceId } = useParams<{ experienceId?: string }>()
    const navigate = useNavigate()

    // Get auth context
    const { currentUser } = useAuth()

    // CRUD operations from context
    const {
        items: experiences,
        error,
        loadItems,
        createItem,
        updateItem,
        getById,
        deleteItem,
        clearError,
    } = useExperienceContext()

    // Local state for form management
    const [existingExperience, setExistingExperience] =
        useState<Experience | null>(null)
    const [_isInitialized, setIsInitialized] = useState(false)

    // Determine if editing based on if param was passed
    const isEditing = Boolean(experienceId)

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!currentUser) {
            navigate("/login")
        }
    }, [currentUser, navigate])

    // Load data and check for existing experience
    useEffect(() => {
        const initializePage = async () => {
            // If no experience ID provided, we're in create mode - just initialize
            if (!experienceId) {
                setIsInitialized(true)
                return
            }

            // Try to find the experience by ID
            const experience = getById(experienceId)
            if (!experience) {
                // Experience doesn't exist - redirect to home
                console.warn(`Experience with ID ${experienceId} not found`)
                navigate("/", { replace: true })
                return
            }

            // Check if current user has permission to edit this experience
            if (experience.createdBy !== currentUser?.uid) {
                // User doesn't own this experience - redirect to home
                console.warn(
                    "User does not have permission to edit this experience"
                )
                navigate("/", { replace: true })
                return
            }

            // All validations passed - set the experience for editing
            setExistingExperience(experience)
            setIsInitialized(true)
        }

        initializePage()
    }, [])

    // Handle creating new experience
    const handleCreate = async (
        experienceData: Omit<Experience, "id" | "createdAt" | "updatedAt">
    ) => {
        if (!currentUser) return

        try {
            // Add the current user's ID to the experience data
            const data = {
                ...experienceData,
                imageUrl: "https://picsum.photos/400/300?random=1000",
                createdBy: currentUser.uid,
            }
            await createItem(data)
            navigate("/")
        } catch (error) {
            console.error("Failed to create experience:", error)
        }
    }

    // Handle updating existing experience
    const handleUpdate = async (
        experienceData: Partial<
            Omit<Experience, "id" | "createdAt" | "updatedAt">
        >
    ) => {
        if (!existingExperience || !currentUser) return

        try {
            await updateItem(existingExperience.id, experienceData)
            navigate("/")
        } catch (error) {
            console.error("Failed to update experience:", error)
            // Error is already handled by context and will show in the form
        }
    }

    // Handle deleting experience
    const handleDelete = async (experience: Experience) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${experience.title}"?`
        )
        if (confirmed) {
            try {
                await deleteItem(experience.id.toString())
                await loadItems()
                navigate("/")
            } catch (error) {
                console.error("Failed to delete experience:", error)
                alert("Failed to delete experience. Please try again.")
            }
        }
    }

    // Handle canceling form
    const handleCancel = () => {
        clearError()
        navigate("/") // Go back to previous page
    }

    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">
                {isEditing ? "Edit Experience" : "Create Experience"}
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
                <ExperienceForm
                    onSubmit={isEditing ? handleUpdate : handleCreate}
                    onDelete={handleDelete}
                    onCancel={handleCancel}
                    initialData={existingExperience || undefined}
                    isEditing={isEditing}
                    experience={existingExperience || undefined}
                />
            </ShadowCard>
            <ShadowCard>
                <ExperienceGrid experiences={experiences} />
            </ShadowCard>
        </div>
    )
}

export default ExperiencePage
