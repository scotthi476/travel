const express = require("express")
const router = express.Router()
const ratingController = require("../controllers/ratingController")

// POST /api/experiences/:id/rate
router.post("/experiences/:id/rate", ratingController.rateExperience)

module.exports = router
