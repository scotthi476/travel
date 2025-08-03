import ExperienceGrid from "../features/experience/ExperienceGrid"
import FilterSidebar from "../features/filters/FilterSidebar"
import { useAuth } from "../contexts/AuthContext"
import { useExperienceContext } from "../contexts"
import { useEffect } from "react"

const HomePage = () => {
    const {
        items: experiences,
        updateItem,
        deleteItem,
        loadItems,
        loaded,
    } = useExperienceContext()
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
            publicExperiences.push(e)
        }
    })

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-grow space-y-10">
                    {/* Auth User Experiences */}
                    {userExperiences.length > 0 && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">
                                Your Experiences
                            </h2>
                            <ExperienceGrid
                                experiences={userExperiences}
                                handleEdit={updateItem}
                                handleDelete={deleteItem}
                            />
                        </div>
                    )}

                    {/* Popular Experiences */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">
                            Popular Experiences
                        </h2>
                        <ExperienceGrid
                            experiences={publicExperiences}
                            handleEdit={updateItem}
                            handleDelete={deleteItem}
                        />
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

export default HomePage
