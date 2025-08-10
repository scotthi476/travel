# travel

Team Project

## Travel App - Local Dev Quick Setup

### 1. Install Prerequisites

-   **Node.js**: Download from https://nodejs.org/ (v18+)
-   **PostgreSQL**: `brew install postgresql@15` (Mac) or download from https://www.postgresql.org/

### 2. Database Setup

```bash
# Start PostgreSQL
brew services start postgresql

# Create database
psql -d postgres -c "CREATE USER postgres WITH SUPERUSER PASSWORD 'password123';"
psql -d postgres -c "CREATE DATABASE travel_app;"

# Setup schema with seed data (replace with your actual project path)
psql -U postgres -d travel_app -f /full/path/to/your/travel-app/backend/ddl-postgresql.sql

# Example paths:
# psql -U postgres -d travel_app -f ~/Documents/travel-app/backend/ddl-postgresql.sql
# psql -U postgres -d travel_app -f /Users/yourname/Desktop/travel-app/backend/ddl-postgresql.sql
```

### 3. Backend Setup

```bash
cd backend
npm install
cp .env.example .env  # Use default values
npm run dev
```

### 4. Frontend Setup

```bash
cd frontend  # Use separate terminal
npm install
cp .env.example .env  # Use default values
npm run dev
```

### 5. Test

-   Frontend: http://localhost:5173/
-   Backend health: http://localhost:3001/health
-   Database should have 100 experiences across 5 cities (San Francisco, Portland, Seattle, San Diego, Los Angeles)
-   Try creating an experience

---

## Daily Workflow

```bash
# From project root directory
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev
```

---

## Environment Variables

**Frontend (.env)**:

```bash
# API Configuration
VITE_API_URL=http://localhost:3001

# Environment
VITE_ENV=development
```

**Backend (.env)**: Use default values from .env.example

---

## Troubleshooting

**PostgreSQL not running:**

```bash
brew services start postgresql@15
```

**"Database does not exist":**

```bash
psql -d postgres -c "CREATE DATABASE travel_app;"
```

**Port conflicts:**

```bash
lsof -i :3001  # Check what's using backend port
lsof -i :5173  # Check what's using frontend port
```

**Can't connect to database:**

-   Check `.env` has `DB_PASSWORD=password123`
-   Try: `psql -U postgres -d travel_app`

**Want to reset database with fresh data:**

```bash
psql -U postgres -d travel_app -f backend/ddl-postgresql.sql
```

---

## Project Structure

```
travel-app/
├── backend/          # Express API + PostgreSQL
│   ├── .env.example  # Copy to .env
│   └── ddl-postgresql.sql       # Database schema + seed data
└── frontend/         # React + Vite
    └── .env.example  # Copy to .env
```
