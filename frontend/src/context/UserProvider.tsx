import { useState, type ReactNode } from "react"
import type { User } from "../types"
import { UserContext } from "./UserContext"

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
