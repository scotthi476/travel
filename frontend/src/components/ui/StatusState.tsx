/**
 * UI component for displaying loading, error, or empty result states.
 * Use it to wrap search results, API content, or lists.
 */

import type { ReactNode } from "react"

type Props = {
    loading?: boolean // Whether component is in loading state
    error?: boolean // Whether error occurred
    empty?: boolean // Whether no results
    customMessage?: string // Optional override message for error or empty state
    children?: ReactNode // Children to render
}

const StatusState = ({
    loading = false,
    error = false,
    empty = false,
    customMessage,
    children,
}: Props) => {
    const status: "loading" | "error" | "empty" | null = loading
        ? "loading"
        : error
        ? "error"
        : empty
        ? "empty"
        : null

    switch (status) {
        // TODO: Update styling
        case "loading":
            return <p>Loading...</p>
        case "error":
            return <p>{customMessage || "Something went wrong."}</p>
        case "empty":
            return <p>{customMessage || "No results found."}</p>
        default:
            return <>{children}</>
    }
}

export default StatusState
