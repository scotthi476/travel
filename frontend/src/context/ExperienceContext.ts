import { createContext } from "react"
import type { Experience } from "../types"

/*
 * Context type definition for Experience
 * Provides CRUD operations and state management for experiences
 */
interface ExperienceContextType {
    experiences: Experience[]
    isLoading: boolean
    error: string | null
    fetchExperiences: () => Promise<void>
    addExperience: (exp: Omit<Experience, "id">) => Promise<void>
    updateExperience: (exp: Experience) => Promise<void>
    deleteExperience: (id: string) => Promise<void>
    clearError: () => void
}

/*
 * React Context for Experience
 * Provides centralized state and operations for experience data
 *
 * Usage:
 * - Wrap components with ExperienceProvider
 * - Use useContext(ExperienceContext) to access state and methods
 */
export const ExperienceContext = createContext<ExperienceContextType>({
    experiences: [],
    isLoading: false,
    error: null,
    fetchExperiences: async () => {},
    addExperience: async () => {},
    updateExperience: async () => {},
    deleteExperience: async () => {},
    clearError: () => {},
})
