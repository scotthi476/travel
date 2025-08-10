/**
 * Reusable Button component with configurable variant styles.
 * Accepts children for flexible button content (text, icons, etc).
 *
 * Example:
 * <Button variant="delete" onClick={handleDelete}>Delete</Button>
 */

import React from "react"

type Variant =
    | "primary"
    | "secondary"
    | "outline"
    | "update"
    | "delete"
    | "cancel"

type Props = {
    // Button type (button, submit, or reset), default is button
    type?: "button" | "submit" | "reset"
    // What type of button, default is primary
    variant?: Variant
    // Event handler
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    // Indicate if button is disabled, default is false
    disabled?: boolean
    // Accept valid JSX
    children: React.ReactNode
}

const Button = ({
    type = "button",
    variant = "primary",
    onClick,
    disabled = false,
    children,
}: Props) => {
    const baseClass = `px-3 py-2 rounded-sm transition border text-xs ${
        disabled
            ? "cursor-not-allowed disabled:text-gray-500 disabled:border-gray-500 disabled:bg-gray-50"
            : "cursor-pointer"
    }`
    let variantClass = ""

    // Tailwind classNames based on variant
    switch (variant) {
        case "primary":
            variantClass = "bg-orange-500 text-white hover:bg-orange-600"
            break
        case "secondary":
            variantClass = "bg-emerald-800 text-white hover:bg-emerald-900"
            break
        case "outline":
            variantClass =
                "border-orange-500 text-orange-500 hover:bg-orange-50"
            break
        case "update":
            variantClass = "bg-amber-600 text-white hover:bg-amber-700"
            break
        case "cancel":
            variantClass = "bg-zinc-400 text-white hover:bg-zinc-500 "
            break
        case "delete":
            variantClass = "bg-red-500 text-white hover:bg-red-600"
            break
    }

    return (
        <button
            type={type}
            className={`${baseClass} ${variantClass}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
