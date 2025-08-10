import ExperienceGrid from "../features/experience/ExperienceGrid"
import FilterSidebar from "../features/filters/FilterSidebar"
import { useAuth } from "../contexts/AuthContext"
import { useExperienceContext } from "../contexts"
import { useEffect } from "react"

const HomePage = () => {
    const { items: experiences, loadItems, loaded } = useExperienceContext()
    const { currentUser } = useAuth()

    // If not items not loaded yet, call loadItems()
    useEffect(() => {
        if (!loaded) loadItems()
    }, [])

    // Initialize array for experience
    const userExperiences: typeof experiences = []
    const publicExperiences: typeof experiences = []

    // Single pass to filter experiences by type
    experiences.forEach((e) => {
        if (e.createdBy === currentUser?.uid) {
            userExperiences.push(e)
        } else {
            if (e.isPublic) {
                publicExperiences.push(e)
            }
        }
    })

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-grow space-y-10">
                {/* Auth User Experiences */}
                {userExperiences.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Your Experiences
                        </h2>
                        <ExperienceGrid experiences={userExperiences} />
                    </div>
                )}

                {/* Popular Experiences */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        Popular Experiences
                    </h2>
                    <ExperienceGrid experiences={publicExperiences} />
                </div>
            </div>

            {/* Right Sidebar */}
            <aside className="w-full lg:w-[420px]">
                <FilterSidebar />
            </aside>
        </div>
    )
}

export default HomePage
