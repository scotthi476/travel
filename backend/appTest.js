//Adding to run the test
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


module.exports = app;
