const pool = require("../config/database")

const ratingController = {
    // POST /api/experiences/:id/rate
    rateExperience: async (req, res) => {
        try {
            const { rating, createdBy } = req.body
            const { id } = req.params

            // Rating validation
            if (!rating || rating < 1 || rating > 5) {
                return res
                    .status(400)
                    .json({ error: "Rating must be between 1 and 5" })
            }

            // Check if experience exists and user isn't the owner
            const experienceResult = await pool.query(
                "SELECT created_by FROM experiences WHERE id = $1",
                [id]
            )

            if (experienceResult.rows.length === 0) {
                return res.status(404).json({ error: "Experience not found" })
            }

            // Insert rating (use unique constraint to prevent duplicates)
            await pool.query(
                `INSERT INTO experience_ratings (created_by, experience_id, rating) 
                VALUES ($1, $2, $3)`,
                [createdBy, id, rating]
            )

            // Calculate new average and count
            const statsResult = await pool.query(
                `SELECT AVG(rating) as avg_rating, COUNT(*) as count 
                FROM experience_ratings WHERE experience_id = $1`,
                [id]
            )

            const { avg_rating, count } = statsResult.rows[0]

            // Update experience with new community rating
            await pool.query(
                `UPDATE experiences 
                SET rating_average = $1, community_rating_count = $2, updated_at = CURRENT_TIMESTAMP
                WHERE id = $3`,
                [parseFloat(avg_rating).toFixed(2), count, id]
            )

            res.json({ success: true })
        } catch (error) {
            console.error("Error rating experience:", error)
            res.status(500).json({ error: "Failed to save rating" })
        }
    },
}

module.exports = ratingController
