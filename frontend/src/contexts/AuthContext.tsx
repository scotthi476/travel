/*
Firebase Authentication Context

provides authentication state management for the webb app
provides  current user info, loads state during auth initialization,
logout function, and auto authentication state monitoring
*/

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import type { User } from "firebase/auth"
import { auth } from "../config/firebase"

interface AuthContextType {
    currentUser: User | null
    loading: boolean
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    // Logout function
    const logout = async (): Promise<void> => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error("Error signing out:", error)
            throw error
        }
    }

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        // Cleanup subscription on unmount
        return unsubscribe
    }, [])

    const value: AuthContextType = {
        currentUser,
        loading,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthContext
