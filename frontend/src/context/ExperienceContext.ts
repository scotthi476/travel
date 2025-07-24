import { createContext } from "react"
import type { Experience } from "../types"

interface ExperienceContextType {
    experiences: Experience[]
    fetchExperiences: () => Promise<void>
    addExperience: (exp: Experience) => void
    updateExperience: (exp: Experience) => void
    deleteExperience: (id: string) => void
}

export const ExperienceContext = createContext<ExperienceContextType>({
    experiences: [],
    fetchExperiences: async () => {},
    addExperience: () => {},
    updateExperience: () => {},
    deleteExperience: () => {},
})
