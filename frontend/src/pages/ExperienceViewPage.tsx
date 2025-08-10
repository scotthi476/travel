import { useParams, useNavigate } from "react-router-dom"
import { useExperienceContext } from "../contexts"
import { useEffect, useState } from "react"
import Button from "../components/ui/Button"
import ShadowCard from "../layout/ShadowCard"
import { useAuth } from "../contexts/AuthContext"
import RatingInput from "../components/ui/RatingInput"

const ExperienceViewPage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const { items: experiences, loadItems, getById } = useExperienceContext()
    const { currentUser } = useAuth()

    // Community rating state
    const [communityRating, setCommunityRating] = useState<number>(0)
    const [isSubmittingRating, setIsSubmittingRating] = useState(false)
    const [ratingError, setRatingError] = useState<string>("")
    const [hasRated, setHasRated] = useState(false)

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

    // Determine if user can rate
    const canRate = currentUser && !isOwner && !hasRated

    const url = `${import.meta.env.VITE_API_URL}/experiences/${
        experience.id
    }/rate`

    // Handle community rating submission
    const handleSubmitRating = async () => {
        if (communityRating === 0) {
            setRatingError("Please select a rating")
            return
        }

        setIsSubmittingRating(true)
        setRatingError("")

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rating: communityRating,
                    createdBy: currentUser?.uid,
                }),
            })

            if (response.ok) {
                setHasRated(true)
                setCommunityRating(0) // Reset form
                loadItems() // Refresh experience data to show new community rating
            } else {
                const error = await response.json()
                setRatingError(error.error || "Failed to submit rating")
            }
        } catch (err) {
            setRatingError("Network error occurred")
        } finally {
            setIsSubmittingRating(false)
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">{experience.title}</h1>
            </div>

            <ShadowCard>
                <div className="space-y-4">
                    {experience.imageUrl && (
                        <img
                            src={experience.imageUrl}
                            alt={experience.title}
                            className="w-full h-64 object-cover rounded"
                        />
                    )}

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

                    {/* Creator's Personal Rating */}
                    {experience.rating && (
                        <div>
                            <h3 className="font-semibold">Creator's Rating</h3>
                            <p>
                                {"★".repeat(experience.rating)}
                                {"☆".repeat(5 - experience.rating)} (
                                {experience.rating}/5)
                            </p>
                        </div>
                    )}
                    {/* Community Rating Display */}
                    <div>
                        <h3 className="font-semibold">Community Rating</h3>
                        {experience.communityRatingCount &&
                        experience.communityRatingCount > 0 &&
                        experience.ratingAverage ? (
                            <p>
                                {"★".repeat(
                                    Math.round(experience.ratingAverage)
                                )}
                                {"☆".repeat(
                                    5 - Math.round(experience.ratingAverage)
                                )}{" "}
                                {experience.ratingAverage.toFixed(1)}(
                                {experience.communityRatingCount} ratings)
                            </p>
                        ) : (
                            <p className="text-gray-500 italic">
                                No community ratings yet
                            </p>
                        )}
                    </div>

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

                    {/* Community Rating Input */}
                    {canRate && (
                        <div className="border-t pt-4">
                            <h3 className="font-semibold mb-3">
                                Rate This Experience
                            </h3>
                            <div className="max-w-xs">
                                <RatingInput
                                    label="Your Rating"
                                    value={communityRating}
                                    onChange={setCommunityRating}
                                    placeholder="Select a rating..."
                                    helperText="Share your experience with the community"
                                    error={ratingError}
                                    disabled={isSubmittingRating}
                                />
                                <Button
                                    onClick={handleSubmitRating}
                                    disabled={
                                        isSubmittingRating ||
                                        communityRating === 0
                                    }
                                >
                                    {isSubmittingRating
                                        ? "Submitting..."
                                        : "Submit Rating"}
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Rating Status Messages */}
                    {!currentUser && (
                        <div className="border-t pt-4">
                            <p className="text-gray-500 italic">
                                Log in to rate this experience
                            </p>
                        </div>
                    )}

                    {isOwner && (
                        <div className="border-t pt-4">
                            <p className="text-gray-500 italic">
                                This is your experience
                            </p>
                        </div>
                    )}

                    {hasRated && (
                        <div className="border-t pt-4">
                            <p className="text-green-600 font-medium">
                                Thanks for rating this experience!
                            </p>
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
                    <div className="flex gap-2">
                        <Button onClick={() => navigate(-1)} variant="cancel">
                            Back
                        </Button>
                        {isOwner && (
                            <Button
                                variant="update"
                                onClick={() =>
                                    navigate(`/experience/${experience.id}`)
                                }
                            >
                                Edit
                            </Button>
                        )}
                    </div>
                </div>
            </ShadowCard>
        </div>
    )
}

export default ExperienceViewPage
