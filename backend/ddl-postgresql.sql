-- PostgreSQL DDL for Travel App (Updated for Firebase Auth + Multiple Users)
-- Drop tables in correct order (dependencies first)
DROP TABLE IF EXISTS trip_experiences CASCADE;
DROP TABLE IF EXISTS experiences CASCADE;
DROP TABLE IF EXISTS trips CASCADE;

-- Note: No users table needed since Firebase Auth handles user management
-- The user_id references will be Firebase UIDs (strings)

-- Experiences table (main content)
CREATE TABLE experiences (
    id SERIAL PRIMARY KEY,
    created_by VARCHAR(255) NOT NULL,  -- Firebase UID
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    date DATE,  -- Optional experience date
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    latitude DECIMAL(12, 8) NOT NULL,
    longitude DECIMAL(12, 8) NOT NULL,
    is_public BOOLEAN DEFAULT true,  -- Changed default to true for discovery
    keywords JSONB DEFAULT '[]',
    rating_average DECIMAL(3, 2),  -- For future community ratings
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trips table
CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    created_by VARCHAR(255) NOT NULL,  -- Firebase UID
    title VARCHAR(255) NOT NULL,
    collaborators JSONB DEFAULT '[]',  -- Array of user IDs who can edit
    experiences JSONB DEFAULT '[]',    -- Array of experience IDs
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Junction table for trips and experiences (alternative to JSONB array)
-- Keep this for more complex queries if needed
CREATE TABLE trip_experiences (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER NOT NULL,
    experience_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
    FOREIGN KEY (experience_id) REFERENCES experiences(id) ON DELETE CASCADE,
    UNIQUE(trip_id, experience_id)
);

-- Insert sample data with multiple users (Firebase UIDs)
-- User 1: Current logged-in user
-- User 2-5: Other users for discovery

INSERT INTO experiences (created_by, title, description, image_url, date, rating, latitude, longitude, is_public, keywords, rating_average)
VALUES 
    -- Current user's experiences
    ('current_user_uid', 'My Golden Gate Bridge Walk', 'Amazing morning walk across the iconic bridge with perfect weather.', 'https://picsum.photos/400/300?random=1', '2024-01-15', 5, 37.8199, -122.4783, true, '["walking", "bridge", "morning", "iconic"]', 4.8),
    ('current_user_uid', 'Alcatraz Island Tour', 'Fascinating prison history and incredible views of the city.', 'https://picsum.photos/400/300?random=2', '2024-01-20', 4, 37.8267, -122.4233, true, '["history", "tour", "prison", "island"]', 4.5),
    ('current_user_uid', 'Private Napa Valley Wine Tasting', 'Exclusive tasting at three boutique wineries with sommelier guide.', 'https://picsum.photos/400/300?random=3', '2024-02-10', 5, 38.2975, -122.2814, false, '["wine", "private", "tasting", "luxury"]', 4.9),
    
    -- Other users' public experiences for discovery
    ('user_2_firebase_uid', 'Epic Yosemite Half Dome Hike', 'Challenging 16-mile hike with cables to the summit. Incredible views!', 'https://picsum.photos/400/300?random=4', '2024-03-05', 5, 37.7459, -119.5332, true, '["hiking", "challenging", "summit", "cables", "yosemite"]', 4.9),
    ('user_2_firebase_uid', 'Sunrise Hot Air Balloon Napa', 'Peaceful sunrise flight over Napa Valley vineyards.', 'https://picsum.photos/400/300?random=5', '2024-03-12', 5, 38.4404, -122.2711, true, '["balloon", "sunrise", "peaceful", "aerial", "napa"]', 4.7),
    
    ('user_3_firebase_uid', 'Big Sur Coastal Drive', 'Breathtaking scenic drive along Highway 1 with multiple stops.', 'https://picsum.photos/400/300?random=6', '2024-02-28', 4, 36.2704, -121.8081, true, '["driving", "coastal", "scenic", "highway1", "stops"]', 4.6),
    ('user_3_firebase_uid', 'Muir Woods Redwood Walk', 'Peaceful walk among ancient giant redwoods just north of SF.', 'https://picsum.photos/400/300?random=7', '2024-03-18', 4, 37.8958, -122.5811, true, '["redwoods", "peaceful", "ancient", "giants", "forest"]', 4.4),
    
    ('user_4_firebase_uid', 'Lake Tahoe Kayaking Adventure', 'Crystal clear waters and mountain views while kayaking.', 'https://picsum.photos/400/300?random=8', '2024-04-02', 5, 39.0968, -120.0324, true, '["kayaking", "lake", "mountains", "crystal", "adventure"]', 4.8),
    ('user_4_firebase_uid', 'Monterey Bay Aquarium Visit', 'World-class marine life exhibits and interactive experiences.', 'https://picsum.photos/400/300?random=9', '2024-04-08', 4, 36.6181, -121.9017, true, '["aquarium", "marine", "interactive", "educational", "family"]', 4.5),
    
    ('user_5_firebase_uid', 'Santa Barbara Wine Country Bike Tour', 'Cycling through vineyards with wine tastings at 4 locations.', 'https://picsum.photos/400/300?random=10', '2024-03-25', 4, 34.6106, -120.0710, true, '["cycling", "wine", "vineyards", "tastings", "tour"]', 4.3),
    ('user_5_firebase_uid', 'Point Reyes Lighthouse Hike', 'Scenic coastal hike to historic lighthouse with whale watching.', 'https://picsum.photos/400/300?random=11', '2024-04-15', 5, 38.0000, -122.9500, true, '["hiking", "lighthouse", "coastal", "whales", "historic"]', 4.7),
    
    -- Additional diverse experiences from various users
    ('user_6_firebase_uid', 'SF Food Truck Festival', 'Amazing variety of gourmet food trucks in Golden Gate Park.', 'https://picsum.photos/400/300?random=12', '2024-04-20', 4, 37.7694, -122.4862, true, '["food", "festival", "trucks", "variety", "park"]', 4.2),
    ('user_7_firebase_uid', 'Sausalito Ferry & Art Walk', 'Scenic ferry ride followed by exploring local art galleries.', 'https://picsum.photos/400/300?random=13', '2024-04-12', 4, 37.8590, -122.4852, true, '["ferry", "art", "galleries", "scenic", "sausalito"]', 4.4),
    ('user_8_firebase_uid', 'Silicon Valley Tech Museum', 'Interactive exhibits showcasing latest technology innovations.', 'https://picsum.photos/400/300?random=14', '2024-04-18', 3, 37.3318, -121.8909, true, '["technology", "museum", "interactive", "innovation", "silicon"]', 4.1),
    ('user_9_firebase_uid', 'Carmel-by-the-Sea Cottage Walk', 'Fairy-tale cottages and charming streets in this artistic town.', 'https://picsum.photos/400/300?random=15', '2024-04-05', 5, 36.5552, -121.9233, true, '["cottages", "charming", "artistic", "fairytale", "carmel"]', 4.6),
    ('user_10_firebase_uid', 'Oakland Street Art Tour', 'Vibrant murals and street art in diverse Oakland neighborhoods.', 'https://picsum.photos/400/300?random=16', '2024-04-22', 4, 37.8044, -122.2712, true, '["street-art", "murals", "diverse", "neighborhoods", "vibrant"]', 4.3);

-- Insert sample trips
INSERT INTO trips (created_by, title, collaborators, experiences)
VALUES 
    ('current_user_uid', 'Bay Area Adventures', '["user_2_firebase_uid"]', '[1, 2]'),
    ('current_user_uid', 'Wine Country Weekend', '[]', '[3]'),
    ('user_2_firebase_uid', 'National Parks Tour', '["current_user_uid", "user_3_firebase_uid"]', '[4]'),
    ('user_3_firebase_uid', 'California Coast Road Trip', '["user_4_firebase_uid"]', '[6, 11]'),
    ('user_4_firebase_uid', 'Lake & Sea Adventures', '[]', '[8, 9]');

-- Create indexes for better performance
CREATE INDEX idx_experiences_created_by ON experiences(created_by);
CREATE INDEX idx_experiences_is_public ON experiences(is_public);
CREATE INDEX idx_experiences_created_at ON experiences(created_at);
CREATE INDEX idx_experiences_rating ON experiences(rating);
CREATE INDEX idx_experiences_location ON experiences(latitude, longitude);
CREATE INDEX idx_trips_created_by ON trips(created_by);
CREATE INDEX idx_trip_experiences_trip_id ON trip_experiences(trip_id);
CREATE INDEX idx_trip_experiences_experience_id ON trip_experiences(experience_id);

-- Useful queries for your app:

-- Get all public experiences (for discovery/home page)
-- SELECT * FROM experiences WHERE is_public = true ORDER BY created_at DESC;

-- Get experiences by current user
-- SELECT * FROM experiences WHERE created_by = 'current_user_uid' ORDER BY created_at DESC;

-- Get experiences NOT by current user (for discovery)
-- SELECT * FROM experiences WHERE created_by != 'current_user_uid' AND is_public = true ORDER BY rating DESC;

-- Get experiences within a geographic area (for map view)
-- SELECT * FROM experiences 
-- WHERE latitude BETWEEN 37.0 AND 38.0 
-- AND longitude BETWEEN -123.0 AND -121.0 
-- AND is_public = true;