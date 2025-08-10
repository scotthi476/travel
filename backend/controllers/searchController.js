const pool = require("../config/database")

const searchController = {
    // GET /api/search
    searchExperiences: async (req, res) => {
        try {
            const { q, lat, lng, radius = 50 } = req.query

            let params = []
            let paramCount = 1

            // Start with base query - only add distance calculation if we have coordinates
            let query = `SELECT *, image_url as "imageUrl"` // alias due to mismatch of variable name

            // Add distance calculation only if lat/lng provided
            if (lat && lng) {
                /**
                 * Haversine Formula Implementation (following GeeksforGeeks approach)
                 * Reference: https://www.geeksforgeeks.org/dsa/haversine-formula-to-find-distance-between-two-points-on-a-sphere/
                 *
                 * Formula: d = 2r * asin(√(sin²(Δφ/2) + cos(φ1) * cos(φ2) * sin²(Δλ/2)))
                 *
                 * Steps:
                 * 1. Calculate differences in latitude and longitude (dLat, dLon)
                 * 2. Convert all coordinates to radians
                 * 3. Apply the haversine formula:
                 *    a = sin²(dLat/2) + sin²(dLon/2) * cos(lat1) * cos(lat2)
                 * 4. Calculate c = 2 * asin(√a)
                 * 5. Distance = radius * c
                 *
                 * Using 3959 miles (instead of 6371 km as in GeeksforGeeks example)
                 */
                query += `, ROUND(
                    (3959 * 2 * asin(sqrt(
                        power(sin(radians(($${paramCount}) - latitude) / 2), 2) +
                        power(sin(radians(($${
                            paramCount + 1
                        }) - longitude) / 2), 2) *
                        cos(radians($${paramCount})) * cos(radians(latitude))
                    )))::numeric, 2
                ) as "distanceMiles"`
                params.push(parseFloat(lat), parseFloat(lng))
                paramCount += 2
            } else {
                query += `, NULL as "distanceMiles"`
            }

            query += ` FROM experiences WHERE 1=1`

            // Add text search - case-insensitive partial matching
            if (q && q.trim()) {
                query += ` AND (title ILIKE $${paramCount} OR description ILIKE $${paramCount})`
                params.push(`%${q.trim()}%`)
                paramCount++
            }

            // Add location filter if coordinates provided
            if (lat && lng) {
                /**
                 * Location-based filtering using the same GeeksforGeeks Haversine implementation
                 * Only returns experiences within the specified radius (in miles)
                 *
                 * Breaking down the formula:
                 * - dLat = (lat2 - lat1) converted to radians
                 * - dLon = (lon2 - lon1) converted to radians
                 * - a = sin²(dLat/2) + sin²(dLon/2) * cos(lat1) * cos(lat2)
                 * - c = 2 * asin(√a)
                 * - distance = radius * c
                 */
                query += ` 
                    AND latitude IS NOT NULL 
                    AND longitude IS NOT NULL
                    AND (
                        3959 * 2 * asin(sqrt(
                            power(sin(radians(($${paramCount}) - latitude) / 2), 2) +
                            power(sin(radians(($${
                                paramCount + 1
                            }) - longitude) / 2), 2) *
                            cos(radians($${paramCount})) * cos(radians(latitude))
                        ))
                    ) <= $${paramCount + 2}
                `
                params.push(
                    parseFloat(lat),
                    parseFloat(lng),
                    parseFloat(radius)
                )
                paramCount += 3
            }

            // Order by distance (closest first), then by ID for consistent results
            // NULLS LAST ensures experiences without coordinates appear at the end
            query += ` ORDER BY "distanceMiles" NULLS LAST, id LIMIT 50`

            const result = await pool.query(query, params)
            res.json(result.rows)
        } catch (error) {
            console.error("Error searching experiences:", error)
            res.status(500).json({ error: "Failed to search experiences" })
        }
    },
}

module.exports = searchController
