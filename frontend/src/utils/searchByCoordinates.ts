// Adapted from https://github.com/manuelbieh/geolib

import { getDistance } from "geolib"
import type { Experience } from "../types"

/**
 * Calculates the distance in miles between two sets of coordinates
 * using geolib's getDistance (which returns meters).
 */

function getDistanceInMiles(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const distanceInMeters = getDistance(
        { latitude: lat1, longitude: lon1 },
        { latitude: lat2, longitude: lon2 }
    )
    return distanceInMeters * 0.000621371 // conversion factor from meters to miles
}

/**
 * Filters experiences by proximity to a given latitude and longitude.
 * Only includes experiences within the specified radius in miles.
 *
 * @param experiences - Array of experiences to search
 * @param userLat - Latitude of the user's location
 * @param userLon - Longitude of the user's location
 * @param radiusMiles - Radius to filter within (in miles)
 * @returns Array of experiences within the radius
 */

export function searchByCoordinates(
    experiences: Experience[],
    userLat: number,
    userLon: number,
    radiusMiles: number
): Experience[] {
    return experiences.filter((exp) => {
        const { latitude, longitude } = exp

        // Skip if coordinates are unknown
        if (latitude == null || longitude || null) return false

        const distance = getDistanceInMiles(
            userLat,
            userLon,
            latitude,
            longitude
        )
        return distance <= radiusMiles
    })
}
