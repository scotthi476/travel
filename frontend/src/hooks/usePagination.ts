/**
 * Simple Pagination Hook
 *
 * A reusable hook for handling pagination logic with configurable page size.
 */

import { useState, useEffect } from "react"
import type { PaginationResult } from "../types"

export const usePagination = <T>(
    data: T[] = [],
    itemsPerPage: number = 10
): PaginationResult<T> => {
    const [currentPage, setCurrentPage] = useState(1)

    // Calculate total pages
    const totalPages = Math.ceil(data.length / itemsPerPage)

    // Calculate current page data
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentData = data.slice(startIndex, endIndex)

    // Navigation functions
    const goToPage = (page: number) => {
        const validPage = Math.max(1, Math.min(page, totalPages))
        setCurrentPage(validPage)
    }

    const nextPage = () => goToPage(currentPage + 1)
    const prevPage = () => goToPage(currentPage - 1)
    const goToFirst = () => goToPage(1)
    const goToLast = () => goToPage(totalPages)

    // Reset to page 1 when data changes
    useEffect(() => {
        setCurrentPage(1)
    }, [data.length])

    return {
        currentData,
        currentPage,
        totalPages,
        totalItems: data.length,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1,
        goToPage,
        nextPage,
        prevPage,
        goToFirst,
        goToLast,
    }
}
