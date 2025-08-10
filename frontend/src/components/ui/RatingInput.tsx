/**
 * Reusable rating dropdown component for selecting a numeric score.
 * Supports custom label, scale range, disabled state, helper text, and error messaging.
 *
 * Example:
 * <RatingInput
 *   label="Experience Rating"
 *   value={rating}
 *   onChange={setRating}
 *   max={5}
 *   helperText="Rate from 1 (worst) to 5 (best)"
 *   error="Rating is required"
 * />
 */

type Props = {
    // Label displayed above the rating dropdown
    label: string
    // Currently selected rating value (controlled)
    value: number
    // Handler called when rating changes
    onChange: (value: number) => void
    // Maximum rating number (default: 5)
    max?: number
    // Optional helper text shown below the dropdown
    helperText?: string
    // Optional error message shown below the dropdown
    error?: string
    // Optional to disable the dropdown selection
    disabled?: boolean
    // Optional placeholder option (e.g., "Select a rating...")
    placeholder?: string
}

const RatingInput = ({
    label,
    value,
    onChange,
    max = 5,
    helperText,
    error,
    disabled = false,
    placeholder = "Select a rating...",
}: Props) => {
    return (
        <div>
            {/* Label for the dropdown */}
            <label className="block font-medium mb-1">{label}</label>

            {/* Rating dropdown */}
            <select
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                disabled={disabled}
                className={`w-full p-2 border rounded-sm transition focus:outline-none focus:ring-1 ${
                    error
                        ? "border-red-500 focus:ring-red-500"
                        : "border-zinc-300 focus:ring-orange-500"
                } ${disabled ? "bg-zinc-100 cursor-not-allowed" : ""}`}
            >
                <option value={0} disabled>
                    {placeholder}
                </option>
                {[...Array(max)].map((_, index) => {
                    const rating = index + 1
                    return (
                        <option key={rating} value={rating}>
                            {rating} Star{rating > 1 ? "s" : ""}
                        </option>
                    )
                })}
            </select>

            {/* Helper and error messages */}
            {helperText && !error && (
                <p className="text-sm text-zinc-500 mt-1">{helperText}</p>
            )}
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    )
}
export default RatingInput
