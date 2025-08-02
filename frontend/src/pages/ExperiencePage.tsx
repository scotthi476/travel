import ExperienceForm from "../components/forms/ExperienceForm"
import ShadowCard from "../layout/ShadowCard"
import { useNavigate, useParams } from "react-router-dom"
import { useExperienceContext } from "../contexts"
import { useEffect, useState } from "react"
import type { Experience } from "../types"
import { useAuth } from "../contexts/AuthContext"

const ExperiencePage = () => {
    // Get params
    const { experienceId } = useParams<{ experienceId?: string }>()
    const navigate = useNavigate()

    // Get auth context
    const { currentUser, loading: authLoading } = useAuth()

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

    const [_isdeleting, setIsDeleting] = useState(false)

    const isEditing = Boolean(experienceId)

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!authLoading && !currentUser) {
            // Redirect to login page
            navigate("/login")
        }
    }, [currentUser, authLoading, navigate])

    // Load data and check for existing experience
    useEffect(() => {
        // Don't initialize if user is not authenticated
        if (!currentUser || authLoading) return

        const initializePage = async () => {
            // Load experiences if not already loaded
            if (experiences.length === 0) {
                await loadItems()
            }

            // If we have an ID, try to find the experience
            if (experienceId) {
                const experience = getById(experienceId)
                if (experience) {
                    // Check if current user owns this experience
                    if (experience.createdBy !== currentUser.uid) {
                        console.warn(
                            "User does not have permission to edit this experience"
                        )
                        navigate("/experiences", { replace: true })
                        return
                    }
                    setExistingExperience(experience)
                } else {
                    // Experience not found, redirect to create mode
                    console.warn(`Experience with ID ${experienceId} not found`)
                    navigate("/experience", { replace: true })
                    return
                }
            }

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
                createdBy: currentUser.uid,
                // Note: createdBy will be set automatically by the mock API or backend
                // but we could explicitly set it here if needed
            }

            await createItem(data)

            // Navigate back to experiences list
            navigate("/experiences")
        } catch (error) {
            console.error("Failed to create experience:", error)
            // Error is already handled by context and will show in the form
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

            // Update local state with the updated experience
            const updatedExp = getById(existingExperience.id)
            if (updatedExp) {
                setExistingExperience(updatedExp)
            }

            // Navigate back to experiences list
            navigate("/experiences")
        } catch (error) {
            console.error("Failed to update experience:", error)
            // Error is already handled by context and will show in the form
        }
    }

    // Handle deleting experience
    const handleDelete = async () => {
        if (!existingExperience || !currentUser) return

        try {
            setIsDeleting(true)
            await deleteItem(existingExperience.id)

            // Navigate back to experiences list
            navigate("/experiences")
        } catch (error) {
            console.error("Failed to delete experience:", error)
            setIsDeleting(false)
            // Error is already handled by context
        }
    }

    // Handle canceling form
    const handleCancel = () => {
        clearError()
        navigate("/") // Go back to previous page
    }

    // Don't render anything if user is not authenticated (will redirect)
    if (!currentUser) {
        return null
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
                    onDelete={isEditing ? handleDelete : undefined}
                    onCancel={handleCancel}
                    initialData={existingExperience || undefined}
                    isEditing={isEditing}
                />
            </ShadowCard>
        </div>
    )
}

export default ExperiencePage
