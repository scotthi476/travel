/**
 * Reusable keyword input component for entering and managing keyword tags.
 * Supports adding via input or "Add" button, and removing with delete buttons.
 * Includes support for label, helper text, error message, and disabled state.
 *
 * Example:
 * <KeywordInput
 *   label="Tags"
 *   value={keywords}
 *   onChange={setKeywords}
 *   helperText="Press enter or click add to include a keyword"
 *   error="At least one keyword is required"
 * />
 */

import { useState } from "react"
import Button from "./Button"

type Props = {
    // Label displayed above the keyword input
    label: string
    // List of current keywords (controlled)
    value: string[]
    // Change handler that receives updated keyword list
    onChange: (value: string[]) => void
    // Optional placeholder for the input field
    placeholder?: string
    // Optional helper text shown below the input
    helperText?: string
    // Optional error message shown below the input
    error?: string
    // Optional to disable the input and keyword management
    disabled?: boolean
}

const KeywordInput = ({
    label,
    value,
    onChange,
    placeholder = "Enter keyword and press enter",
    helperText,
    error,
    disabled = false,
}: Props) => {
    const [input, setInput] = useState("")

    // Add a new keyword if it's non-empty and not already present
    const addKeyword = () => {
        const trimmed = input.trim()
        if (trimmed && !value.includes(trimmed)) {
            onChange([...value, trimmed])
            setInput("")
        }
    }
    // Remove a keyword from the list
    const removeKeyword = (keyword: string) => {
        onChange(value.filter((k) => k !== keyword))
    }
    // Handle "Enter" key to add keyword quickly
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addKeyword()
        }
    }

    return (
        <div>
            {/* Label for the keyword input */}
            <label className="block font-medium mb-1">{label}</label>
            {/* Input field and Add button */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`flex-1 p-2 border rounded-sm transition focus:outline-none focus:ring-1 ${
                        error
                            ? "border-red-500 focus:ring-red-500"
                            : "border-zinc-300 focus:ring-orange-500"
                    } ${disabled ? "bg-zinc-100 cursor-not-allowed" : ""}`}
                />
                <Button
                    onClick={addKeyword}
                    disabled={disabled || !input.trim()}
                >
                    Add
                </Button>
            </div>

            {/* Optional helper or error text */}
            {helperText && !error && (
                <p className="text-sm text-zinc-500 mt-1">{helperText}</p>
            )}
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

            {/* Display current keywords as removable tags */}
            <div className="mt-2 flex flex-wrap gap-2">
                {value.map((k) => (
                    <span
                        key={k}
                        className="inline-flex items-center rounded bg-gray-100 px-2 py-2 gap-2"
                    >
                        {k}
                        <Button
                            onClick={() => removeKeyword(k)}
                            variant="delete"
                            disabled={disabled}
                        >
                            &times;
                        </Button>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default KeywordInput
