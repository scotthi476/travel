import { type JSX } from "react"
import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

interface Props {
    children: JSX.Element
}

const ProtectedRoute = ({ children }: Props) => {
    const { currentUser, loading } = useAuth()
    
    // show loading message while authorizing
    if (loading) {
        return <div>Loading...</div>
    }

    // if authentication failed, redirect back to login
    if (!currentUser) {
        return <Navigate to = "/login" replace />
    }
    
    return children
}

export default ProtectedRoute
