import Button from "../../components/ui/Button"
import type { Experience } from "../../types"
import { Link, useNavigate } from "react-router-dom"
import AddToTripModal from "../trips/AddToTripModal"
import { useState } from "react"

// TODO: Add "Add to Trip" button
// TODO: Add more meta info (e.g., location, price, etc. if supported)
// TODO: Improve card responsiveness for mobile

interface Props {
    experience: Experience
}

const ExperienceCard = ({ experience }: Props) => {
    // State for showing add to trip modal
    const [showTripModal, setShowTripModal] = useState(false)

    const navigate = useNavigate()

    return (
        <div className="block border border-gray-300 rounded-lg overflow-hidden shadow hover:shadow-lg transition p-4">
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
                    onClick={() =>
                        navigate(`/experience/view/${experience.id}`)
                    }
                    variant="primary"
                >
                    View
                </Button>
                <Button
                    onClick={() => setShowTripModal(true)}
                    variant="secondary"
                >
                    Add to Trip
                </Button>
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
