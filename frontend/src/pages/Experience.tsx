import ExperienceForm from "../components/forms/ExperienceForm"
import { useExperienceContext } from "../hooks/useExperienceContext"
import ShadowCard from "../layout/ShadowCard"
import { useNavigate, useParams } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext"
import type { ExperienceFormData } from "../types/experience"

const Experience = () => {
    const { experienceId } = useParams()
    const navigate = useNavigate()
    const {
        experiences,
        addExperience,
        updateExperience,
        isLoading,
        error,
        clearError,
    } = useExperienceContext()

    const { user } = useUserContext()

    const isEditing = Boolean(experienceId)
    const existing = experiences.find((e) => e.id === experienceId)

    const handleSubmit = async (data: ExperienceFormData) => {
        // Clear any previuos errors
        clearError()
        try {
            if (isEditing && existing) {
                // For editing, create a complete Experience object with required ID
                const updatedExperience = {
                    ...data,
                    id: existing.id,
                    user: user ?? {
                        id: "placeholder-user",
                        username: "demo_user",
                        isLoggedIn: false,
                        authMethod: "guest",
                    },
                    ratingAverage: data.rating,
                }
                await updateExperience(updatedExperience)
            } else {
                // For new experiences, create object without ID
                const newExperience = {
                    ...data,
                    user: user ?? {
                        id: "placeholder-user",
                        username: "demo_user",
                        isLoggedIn: false,
                        authMethod: "guest",
                    },
                    ratingAverage: data.rating,
                }
                await addExperience(newExperience)
            }
            navigate("/")
        } catch (err) {
            console.error("Failed to save experience:", err)
        }
    }

    // Show loading state
    if (isLoading) {
        return (
            <div>
                <h1 className="text-xl font-semibold mb-4">
                    {isEditing ? "Edit Experience" : "Create Experience"}
                </h1>
                <ShadowCard>
                    <div className="flex items-center justify-center p-8">
                        <div className="text-gray-500">
                            Saving experience...
                        </div>
                    </div>
                </ShadowCard>
            </div>
        )
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
                            ×
                        </button>
                    </div>
                </div>
            )}
            <ShadowCard>
                <ExperienceForm
                    onSubmit={handleSubmit}
                    initialData={existing}
                    isEditing={isEditing}
                />
            </ShadowCard>
        </div>
    )
}

export default Experience
