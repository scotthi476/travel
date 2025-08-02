const pool = require("../config/database")

const tripController = {
    // GET /api/trips
    getAllTrips: async (req, res) => {
        try {
            const result = await pool.query(`
                SELECT 
                    id,
                    created_by as "createdBy",
                    title,
                    collaborators,
                    experiences,
                    created_at as "createdAt",
                    updated_at as "updatedAt"
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
                    id,
                    created_by as "createdBy",
                    title,
                    collaborators,
                    experiences,
                    created_at as "createdAt",
                    updated_at as "updatedAt"
                FROM trips 
                WHERE id = $1
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
                createdBy,
                title,
                collaborators = [],
                experiences = [],
            } = req.body
            if (!title) {
                return res.status(400).json({ error: "Title is required" })
            }
            const result = await pool.query(
                `
                    INSERT INTO trips (created_by, title, collaborators, experiences) 
                    VALUES ($1, $2, $3, $4)
                    RETURNING 
                    id,
                    created_by as "createdBy",
                    title,
                    collaborators,
                    experiences,
                    created_at as "createdAt",
                    updated_at as "updatedAt"
            `,
                [
                    createdBy,
                    title,
                    JSON.stringify(collaborators),
                    JSON.stringify(experiences),
                ]
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
            const { title, collaborators, experiences } = req.body

            // Build dynamic update query based on provided fields
            let updateFields = []
            let values = []
            let paramCount = 0

            if (title !== undefined) {
                paramCount++
                updateFields.push(`title = $${paramCount}`)
                values.push(title)
            }

            if (collaborators !== undefined) {
                paramCount++
                updateFields.push(`collaborators = $${paramCount}`)
                values.push(JSON.stringify(collaborators))
            }

            if (experiences !== undefined) {
                paramCount++
                updateFields.push(`experiences = $${paramCount}`)
                values.push(JSON.stringify(experiences))
            }

            // Add updated_at timestamp
            updateFields.push("updated_at = CURRENT_TIMESTAMP")

            // Add the ID parameter
            paramCount++
            values.push(id)

            const result = await pool.query(
                `
            UPDATE trips 
            SET ${updateFields.join(", ")}
            WHERE id = $${paramCount}
            RETURNING 
                id,
                created_by as "createdBy",
                title,
                collaborators,
                experiences,
                created_at as "createdAt",
                updated_at as "updatedAt"
        `,
                values
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
                "DELETE FROM trips WHERE id = $1 RETURNING id",
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
