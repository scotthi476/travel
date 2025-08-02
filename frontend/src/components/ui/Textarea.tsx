type Props = {
    // Unique identifier for textarea and label association
    id: string
    // Descriptive label shown above the textarea
    label: string
    // Textarea value (controlled)
    value: string
    // Change event handler
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    // Optional placeholder text
    placeholder?: string
    // Optional indication of if the textarea should be disabled
    disabled?: boolean
    // Optional helper text shown below the textarea
    helperText?: string
    // Optional error message and visual state
    error?: string
    // Optional number of visible text rows
    rows?: number
    required?: boolean
}

const Textarea = ({
    id,
    label,
    value,
    onChange,
    placeholder,
    disabled = false,
    helperText,
    error,
    rows = 4,
}: Props) => {
    const baseClass =
        "w-full p-2 border rounded-sm transition focus:outline-none focus:ring-1 resize-none"
    const errorClass = error
        ? "border-red-500 focus:ring-red-500"
        : "border-zinc-300 focus:ring-orange-500"

    return (
        <div>
            <label htmlFor={id} className="block font-medium mb-1">
                {label}
            </label>
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                rows={rows}
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

export default Textarea
