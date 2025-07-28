import Button from "../../components/ui/Button"
import type { Experience } from "../../types"
import { Link } from "react-router-dom"

// TODO: Add "Add to Trip" button
// TODO: Add more meta info (e.g., location, price, etc. if supported)
// TODO: Improve card responsiveness for mobile

interface Props {
    experience: Experience
    onEdit?: () => void
    onDelete?: () => void
}

const ExperienceCard = ({ experience, onEdit, onDelete }: Props) => {
    return (
        <div className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <Link to={`/experience/${experience.id}`}>
                <img
                    src={experience.imageUrl}
                    alt={experience.title}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold">
                        {experience.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                        {experience.description}
                    </p>
                </div>
            </Link>
            {(onEdit || onDelete) && (
                <div className="absolute top-2 right-2 flex gap-2">
                    {onEdit && (
                        <Button variant="update" onClick={onEdit}>
                            Edit
                        </Button>
                    )}
                    {onDelete && (
                        <Button variant="delete" onClick={onDelete}>
                            Delete
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}

export default ExperienceCard
