import ExperienceCard from "./ExperienceCard"
import type { Experience } from "../../types"

type Props = {
    experiences: Experience[]
}

const ExperienceGrid = ({ experiences }: Props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {experiences.map((e) => (
                <ExperienceCard key={e.id} experience={e} />
            ))}
        </div>
    )
}

export default ExperienceGrid
