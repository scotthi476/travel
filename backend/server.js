//Reference https://www.youtube.com/watch?v=NMnKGHgw8aM Run your React app on Google Cloud

const express = require("express")
const cors = require("cors")
require("dotenv").config()

// Import routes
const experienceRoutes = require("./routes/experienceRoutes")
const tripRoutes = require("./routes/tripRoutes")
const searchRoutes = require("./routes/searchRoutes")
const ratingRoutes = require("./routes/ratingRoutes")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is running" })
})

// Routes
app.use("/api/experiences", experienceRoutes)
app.use("/api/trips", tripRoutes)
app.use("/api/search", searchRoutes)
app.use("/api", ratingRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err)
    res.status(500).json({ error: "Internal server error" })
})

const port = process.env.PORT || 10000

app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`)
})
