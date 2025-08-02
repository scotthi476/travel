import ExperienceGrid from "../features/experience/ExperienceGrid"
import FilterSidebar from "../features/filters/FilterSidebar"
import { useAuth } from "../contexts/AuthContext"
import { useExperienceContext } from "../contexts"
import { useEffect } from "react"

const Home = () => {
    const { items: experiences, loadItems } = useExperienceContext()
    const { currentUser } = useAuth()

    const yourExperiences = experiences.filter(
        (e) => e.createdBy === currentUser?.uid
    )
    const popularExperiences = experiences.filter(
        (e) => e.createdBy !== currentUser?.uid
    )

    useEffect(() => {
        loadItems()
    }, [])

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
                            <ExperienceGrid experiences={yourExperiences} />
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
