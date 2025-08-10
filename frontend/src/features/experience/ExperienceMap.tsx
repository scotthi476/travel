import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    useMapEvents,
} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useExperienceContext } from "../../contexts"
import { useCallback, useEffect } from "react"
import Button from "../../components/ui/Button"
import { useNavigate } from "react-router-dom"

const DEFAULT_CORVALLIS_COORD: [number, number] = [44.564568, -123.262047]

interface Props {
    isCreateMode: boolean
    onMapClick?: (lat: number, lng: number) => void
    tempMarkerPosition?: [number, number] | null
    onBoundsChange?: (bounds: {
        north: number
        south: number
        east: number
        west: number
    }) => void
}

const ExperienceMap = ({
    isCreateMode = false,
    onMapClick,
    tempMarkerPosition,
    onBoundsChange,
}: Props) => {
    const { items: experiences, loadItems, loaded } = useExperienceContext()

    const navigate = useNavigate()

    // If not items not loaded yet, call loadItems()
    useEffect(() => {
        if (!loaded) loadItems()
    }, [experiences])

    // Helper function to safely parse coordinates
    const parseCoordinate = (
        coord: string | number | undefined
    ): number | null => {
        if (coord === undefined || coord === null || coord === "") return null
        const parsed =
            typeof coord === "number" ? coord : parseFloat(coord.toString())
        return isNaN(parsed) ? null : parsed
    }

    // Filter experiences with valid coordinates and take first 10
    const validExperiences = experiences
        .filter((exp) => {
            const lat = parseCoordinate(exp.latitude)
            const lng = parseCoordinate(exp.longitude)
            return lat !== null && lng !== null
        })
        .slice(0, 10)

    // Calculate center from experiences, fallback to Corvallis coordinates
    const calcCenter = (
        experiences: typeof validExperiences
    ): [number, number] => {
        if (experiences.length === 0) {
            return DEFAULT_CORVALLIS_COORD
        }

        const avgLat =
            experiences.reduce((sum, exp) => {
                const lat = parseCoordinate(exp.latitude)
                return sum + (lat || 0)
            }, 0) / experiences.length

        const avgLng =
            experiences.reduce((sum, exp) => {
                const lng = parseCoordinate(exp.longitude)
                return sum + (lng || 0)
            }, 0) / experiences.length

        return [avgLat, avgLng]
    }

    const center = calcCenter(validExperiences)

    // Map click handler component - following React-Leaflet docs
    // Reference: https://react-leaflet.js.org/docs/api-map/#usemapevents
    const MapClickHandler = () => {
        useMapEvents({
            click: (e) => {
                if (isCreateMode && onMapClick) {
                    const { lat, lng } = e.latlng
                    onMapClick(lat, lng)
                }
            },
        })
        return null // This component doesn't render anything
    }

    // Map bounds handler - reports bounds changes to parent
    const MapBoundsHandler = (): null => {
        const map = useMap()

        const handleBoundsChange = useCallback(() => {
            if (onBoundsChange) {
                const bounds = map.getBounds()
                onBoundsChange({
                    north: bounds.getNorth(),
                    south: bounds.getSouth(),
                    east: bounds.getEast(),
                    west: bounds.getWest(),
                })
            }
        }, [onBoundsChange, map])

        useMapEvents({
            moveend: handleBoundsChange,
            zoomend: handleBoundsChange,
            click: (e) => {
                if (isCreateMode && onMapClick) {
                    const { lat, lng } = e.latlng
                    onMapClick(lat, lng)
                }
            },
        })

        return null
    }

    return (
        <div className="h-96 w-full">
            {/* MapContainer */}
            {/* Reference: https://react-leaflet.js.org/docs/api-map/ */}
            <MapContainer
                key={`${center[0]}-${center[1]}`} // Force rerender with new center
                center={center}
                zoom={13}
                scrollWheelZoom={true}
                style={{
                    height: "100%",
                    width: "100%",
                    cursor: isCreateMode ? "crosshair" : "grab",
                }}
                className="rounded-lg"
            >
                {/* TileLayer for map tiles */}
                {/* Reference: https://leafletjs.com/reference.html#tilelayer */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Map click handler - following useMapEvents documentation */}
                {/* Reference: https://react-leaflet.js.org/docs/api-map/#usemapevents */}
                <MapClickHandler />
                {/* Map bounds and click handler */}
                <MapBoundsHandler />
                {/* Marker components for each experience */}
                {/* Reference: https://react-leaflet.js.org/docs/api-components/#marker */}
                {experiences
                    .map((experience) => {
                        const lat = parseCoordinate(experience.latitude)
                        const lng = parseCoordinate(experience.longitude)
                        const ratingAverage = experience.ratingAverage || null

                        // If either coordinates are invalid, set null
                        if (lat === null || lng === null) return null

                        return (
                            <Marker key={experience.id} position={[lat, lng]}>
                                {/* Popup component - shows when marker is clicked */}
                                {/* Reference: https://react-leaflet.js.org/docs/api-components/#popup */}
                                <Popup>
                                    <div className="max-w-48">
                                        <div className="font-semibold text-sm mb-1">
                                            {experience.title}
                                        </div>
                                        <p className="text-xs text-gray-600 mb-2">
                                            {experience.description?.slice(
                                                0,
                                                100
                                            )}
                                            ...
                                        </p>
                                        <div className="flex items-center gap-1 mb-2">
                                            {ratingAverage &&
                                            ratingAverage > 0 ? (
                                                <div className="flex gap-2">
                                                    <span className="text-yellow-500 text-xs">
                                                        {"★".repeat(
                                                            ratingAverage
                                                        )}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        Average Rating
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-gray-500">
                                                    No Ratings Yet
                                                </span>
                                            )}
                                        </div>
                                        <Button
                                            onClick={() =>
                                                navigate(
                                                    `/experience/view/${experience.id}`
                                                )
                                            }
                                            variant="primary"
                                        >
                                            View
                                        </Button>
                                    </div>
                                </Popup>
                            </Marker>
                        )
                    })
                    .filter(Boolean)}{" "}
                {/* Remove any null markers */}
                {/* Show temporary marker at clicked position */}
                {isCreateMode && tempMarkerPosition && (
                    <Marker position={tempMarkerPosition}>
                        <Popup>
                            <div className="text-center">
                                <p className="text-sm font-medium">
                                    New Experience Location
                                </p>
                                <p className="text-xs text-gray-600">
                                    {tempMarkerPosition[0].toFixed(4)},{" "}
                                    {tempMarkerPosition[1].toFixed(4)}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    )
}

export default ExperienceMap
