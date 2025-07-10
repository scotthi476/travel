import CalendarFilter from "./CalendarFilter"
import LocationFilter from "./LocationFilter"

const FilterSidebar = () => {
    return (
        <div className="flex flex-col gap-6 sticky top-6">
            <CalendarFilter />
            <LocationFilter />
        </div>
    )
}

export default FilterSidebar
