import ExperienceCard from "./ExperienceCard"
import type { Experience } from "../../types"

type Props = {
    experiences: Experience[]
    onEdit?: (exp: Experience) => void
    onDelete?: (exp: Experience) => void
}

const ExperienceGrid = ({ experiences, onEdit, onDelete }: Props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {experiences.map((e) => (
                <ExperienceCard
                    key={e.id}
                    experience={e}
                    onEdit={onEdit ? () => onEdit(e) : undefined}
                    onDelete={onDelete ? () => onDelete(e) : undefined}
                />
            ))}
        </div>
    )
}

export default ExperienceGrid
