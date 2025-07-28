import { useNavigate } from "react-router-dom"
import ExperienceGrid from "../features/experience/ExperienceGrid"
import FilterSidebar from "../features/filters/FilterSidebar"
import { useExperienceContext } from "../hooks/useExperienceContext"
import { useUserContext } from "../hooks/useUserContext"
import type { Experience } from "../types"

const Home = () => {
    const { experiences, deleteExperience } = useExperienceContext()
    const { user } = useUserContext()
    const navigate = useNavigate()

    const yourExperiences = experiences.filter((e) => e.user?.id === user?.id)
    const popularExperiences = experiences.filter(
        (e) => e.user?.id !== user?.id
    )

    const handleEdit = (exp: Experience) => {
        navigate(`/experience/${exp.id}`)
    }

    const handleDelete = (exp: Experience) => {
        deleteExperience(exp.id)
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-grow space-y-10">
                    {/* Your Experiences */}
                    {yourExperiences.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">
                                Your Experiences
                            </h2>
                            <ExperienceGrid
                                experiences={yourExperiences}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </div>
                    )}

                    {/* Popular Experiences */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Popular Experiences
                        </h2>
                        <ExperienceGrid experiences={popularExperiences} />
                    </div>
                </div>

                {/* Right Sidebar */}
                <aside className="w-full lg:w-[280px]">
                    <FilterSidebar />
                </aside>
            </div>
        </div>
    )
}

export default Home
