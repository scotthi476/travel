/**
 * Filters an array of experiences by a given search query.
 * Matches against title, description, and keywords (if present).
 *
 * @param experiences - The full list of experiences to search through
 * @param query - The user's input string to match against
 * @returns A filtered array of experiences that match the query
 */

import type { Experience } from "../types"

export function searchExperiences(
    experiences: Experience[],
    query: string
): Experience[] {
    const lowerQuery = query.toLowerCase()

    return experiences.filter((exp) => {
        // Normalize title and description for case-insensitive search
        const titleMatch = exp.title.toLowerCase().includes(lowerQuery)
        const descMatch = exp.description.toLowerCase().includes(lowerQuery)

        // Keywords is an optional array, so we check if any keyword matches
        const keywordsMatch = exp.keywords?.some((k) =>
            k.toLowerCase().includes(lowerQuery)
        )

        // Return true if any of the fields matched the query
        return titleMatch || descMatch || keywordsMatch
    })
}
