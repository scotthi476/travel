import { type JSX } from "react"

interface Props {
    children: JSX.Element
}

const ProtectedRoute = ({ children }: Props) => {
    return children
}

export default ProtectedRoute
