/**
 * Reusable geo coordinate input for latitude and longitude.
 * Allows clearing fields, supports grouped label, and includes a map interaction placeholder.
 *
 * Example:
 * <GeoInput
 *   lat={location?.lat}
 *   lng={location?.lng}
 *   onChange={(lat, lng) => setLocation({ lat, lng })}
 *   helperText="Use decimal degrees. Drag-and-drop map coming soon."
 * />
 */

import TextInput from "./TextInput"

type Props = {
    // Optional latitude value (can be cleared)
    lat?: number | null
    // Optional longitude value (can be cleared)
    lng?: number | null
    // Change handler for both coordinates
    onChange: (lat: number | null, lng: number | null) => void
    // Label for the grouped section
    label?: string
    // Optional helper text
    helperText?: string
    // Optional error message
    error?: string
    // Optional to disable both fields
    disabled?: boolean
}

const GeoInput = ({
    lat,
    lng,
    onChange,
    label = "Location (Latitude / Longitude)",
    helperText,
    error,
    disabled = false,
}: Props) => {
    // Convert user input to number or null if blank/invalid
    const parseOrNull = (value: string): number | null => {
        const trimmed = value.trim()
        if (trimmed === "") return null
        const parsed = parseFloat(trimmed)
        if (isNaN(parsed)) return null
        // Truncation to 8 decimal places to fit database
        return Math.round(parsed * 100000000) / 100000000
    }
    return (
        <div>
            <label className="block font-medium mb-1">{label}</label>

            <div className="grid grid-cols-2 gap-4">
                <TextInput
                    id="lat"
                    label="Latitude"
                    type="number"
                    value={lat?.toString() ?? ""}
                    onChange={(e) =>
                        onChange(parseOrNull(e.target.value), lng ?? null)
                    }
                    placeholder="e.g. 37.7749"
                    disabled={disabled}
                />
                <TextInput
                    id="lng"
                    label="Longitude"
                    type="number"
                    value={lng?.toString() ?? ""}
                    onChange={(e) =>
                        onChange(lat ?? null, parseOrNull(e.target.value))
                    }
                    placeholder="e.g. -122.4194"
                    disabled={disabled}
                />
            </div>

            {helperText && !error && (
                <p className="text-sm text-zinc-500 mt-1">{helperText}</p>
            )}
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}

            {/* Placeholder for future map pin interaction */}
            <div className="mt-4 p-4 bg-zinc-100 border border-zinc-300 rounded text-sm text-zinc-600 text-center">
                Drag-and-drop map support coming soon...
            </div>
        </div>
    )
}

export default GeoInput
