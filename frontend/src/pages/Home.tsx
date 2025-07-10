import ExperienceGrid from "../features/experience/ExperienceGrid"
import FilterSidebar from "../features/filters/FilterSidebar"

const Home = () => {
    return (
        <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Experience Cards */}
                <div className="flex-grow">
                    <h2 className="text-2xl font-bold mb-4">
                        Popular Experiences
                    </h2>
                    <ExperienceGrid />
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
