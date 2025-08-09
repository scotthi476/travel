import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import ExperienceGrid from "../features/experience/ExperienceGrid"
import type { Experience } from "../types"
import Button from "../components/ui/Button"

interface Coordinates {
    lat: number
    lng: number
}

interface LocationState {
    results: Experience[]
    searchText: string
    address: string
    coordinates?: Coordinates
}

const SearchResultsPage = () => {
    const location = useLocation()
    const [searchResults, setSearchResults] = useState<Experience[]>([])
    const [searchText, setSearchText] = useState("")
    const [searchAddress, setSearchAddress] = useState("")
    const [_coordinates, setCoordinates] = useState<Coordinates | null>(null)
    const [loading, _setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const state = location.state as LocationState
        if (state?.results) {
            setSearchResults(state.results)
            setSearchText(state.searchText || "")
            setSearchAddress(state.address || "")
            setCoordinates(state.coordinates || null)
        }
    }, [location.state])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="text-lg text-gray-600">Searching...</span>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold mb-4">Search Results</h2>
                {searchText && searchAddress && (
                    <div className="space-y-1">
                        <div className=" text-gray-500">
                            Searching for:{" "}
                            <strong className="text-gray-900">
                                "{searchText}"
                            </strong>
                        </div>
                        <div className="text-gray-500 mb-2">
                            Near:{" "}
                            <strong className="text-gray-900">
                                "{searchAddress}"
                            </strong>
                        </div>
                        <div className="text-gray-500 mb-2">
                            Found {searchResults.length} Result(s)
                        </div>
                        <Button onClick={() => navigate("/")} variant="cancel">
                            Go Back
                        </Button>
                    </div>
                )}
            </div>
            {/* Results */}
            <div className="mt-10">
                {searchResults.length === 0 ? (
                    <h3 className="text-lg font-medium text-gray-900">
                        No experiences found
                    </h3>
                ) : (
                    <ExperienceGrid experiences={searchResults} />
                )}
            </div>
        </div>
    )
}

export default SearchResultsPage
