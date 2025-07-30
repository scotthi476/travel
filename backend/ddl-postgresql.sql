-- PostgreSQL DDL for Travel App
-- Drop tables in correct order (dependencies first)
DROP TABLE IF EXISTS trip_experiences CASCADE;
DROP TABLE IF EXISTS ratings CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS trips CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trips table
CREATE TABLE trips (
    trip_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Experiences table
CREATE TABLE experiences (
    experience_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    experience_date DATE,
    image_url VARCHAR(500) NOT NULL,
    latitude DECIMAL(12, 8) NOT NULL,   -- Increased precision for latitude
    longitude DECIMAL(12, 8) NOT NULL,  -- Increased precision for longitude
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    keywords JSONB DEFAULT '[]',
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Junction table for trips and experiences
CREATE TABLE trip_experiences (
    trip_exp_id SERIAL PRIMARY KEY,
    trip_id INTEGER NOT NULL,
    experience_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id) ON DELETE CASCADE,
    FOREIGN KEY (experience_id) REFERENCES experiences(experience_id) ON DELETE CASCADE,
    UNIQUE(trip_id, experience_id)
);

-- Ratings table (if needed for future use)
CREATE TABLE ratings (
    rating_id SERIAL PRIMARY KEY,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (username, first_name, last_name, email, user_password)
VALUES ('user1', 'test', 'user', 'test@gmail.com', 'testing123');

INSERT INTO trips (user_id, title)
VALUES 
    (1, 'California Trip'),
    (1, 'New York Trip'), 
    (1, 'Hawaii Trip'), 
    (1, 'Tokyo Trip');

INSERT INTO experiences (user_id, title, description, experience_date, image_url, latitude, longitude, rating, keywords, is_public)
VALUES 
    (1, 'Hike the Lost Coast', 'Remote trail through California wilderness.', '2025-07-12', 'https://picsum.photos/200', 40.12345678, -124.35678901, 4, '["hiking", "outdoor", "nature"]', true),
    (1, 'Surf Santa Cruz', 'Beginner-friendly surf experience with lessons.', '2025-03-12', 'https://picsum.photos/200', 36.96234567, -122.02345678, 5, '["surfing", "beach", "lessons"]', true),
    (1, 'Wine Tour in Napa', 'Visit 3 boutique wineries with a local guide.', '2023-12-12', 'https://picsum.photos/200', 38.29876543, -122.28123456, 3, '["wine", "tasting", "napa"]', false),
    (1, 'San Francisco Street Art Walk', 'Explore iconic murals and local graffiti culture.', '2024-10-15', 'https://picsum.photos/200', 37.77654321, -122.42987654, 4, '["art", "culture", "walking"]', true);

-- Create indexes for better performance
CREATE INDEX idx_experiences_user_id ON experiences(user_id);
CREATE INDEX idx_trips_user_id ON trips(user_id);
CREATE INDEX idx_experiences_date ON experiences(experience_date);
CREATE INDEX idx_trip_experiences_trip_id ON trip_experiences(trip_id);
CREATE INDEX idx_trip_experiences_experience_id ON trip_experiences(experience_id);-- PostgreSQL DDL for Travel App
-- Drop tables in correct order (dependencies first)
DROP TABLE IF EXISTS trip_experiences CASCADE;
DROP TABLE IF EXISTS ratings CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS trips CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trips table
CREATE TABLE trips (
    trip_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Experiences table
CREATE TABLE experiences (
    experience_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    experience_date DATE,
    image_url VARCHAR(500) NOT NULL,
    latitude DECIMAL(12, 8) NOT NULL,   -- Increased precision for latitude
    longitude DECIMAL(12, 8) NOT NULL,  -- Increased precision for longitude
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    keywords JSONB DEFAULT '[]',
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Junction table for trips and experiences
CREATE TABLE trip_experiences (
    trip_exp_id SERIAL PRIMARY KEY,
    trip_id INTEGER NOT NULL,
    experience_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(trip_id) ON DELETE CASCADE,
    FOREIGN KEY (experience_id) REFERENCES experiences(experience_id) ON DELETE CASCADE,
    UNIQUE(trip_id, experience_id)
);

-- Ratings table (if needed for future use)
CREATE TABLE ratings (
    rating_id SERIAL PRIMARY KEY,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO users (username, first_name, last_name, email, user_password)
VALUES ('user1', 'test', 'user', 'test@gmail.com', 'testing123');

INSERT INTO trips (user_id, title)
VALUES 
    (1, 'California Trip'),
    (1, 'New York Trip'), 
    (1, 'Hawaii Trip'), 
    (1, 'Tokyo Trip');

INSERT INTO experiences (user_id, title, description, experience_date, image_url, latitude, longitude, rating, keywords, is_public)
VALUES 
    (1, 'Hike the Lost Coast', 'Remote trail through California wilderness.', '2025-07-12', 'https://picsum.photos/200', 40.12345678, -124.35678901, 4, '["hiking", "outdoor", "nature"]', true),
    (1, 'Surf Santa Cruz', 'Beginner-friendly surf experience with lessons.', '2025-03-12', 'https://picsum.photos/200', 36.96234567, -122.02345678, 5, '["surfing", "beach", "lessons"]', true),
    (1, 'Wine Tour in Napa', 'Visit 3 boutique wineries with a local guide.', '2023-12-12', 'https://picsum.photos/200', 38.29876543, -122.28123456, 3, '["wine", "tasting", "napa"]', false),
    (1, 'San Francisco Street Art Walk', 'Explore iconic murals and local graffiti culture.', '2024-10-15', 'https://picsum.photos/200', 37.77654321, -122.42987654, 4, '["art", "culture", "walking"]', true);

-- Create indexes for better performance
CREATE INDEX idx_experiences_user_id ON experiences(user_id);
CREATE INDEX idx_trips_user_id ON trips(user_id);
CREATE INDEX idx_experiences_date ON experiences(experience_date);
CREATE INDEX idx_trip_experiences_trip_id ON trip_experiences(trip_id);
CREATE INDEX idx_trip_experiences_experience_id ON trip_experiences(experience_id);