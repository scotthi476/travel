const express = require("express")
const router = express.Router()
const experienceController = require("../controllers/experienceController")

// GET /api/experiences - Get all experiences
router.get("/", experienceController.getAllExperiences)

// GET /api/experiences/:id - Get single experience
router.get("/:id", experienceController.getExperienceById)

// POST /api/experiences - Create new experience
router.post("/", experienceController.createExperience)

// PUT /api/experiences/:id - Update experience
router.put("/:id", experienceController.updateExperience)

// DELETE /api/experiences/:id - Delete experience
router.delete("/:id", experienceController.deleteExperience)

module.exports = router
