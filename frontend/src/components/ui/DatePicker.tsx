/**
 * Reusable date picker component for form entries.
 * Handles date formatting and conversion automatically.
 *
 * Example:
 * <DatePicker
 *   id="eventDate"
 *   label="Event Date"
 *   value={date}
 *   onChange={(e) => setDate(e.target.value)}
 *   helperText="Optional event date"
 * />
 */

import React from "react"

type Props = {
    // Unique identifier for input and label association
    id: string
    // Descriptive label shown above the input
    label: string
    // Date value (string, Date, or null/undefined)
    value: string | Date | null | undefined
    // Change event handler
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    // Optional indication if the input should be disabled
    disabled?: boolean
    // Optional helper text shown below input
    helperText?: string
    // Optional error message and visual state
    error?: string
}

const DatePicker = ({
    id,
    label,
    value,
    onChange,
    disabled = false,
    helperText,
    error,
}: Props) => {
    // Convert various date formats to the HTML date input format (yyyy-MM-dd)
    const getDateValue = () => {
        if (!value) return ""

        if (value instanceof Date) {
            return value.toISOString().slice(0, 10)
        }

        if (typeof value === "string") {
            // Handle ISO datetime strings or existing date strings
            return value.slice(0, 10)
        }

        return ""
    }

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
                type="date"
                value={getDateValue()}
                onChange={onChange}
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

export default DatePicker
