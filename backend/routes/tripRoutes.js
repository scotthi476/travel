const express = require("express")
const router = express.Router()
const tripController = require("../controllers/tripController")

// GET /api/trips - Get all trips
router.get("/", tripController.getAllTrips)

// GET /api/trips/:id - Get single trip
router.get("/:id", tripController.getTripById)

// POST /api/trips - Create new trip
router.post("/", tripController.createTrip)

// PUT /api/trips/:id - Update trip
router.put("/:id", tripController.updateTrip)

// DELETE /api/trips/:id - Delete trip
router.delete("/:id", tripController.deleteTrip)

module.exports = router
