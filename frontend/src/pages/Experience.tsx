import ExperienceForm from "../components/forms/ExperienceForm"
import { useExperienceContext } from "../hooks/useExperienceContext"
import { v4 } from "uuid"
import ShadowCard from "../layout/ShadowCard"
import { useNavigate, useParams } from "react-router-dom"
import { useUserContext } from "../hooks/useUserContext"
import type { ExperienceFormData } from "../types/experience"

const Experience = () => {
    const { experienceId } = useParams()
    const navigate = useNavigate()
    const { experiences, addExperience, updateExperience } =
        useExperienceContext()
    const { user } = useUserContext()

    const isEditing = Boolean(experienceId)
    const existing = experiences.find((e) => e.id === experienceId)

    const handleSubmit = (data: ExperienceFormData) => {
        const experienceWithMeta = {
            ...data,
            id: isEditing && existing ? existing.id : v4(),
            user: user ?? {
                id: "placeholder-user",
                username: "demo_user",
                isLoggedIn: false,
                authMethod: "guest",
            },
            ratingAverage: data.rating,
        }

        if (isEditing && existing) {
            updateExperience(experienceWithMeta)
        } else {
            addExperience(experienceWithMeta)
        }

        navigate("/")
    }

    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">
                {isEditing ? "Edit Experience" : "Create Experience"}
            </h1>
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
