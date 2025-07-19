import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"
import type { Experience } from "../types"

interface ExperienceContextType {
    experiences: Experience[]
    fetchExperiences: () => Promise<void>
    addExperience: (exp: Experience) => void
    updateExperience: (exp: Experience) => void
    deleteExperience: (id: string) => void
}

const defaultContext: ExperienceContextType = {
    experiences: [],
    fetchExperiences: async () => {},
    addExperience: () => {},
    updateExperience: () => {},
    deleteExperience: () => {},
}

export const ExperienceContext =
    createContext<ExperienceContextType>(defaultContext)

export const ExperienceProvider = ({ children }: { children: ReactNode }) => {
    const [experiences, setExperiences] = useState<Experience[]>([])

    const fetchExperiences = async () => {
        // TODO: Replace this with a real backend GET endpoint
        // const res = await fetch("api-endpoint");
        const res = await fetch("/api/experiences.json")
        const data = await res.json()
        setExperiences(data)
    }

    const addExperience = async (exp: Experience) => {
        // TODO: Replace with POST request to backend
        // await fetch("api-endpoint", { method: "POST", body: JSON.stringify(exp) });
        setExperiences((prev) => [...prev, exp])
    }

    const updateExperience = async (exp: Experience) => {
        // TODO: Replace with PUT request to backend
        // await fetch(`api-endpoint/${exp.id}`, { method: "PUT", body: JSON.stringify(exp) });
        setExperiences((prev) => prev.map((e) => (e.id === exp.id ? exp : e)))
    }

    const deleteExperience = async (id: string) => {
        // TODO: Replace with DELETE request to backend
        // await fetch(`api-endpoint/${id}`, { method: "DELETE" });
        setExperiences((prev) => prev.filter((e) => e.id !== id))
    }

    useEffect(() => {
        fetchExperiences()
    }, [])

    return (
        <ExperienceContext.Provider
            value={{
                experiences,
                fetchExperiences,
                addExperience,
                updateExperience,
                deleteExperience,
            }}
        >
            {children}
        </ExperienceContext.Provider>
    )
}

export const useExperienceContext = () => useContext(ExperienceContext)
