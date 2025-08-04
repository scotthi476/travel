const pool = require("../config/database")

const experienceController = {
    // GET /api/experiences
    getAllExperiences: async (req, res) => {
        try {
            const result = await pool.query(`
                SELECT 
                    id,
                    created_by as "createdBy",
                    title,
                    description,
                    date,
                    image_url as "imageUrl",
                    latitude,
                    longitude,
                    rating,
                    keywords,
                    is_public as "isPublic",
                    rating_average as "ratingAverage",
                    created_at as "createdAt",
                    updated_at as "updatedAt"
                FROM experiences 
                ORDER BY created_at DESC
            `)
            res.json(result.rows)
        } catch (error) {
            console.error("Error fetching experiences:", error)
            res.status(500).json({ error: "Failed to fetch experiences" })
        }
    },

    // GET /api/experiences/:id
    getExperienceById: async (req, res) => {
        try {
            const { id } = req.params
            const result = await pool.query(
                `
                SELECT 
                    id,
                    created_by as "createdBy",
                    title,
                    description,
                    date,
                    image_url as "imageUrl",
                    latitude,
                    longitude,
                    rating,
                    keywords,
                    is_public as "isPublic",
                    rating_average as "ratingAverage",
                    created_at as "createdAt",
                    updated_at as "updatedAt"
                FROM experiences 
                WHERE id = $1
            `,
                [id]
            )
            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Experience not found" })
            }
            res.json(result.rows[0])
        } catch (error) {
            console.error("Error fetching experience:", error)
            res.status(500).json({ error: "Failed to fetch experience" })
        }
    },

    // POST /api/experiences
    createExperience: async (req, res) => {
        try {
            const {
                createdBy,
                title,
                description,
                date,
                imageUrl,
                latitude,
                longitude,
                rating,
                keywords = [],
                isPublic = true,
            } = req.body

            // Handle empty date string - convert to null for database
            const experienceDate = date && date.trim() !== "" ? date : null

            const result = await pool.query(
                `
                INSERT INTO experiences (
                    created_by, title, description, date, 
                    image_url, latitude, longitude, rating, keywords, is_public
                ) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING 
                    id,
                    created_by as "createdBy",
                    title,
                    description,
                    date,
                    image_url as "imageUrl",
                    latitude,
                    longitude,
                    rating,
                    keywords,
                    is_public as "isPublic",
                    rating_average as "ratingAverage",
                    created_at as "createdAt",
                    updated_at as "updatedAt"
            `,
                [
                    createdBy,
                    title,
                    description,
                    experienceDate,
                    imageUrl,
                    latitude,
                    longitude,
                    rating,
                    JSON.stringify(keywords),
                    isPublic,
                ]
            )
            res.status(201).json(result.rows[0])
        } catch (error) {
            console.error("Error creating experience:", error)
            res.status(500).json({ error: "Failed to create experience" })
        }
    },

    // PUT /api/experiences/:id
    updateExperience: async (req, res) => {
        try {
            const { id } = req.params
            const {
                title,
                description,
                date,
                imageUrl,
                latitude,
                longitude,
                rating,
                keywords = [],
                isPublic = true,
            } = req.body

            // Handle empty date string - convert to null for database
            const experienceDate = date && date.trim() !== "" ? date : null

            const result = await pool.query(
                `
                UPDATE experiences 
                SET 
                    title = $1,
                    description = $2,
                    date = $3,
                    image_url = $4,
                    latitude = $5,
                    longitude = $6,
                    rating = $7,
                    keywords = $8,
                    is_public = $9,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $10
                RETURNING 
                    id,
                    created_by as "createdBy",
                    title,
                    description,
                    date,
                    image_url as "imageUrl",
                    latitude,
                    longitude,
                    rating,
                    keywords,
                    is_public as "isPublic",
                    rating_average as "ratingAverage",
                    created_at as "createdAt",
                    updated_at as "updatedAt"
            `,
                [
                    title,
                    description,
                    experienceDate,
                    imageUrl,
                    latitude,
                    longitude,
                    rating,
                    JSON.stringify(keywords),
                    isPublic,
                    id,
                ]
            )
            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Experience not found" })
            }
            res.json(result.rows[0])
        } catch (error) {
            console.error("Error updating experience:", error)
            res.status(500).json({ error: "Failed to update experience" })
        }
    },

    // DELETE /api/experiences/:id
    deleteExperience: async (req, res) => {
        try {
            const { id } = req.params
            const result = await pool.query(
                "DELETE FROM experiences WHERE id = $1 RETURNING id",
                [id]
            )
            if (result.rows.length === 0) {
                return res.status(404).json({ error: "Experience not found" })
            }
            res.json({ message: "Experience deleted successfully" })
        } catch (error) {
            console.error("Error deleting experience:", error)
            res.status(500).json({ error: "Failed to delete experience" })
        }
    },
}

module.exports = experienceController
