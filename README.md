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

# Setup schema (replace with your actual project path)
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

-   Frontend: Open in browser at indicated localhost
-   Backend health: http://localhost:3001/health
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
lsof -i :3001  # Check what's using port 3001
```

**Can't connect to database:**

-   Check `.env` has `DB_PASSWORD=password123`
-   Try: `psql -U postgres -d travel_app`

---

## Project Structure

```
travel-app/
├── backend/          # Express API + PostgreSQL
│   ├── .env.example  # Copy to .env
│   └── ddl-postgresql.sql       # Database schema
└── frontend/         # React + Vite
    └── .env.example  # Copy to .env
```
