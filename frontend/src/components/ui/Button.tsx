/**
 * Reusable Button component with configurable variant styles.
 * Accepts children for flexible button content (text, icons, etc).
 *
 * Example:
 * <Button variant="delete" onClick={handleDelete}>Delete</Button>
 */

import React from "react"

type Variant = "primary" | "outline" | "update" | "delete" | "cancel"

type Props = {
    // Button type (button, submit, or reset), default is button
    type?: "button" | "submit" | "reset"
    // What type of button, default is primary
    variant?: Variant
    // Event handler
    onClick?: React.MouseEventHandler<HTMLButtonElement>
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
    const baseClass = "px-4 py-2 rounded-sm transition cursor-pointer"
    let variantClass = ""

    // Tailwind classNames based on variant
    switch (variant) {
        case "primary":
            variantClass =
                "bg-orange-500 text-white hover:bg-orange-600 disabled:bg-orange-200"
            break
        case "outline":
            variantClass =
                "border border-orange-500 text-orange-500 hover:bg-orange-50 disabled:border-orange-200 disabled:text-orange-200"
            break
        case "update":
            variantClass =
                "bg-amber-400 text-white hover:bg-amber-500 disabled:bg-amber-200"
            break
        case "cancel":
            variantClass = "bg-gray-500 hover:bg-gray-600 disabled:bg-gray-200"
            break
        case "delete":
            variantClass =
                "bg-red-500 text-white hover:bg-red-600 disabled:bg-red-200"
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
