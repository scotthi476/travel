import ExperienceCard from "./ExperienceCard"
import type { Experience } from "../../types"
import { usePagination } from "../../hooks/usePagination"
import PaginationControls from "../../components/ui/PaginationControls"

type Props = {
    experiences: Experience[]
}

const ExperienceGrid = ({ experiences }: Props) => {
    const pagination = usePagination(experiences, 10)

    return (
        <div className="gap-4">
            {/* Pagination info */}
            <div className="text-sm text-gray-500 mb-4">
                Showing {pagination.currentData.length} of{" "}
                {pagination.totalItems} experiences
            </div>

            {/* Pagination controls */}
            <div className="mb-4">
                <PaginationControls pagination={pagination} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {pagination.currentData.map((e) => (
                    <ExperienceCard key={e.id} experience={e} />
                ))}
            </div>
        </div>
    )
}

export default ExperienceGrid
