const { Pool } = require("pg")

// Database configuration
const dbConfig = {
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "travel_app",
    password: process.env.DB_PASSWORD || "password123",
    port: process.env.DB_PORT || 5432,
}

// Only use CONNECTION_STRING if it's explicitly set and valid
if (process.env.DATABASE_URL && process.env.DATABASE_URL.trim() !== "") {
    dbConfig.connectionString = process.env.DATABASE_URL
    dbConfig.ssl = { rejectUnauthorized: false }
}

// Create connection pool
const pool = new Pool(dbConfig)

// Test connection
pool.on("connect", () => {
    console.log("Connected to PostgreSQL database")
})

pool.on("error", (err) => {
    console.error("Database connection error:", err)
})

module.exports = pool
