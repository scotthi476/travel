import { createContext } from "react"
import type { User } from "../types"

interface UserContextType {
    user: User | null
    login: (user: User) => void
    logout: () => void
}

export const UserContext = createContext<UserContextType>({
    user: null,
    login: () => {},
    logout: () => {},
})
