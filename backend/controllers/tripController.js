const pool = require("../config/database")

const tripController = {
    // GET /api/trips
    getAllTrips: async (req, res) => {
        try {
            const result = await pool.query(`
                SELECT 
                    trip_id as id,
                    user_id,
                    title,
                    created_at,
                    updated_at
                FROM trips 
                ORDER BY created_at DESC
            `)
            res.json(result.rows)
        } catch (error) {
            console.error("Error fetching trips:", error)
            res.status(500).json({ error: "Failed to fetch trips" })
        }
    },

    // GET /api/trips/:id
    getTripById: async (req, res) => {
        try {
            const { id } = req.params
            const result = await pool.query(
                `
                SELECT 
                    trip_id as id,
                    user_id,
                    title,
                    created_at,
                    updated_at
                FROM trips 
                WHERE trip_id = $1
            `,
                [id]
            )
            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Trip not found" })
            }
            res.json(result.rows[0])
        } catch (error) {
            console.error("Error fetching trip:", error)
            res.status(500).json({ error: "Failed to fetch trip" })
        }
    },

    // POST /api/trips
    createTrip: async (req, res) => {
        try {
            const {
                user_id = 1, // Default to user 1 for now
                title,
            } = req.body
            if (!title) {
                return res.status(400).json({ error: "Title is required" })
            }
            const result = await pool.query(
                `
                INSERT INTO trips (user_id, title) 
                VALUES ($1, $2)
                RETURNING 
                    trip_id as id,
                    user_id,
                    title,
                    created_at,
                    updated_at
            `,
                [user_id, title]
            )
            res.status(201).json(result.rows[0])
        } catch (error) {
            console.error("Error creating trip:", error)
            res.status(500).json({ error: "Failed to create trip" })
        }
    },

    // PUT /api/trips/:id
    updateTrip: async (req, res) => {
        try {
            const { id } = req.params
            const { title } = req.body
            if (!title) {
                return res.status(400).json({ error: "Title is required" })
            }
            const result = await pool.query(
                `
                UPDATE trips 
                SET 
                    title = $1,
                    updated_at = CURRENT_TIMESTAMP
                WHERE trip_id = $2
                RETURNING 
                    trip_id as id,
                    user_id,
                    title,
                    created_at,
                    updated_at
            `,
                [title, id]
            )
            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Trip not found" })
            }
            res.json(result.rows[0])
        } catch (error) {
            console.error("Error updating trip:", error)
            res.status(500).json({ error: "Failed to update trip" })
        }
    },

    // DELETE /api/trips/:id
    deleteTrip: async (req, res) => {
        try {
            const { id } = req.params
            const result = await pool.query(
                "DELETE FROM trips WHERE trip_id = $1 RETURNING trip_id",
                [id]
            )
            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Trip not found" })
            }
            res.json({ message: "Trip deleted successfully" })
        } catch (error) {
            console.error("Error deleting trip:", error)
            res.status(500).json({ error: "Failed to delete trip" })
        }
    },
}

module.exports = tripController
