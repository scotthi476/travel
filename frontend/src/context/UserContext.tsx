import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"
import type { User } from "../types"

interface UserContextType {
    user: User | null
    login: (user: User) => void
    logout: () => void
}

const defaultContext: UserContextType = {
    user: null,
    login: () => {},
    logout: () => {},
}

export const UserContext = createContext<UserContextType>(defaultContext)

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    const login = (user: User) => {
        // TODO: Replace with real OAuth or backend auth session
        setUser(user)
    }

    const logout = () => {
        // TODO: Clear auth cookie or token if using backend
        setUser(null)
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)
