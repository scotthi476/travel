import ExperienceCard from "./ExperienceCard"
import { mockExperiences } from "../../assets/experiences"

const ExperienceGrid = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockExperiences.map((e) => (
                <ExperienceCard key={e.id} experience={e} />
            ))}
        </div>
    )
}

export default ExperienceGrid
