/**
 * Geocoding reference - https://nominatim.org/release-docs/latest/api/Search/
 * />
 */

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../ui/Button"
import TextInput from "../ui/TextInput"

interface Coordinates {
    lat: number
    lng: number
}

const SearchBar = () => {
    // Local state
    const [searchText, setSearchText] = useState("")
    const [address, setAddress] = useState("")
    const [loading, setLoading] = useState(false)

    // Default radius search
    const DEFAULT_SEARCH_RADIUS_MILES = 25

    const navigate = useNavigate()

    const geocodeAddress = async (
        address: string
    ): Promise<Coordinates | null> => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    address
                )}&limit=1`
            )
            const data = await response.json()

            if (data && data.length > 0) {
                return {
                    lat: parseFloat(data[0].lat),
                    lng: parseFloat(data[0].lon),
                }
            }
            return null
        } catch (error) {
            console.error("Geocoding failed:", error)
            return null
        }
    }

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!searchText.trim() && !address.trim()) return

        setLoading(true)
        try {
            const params = new URLSearchParams()

            if (searchText.trim()) {
                params.append("q", searchText.trim())
            }

            // Handle location search
            let coordinates: Coordinates | null = null
            if (address.trim()) {
                coordinates = await geocodeAddress(address.trim())

                if (coordinates) {
                    params.append("lat", coordinates.lat.toString())
                    params.append("lng", coordinates.lng.toString())
                    params.append(
                        "radius",
                        DEFAULT_SEARCH_RADIUS_MILES.toString()
                    )
                }
            }

            const url = `${import.meta.env.VITE_API_URL}/search?${params}`

            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            navigate("/search", {
                state: {
                    results: data,
                    searchText: searchText.trim(),
                    address: address.trim(),
                    coordinates,
                },
            })
        } catch (error) {
            console.error("Search failed:", error)
        } finally {
            setLoading(false)
            setSearchText("")
            setAddress("")
        }
    }

    return (
        <form onSubmit={handleSearch} className="flex items-center gap-2">
            {/* Search Text Input */}
            <div className="flex-3/5">
                <TextInput
                    id="search"
                    label=""
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    type="text"
                    placeholder="What are you looking for?"
                    disabled={loading}
                />
            </div>

            {/*Location Input */}
            <div className="flex-2/5">
                <TextInput
                    id="location"
                    label=""
                    value={address}
                    onChange={(e) => {
                        setAddress(e.target.value)
                    }}
                    type="text"
                    placeholder="Address or City"
                    disabled={loading}
                />
            </div>

            {/* Search Button */}
            <Button
                type="submit"
                disabled={loading || (!searchText.trim() && !address.trim())}
            >
                Search
            </Button>
        </form>
    )
}

export default SearchBar
