/**
 * Reusable text input component for form entries.
 * Supports different input types, disabled state, helper text, and error display.
 *
 * Example:
 * <TextInput
 *   id="email"
 *   label="Email Address"
 *   type="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   placeholder="Enter your email"
 *   helperText="We'll never share your email."
 *   error="Email is required"
 * />
 */

import React from "react"

type Props = {
    // Unique identifier for input and label association
    id: string
    // Descriptive label shown above the input
    label: string
    // Input value
    value: string
    // Change event handler, i.e. text is entered
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    // Input type, default is "text"
    type?: React.HTMLInputTypeAttribute
    // Optional placeholder text
    placeholder?: string
    // Optional indication of if the input should be disabled
    disabled?: boolean
    // Optional helper text shown below input, default is false
    helperText?: string
    // Optional error message and visual state
    error?: string
}

const TextInput = ({
    id,
    label,
    value,
    onChange,
    type = "text",
    placeholder,
    disabled = false,
    helperText,
    error,
}: Props) => {
    const baseClass =
        "w-full p-2 border rounded-sm transition focus:outline-none focus:ring-1"
    const errorClass = error
        ? "border-red-500 focus:ring-red-500"
        : "border-zinc-300 focus:ring-orange-500"

    return (
        <div>
            <label htmlFor={id} className="block font-medium mb-1">
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`${baseClass} ${errorClass} ${
                    disabled ? "bg-zinc-100 cursor-not-allowed" : ""
                }`}
            />
            {helperText && !error && (
                <p className="text-sm text-zinc-500 mt-1">{helperText}</p>
            )}
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    )
}

export default TextInput
