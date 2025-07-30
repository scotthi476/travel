//Reference https://www.youtube.com/watch?v=NMnKGHgw8aM Run your React app on Google Cloud

const express = require("express")
const cors = require("cors")
require("dotenv").config()
// Import routes
const experienceRoutes = require("./routes/experienceRoutes")
const tripRoutes = require("./routes/tripRoutes")

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

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err)
    res.status(500).json({ error: "Internal server error" })
})

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log(`Using port ${port}`)
})
