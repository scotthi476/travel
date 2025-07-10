import type { Experience } from "../../types"
import { Link } from "react-router-dom"

// TODO: Add "Add to Trip" button
// TODO: Add more meta info (e.g., location, price, etc. if supported)
// TODO: Improve card responsiveness for mobile

interface Props {
    experience: Experience
}

const ExperienceCard = ({ experience }: Props) => {
    return (
        <Link
            to={`/experience/${experience.id}`}
            className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
        >
            <img
                src={experience.imageUrl}
                alt={experience.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{experience.title}</h3>
                <p className="text-sm text-gray-600">
                    {experience.description}
                </p>
            </div>
        </Link>
    )
}

export default ExperienceCard
