// Create a temporary file: backend/test-db.js
const pool = require("./config/database")

async function testConnection() {
    try {
        console.log("Testing database connection...")
        const result = await pool.query("SELECT NOW()")
        console.log("✅ Database connected successfully:", result.rows[0])

        const users = await pool.query("SELECT * FROM users")
        console.log("✅ Users table accessible:", users.rows)

        process.exit(0)
    } catch (error) {
        console.error("❌ Database connection failed:", error)
        process.exit(1)
    }
}

testConnection()
