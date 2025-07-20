/**
 * Reusable image upload component with base64 preview support.
 * Accepts image files and returns a data URL to the parent component.
 * Supports customizable label, disabled state, helper text, and error messaging.
 *
 * Example:
 * <ImageUpload
 *   label="Profile Picture"
 *   url={image}
 *   onChange={setImage}
 *   helperText="JPG or PNG under 2MB"
 *   error="Image is required"
 * />
 */

// TODO: File size validation
// TODO: Drag & drop support
// TODO: Server uplaods and async handling

import Button from "./Button"

type Props = {
    // Label shown above the upload input
    label: string
    // Current image URL
    url: string
    // Handler to update the image URL
    onChange: (url: string) => void
    // Optional helper text below the upload input
    helperText?: string
    // Optional error message below the upload input
    error?: string
    // Optional to disable upload control
    disabled?: boolean
}

const ImageUpload = ({
    label,
    url,
    onChange,
    helperText,
    error,
    disabled = false,
}: Props) => {
    // Handle file input change and convert to base64
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                onChange(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div>
            {/* Label for the upload section */}
            <label className="block font-medium mb-1">{label}</label>

            {/* File input styled with a Button wrapper */}
            <div className="relative w-fit">
                <Button variant="outline" disabled={disabled}>
                    Upload Image
                </Button>
                <input
                    type="file"
                    accept="image/*"
                    disabled={disabled}
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
            </div>

            {/* Helper or error messaging */}
            {helperText && !error && (
                <p className="text-sm text-zinc-500 mt-1">{helperText}</p>
            )}
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

            {/* Image preview if a URL is provided */}
            {url && (
                <img
                    src={url}
                    alt="Preview"
                    className="mt-2 h-40 w-full object-cover rounded"
                />
            )}
        </div>
    )
}

export default ImageUpload
