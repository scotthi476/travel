import Button from "../../components/ui/Button"
import type { Experience } from "../../types"
import { Link, useNavigate } from "react-router-dom"
import AddToTripModal from "../trips/AddToTripModal"
import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useExperienceContext } from "../../contexts"

// TODO: Add "Add to Trip" button
// TODO: Add more meta info (e.g., location, price, etc. if supported)
// TODO: Improve card responsiveness for mobile

interface Props {
    experience: Experience
}

const ExperienceCard = ({ experience }: Props) => {
    const [showTripModal, setShowTripModal] = useState(false)
    const navigate = useNavigate()
    const { currentUser } = useAuth()
    const { loadItems, deleteItem } = useExperienceContext()

    const handleEdit = (exp: Experience) => {
        navigate(`/experience/${exp.id}`)
    }

    const handleDelete = async (experience: Experience) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${experience.title}"? This action cannot be undone.`
        )

        if (confirmed) {
            try {
                await deleteItem(experience.id.toString())
                await loadItems()
            } catch (error) {
                console.error("Failed to delete experience:", error)
                alert("Failed to delete experience. Please try again.")
            }
        }
    }

    // Check if current user owns this experience
    const isOwner = currentUser?.uid === experience.createdBy

    return (
        <div className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition px-2 py-4">
            <Link to={`/experience/view/${experience.id}`}>
                {experience.imageUrl && (
                    <img
                        src={experience.imageUrl}
                        alt={experience.title}
                        className="w-full h-48 object-cover"
                    />
                )}
                <div className="p-4">
                    <h3 className="text-lg font-semibold">
                        {experience.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {experience.description}
                    </p>
                </div>
            </Link>
            <div className="flex gap-2">
                <Button
                    onClick={() => setShowTripModal(true)}
                    variant="outline"
                >
                    Add to Trip
                </Button>

                <Button
                    onClick={() =>
                        navigate(`/experience/view/${experience.id}`)
                    }
                    variant="primary"
                >
                    View
                </Button>
                {isOwner && (
                    <>
                        <Button
                            variant="update"
                            onClick={() => handleEdit(experience)}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="delete"
                            onClick={() => handleDelete(experience)}
                        >
                            Delete
                        </Button>
                    </>
                )}
            </div>

            {/* Modal */}
            <AddToTripModal
                experienceId={parseInt(experience.id)}
                isOpen={showTripModal}
                onClose={() => setShowTripModal(false)}
            />
        </div>
    )
}

export default ExperienceCard
