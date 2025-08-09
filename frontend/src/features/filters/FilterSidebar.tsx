import { useNavigate } from "react-router-dom"
import Button from "../../components/ui/Button"
import ExperienceMap from "../experience/ExperienceMap"
// import CalendarFilter from "./CalendarFilter"

const FilterSidebar = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col sticky top-6">
            {/* <CalendarFilter /> */}
            <h2 className="text-2xl font-bold mb-4">Map Viewer</h2>
            <div className="flex flex-col gap-4">
                <Button onClick={() => navigate("/map")}>Map Interface</Button>
                <ExperienceMap isCreateMode={false} />
            </div>
        </div>
    )
}

export default FilterSidebar
