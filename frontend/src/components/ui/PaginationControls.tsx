/**
 * Pagination Controls Component
 *
 * Renders navigation controls for pagination using the reusable Button component.
 */

import Button from "./Button"
import type { PaginationResult } from "../../types"

interface Props {
    pagination: PaginationResult<any>
    showFirstLast?: boolean
    className?: string
}

export const PaginationControls = ({
    pagination,
    showFirstLast = true,
    className = "",
}: Props) => {
    const {
        currentPage,
        totalPages,
        hasNext,
        hasPrev,
        nextPage,
        prevPage,
        goToFirst,
        goToLast,
    } = pagination

    if (totalPages <= 1) return null

    return (
        <nav
            className={`flex justify-between items-center mt-6 ${className}`}
            aria-label="Pagination Navigation"
        >
            <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
            </div>

            <div className="flex gap-2">
                {showFirstLast && (
                    <Button
                        variant="outline"
                        onClick={goToFirst}
                        disabled={!hasPrev}
                    >
                        First
                    </Button>
                )}

                <Button
                    variant="outline"
                    onClick={prevPage}
                    disabled={!hasPrev}
                >
                    Previous
                </Button>

                <Button
                    variant="primary"
                    onClick={nextPage}
                    disabled={!hasNext}
                >
                    Next
                </Button>

                {showFirstLast && (
                    <Button
                        variant="outline"
                        onClick={goToLast}
                        disabled={!hasNext}
                    >
                        Last
                    </Button>
                )}
            </div>
        </nav>
    )
}

export default PaginationControls
