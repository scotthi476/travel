import { useContext, type JSX } from "react"
import { Navigate } from "react-router-dom"

interface Props {
    children: JSX.Element
}

const ProtectedRoute = ({ children }: Props) => {
    return children
}

export default ProtectedRoute
