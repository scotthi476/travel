const express = require("express")
const router = express.Router()
const searchController = require("../controllers/searchController")

// GET /api/search - Search experiences
router.get("/", searchController.searchExperiences)

module.exports = router
