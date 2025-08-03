import { useParams, useNavigate } from "react-router-dom"
import { useExperienceContext } from "../contexts"
import { useEffect } from "react"
import Button from "../components/ui/Button"
import ShadowCard from "../layout/ShadowCard"
import { useAuth } from "../contexts/AuthContext"

const ExperienceViewPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const { items: experiences, loadItems, getById } = useExperienceContext()
    const { currentUser } = useAuth()

    const experience = getById(parseInt(id || "0"))

    useEffect(() => {
        if (experiences.length === 0) {
            loadItems()
        }
    }, [])

    if (!experience) {
        return (
            <div className="text-center py-8">
                <h1>Experience not found</h1>
                <Button onClick={() => navigate("/")}>Back to Home</Button>
            </div>
        )
    }

    // Check if current user owns this experience
    const isOwner = currentUser?.uid === experience.createdBy

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{experience.title}</h1>
            </div>

            <ShadowCard>
                <div className="space-y-4">
                    <img
                        src={experience.imageUrl}
                        alt={experience.title}
                        className="w-full h-64 object-cover rounded"
                    />

                    <div>
                        <h2 className="text-lg font-semibold mb-2">
                            Description
                        </h2>
                        <p className="text-gray-700">
                            {experience.description}
                        </p>
                    </div>

                    {experience.date && (
                        <div>
                            <h3 className="font-semibold">Date</h3>
                            <p>
                                {new Date(experience.date).toLocaleDateString()}
                            </p>
                        </div>
                    )}

                    {experience.rating && (
                        <div>
                            <h3 className="font-semibold">Rating</h3>
                            <p>
                                {"X".repeat(experience.rating)} (
                                {experience.rating}/5)
                            </p>
                        </div>
                    )}

                    <div>
                        <h3 className="font-semibold">Location</h3>
                        <p>
                            Lat: {experience.latitude}, Lng:{" "}
                            {experience.longitude}
                        </p>
                    </div>

                    {experience.keywords && experience.keywords.length > 0 && (
                        <div>
                            <h3 className="font-semibold">Keywords</h3>
                            <div className="flex flex-wrap gap-2">
                                {experience.keywords.map((keyword) => (
                                    <span
                                        key={keyword}
                                        className="bg-gray-200 px-2 py-1 rounded text-sm"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="text-sm text-gray-500">
                        <p>
                            Created:{" "}
                            {new Date(
                                experience.createdAt
                            ).toLocaleDateString()}
                        </p>
                        <p>Public: {experience.isPublic ? "Yes" : "No"}</p>
                    </div>
                    <Button onClick={() => navigate(-1)} variant="cancel">
                        Back
                    </Button>
                    {isOwner && (
                        <>
                            <Button
                                variant="update"
                                onClick={() =>
                                    navigate(`/experience/${experience.id}`)
                                }
                            >
                                Edit
                            </Button>
                        </>
                    )}
                </div>
            </ShadowCard>
        </div>
    )
}

export default ExperienceViewPage
