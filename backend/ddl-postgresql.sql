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
    community_rating_count INTEGER DEFAULT 0,  -- Total community ratings count
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
CREATE TABLE trip_experiences (
    id SERIAL PRIMARY KEY,
    trip_id INTEGER NOT NULL,
    experience_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
    FOREIGN KEY (experience_id) REFERENCES experiences(id) ON DELETE CASCADE,
    UNIQUE(trip_id, experience_id)
);

-- Insert sample data with multiple users across 5 major cities
-- 100 total experiences: 20 per city (San Francisco, Portland, Seattle, San Diego, Los Angeles)

INSERT INTO experiences (created_by, title, description, image_url, date, rating, latitude, longitude, is_public, keywords, rating_average, community_rating_count)
VALUES 
    -- SAN FRANCISCO (20 experiences) - keeping some existing + adding new
    ('user_1_firebase_uid', 'Golden Gate Bridge Walk', 'Amazing morning walk across the iconic bridge with perfect weather.', 'https://picsum.photos/400/300?random=1', '2024-01-15', 5, 37.8199, -122.4783, true, '["walking", "bridge", "morning", "iconic"]', 4.8, 127),
    ('user_2_firebase_uid', 'Alcatraz Island Tour', 'Fascinating prison history and incredible views of the city.', 'https://picsum.photos/400/300?random=2', '2024-01-20', 4, 37.8267, -122.4233, true, '["history", "tour", "prison", "island"]', 4.5, 89),
    ('user_3_firebase_uid', 'Lombard Street Descent', 'Thrilling walk down the world''s most crooked street.', 'https://picsum.photos/400/300?random=3', '2024-02-05', 4, 37.8021, -122.4187, true, '["walking", "steep", "crooked", "famous"]', 4.3, 156),
    ('user_4_firebase_uid', 'Crissy Field Kite Flying', 'Perfect wind conditions for kite flying with Golden Gate views.', 'https://picsum.photos/400/300?random=4', '2024-02-12', 5, 37.8024, -122.4662, true, '["kites", "wind", "family", "views"]', 4.7, 203),
    ('user_5_firebase_uid', 'Fisherman''s Wharf Sea Lion Watching', 'Hundreds of sea lions basking at Pier 39.', 'https://picsum.photos/400/300?random=5', '2024-02-18', 4, 37.8087, -122.4098, true, '["sea-lions", "wildlife", "pier", "watching"]', 4.4, 178),
    ('user_6_firebase_uid', 'Twin Peaks Sunrise Hike', 'Early morning hike for panoramic city views at sunrise.', 'https://picsum.photos/400/300?random=6', '2024-03-01', 5, 37.7544, -122.4477, true, '["hiking", "sunrise", "panoramic", "city-views"]', 4.9, 145),
    ('user_7_firebase_uid', 'Chinatown Lantern Festival Walk', 'Colorful lanterns and traditional architecture exploration.', 'https://picsum.photos/400/300?random=7', '2024-03-08', 4, 37.7941, -122.4078, true, '["culture", "lanterns", "architecture", "walking"]', 4.2, 134),
    ('user_8_firebase_uid', 'Cable Car Adventure Ride', 'Classic San Francisco experience riding the historic cable cars.', 'https://picsum.photos/400/300?random=8', '2024-03-15', 4, 37.7946, -122.4094, true, '["cable-car", "historic", "classic", "transportation"]', 4.5, 267),
    ('user_9_firebase_uid', 'Land''s End Coastal Trail', 'Rugged coastal hiking with ocean views and Sutro Baths ruins.', 'https://picsum.photos/400/300?random=9', '2024-03-22', 5, 37.7808, -122.5114, true, '["coastal", "hiking", "ruins", "ocean-views"]', 4.8, 192),
    ('user_10_firebase_uid', 'Mission District Mural Tour', 'Self-guided tour of vibrant street art and murals.', 'https://picsum.photos/400/300?random=10', '2024-03-29', 4, 37.7599, -122.4148, true, '["street-art", "murals", "culture", "walking"]', 4.3, 221),
    ('user_11_firebase_uid', 'Presidio Forest Exploration', 'Hidden trails and historic military sites in urban forest.', 'https://picsum.photos/400/300?random=11', '2024-04-05', 4, 37.7989, -122.4662, true, '["forest", "trails", "historic", "military"]', 4.4, 167),
    ('user_12_firebase_uid', 'Baker Beach Sunset Photography', 'Perfect spot for Golden Gate Bridge sunset photos.', 'https://picsum.photos/400/300?random=12', '2024-04-12', 5, 37.7937, -122.4832, true, '["photography", "sunset", "beach", "golden-gate"]', 4.7, 189),
    ('user_13_firebase_uid', 'Haight-Ashbury Historic Walk', 'Exploring the birthplace of the 1960s counterculture movement.', 'https://picsum.photos/400/300?random=13', '2024-04-19', 3, 37.7692, -122.4481, true, '["history", "counterculture", "walking", "1960s"]', 4.1, 143),
    ('user_14_firebase_uid', 'Golden Gate Park Bike Ride', 'Leisurely cycling through gardens, lakes, and meadows.', 'https://picsum.photos/400/300?random=14', '2024-04-26', 4, 37.7694, -122.4862, true, '["cycling", "parks", "gardens", "leisurely"]', 4.5, 198),
    ('user_15_firebase_uid', 'Sutro Tower Radio Adventure', 'Urban hiking to SF''s iconic radio tower landmark.', 'https://picsum.photos/400/300?random=15', '2024-05-03', 4, 37.7552, -122.4531, true, '["hiking", "tower", "landmark", "urban"]', 4.2, 156),
    ('user_16_firebase_uid', 'Ferry Building Farmers Market', 'Local artisan vendors and fresh produce market experience.', 'https://picsum.photos/400/300?random=16', '2024-05-10', 4, 37.7955, -122.3937, true, '["market", "local", "artisan", "fresh"]', 4.3, 234),
    ('user_17_firebase_uid', 'Coit Tower Stair Climb', 'Steep stair workout with 360-degree city views at the top.', 'https://picsum.photos/400/300?random=17', '2024-05-17', 5, 37.8024, -122.4058, true, '["stairs", "workout", "tower", "360-views"]', 4.6, 178),
    ('user_18_firebase_uid', 'Ocean Beach Bonfire Experience', 'Evening bonfire on the sand with Pacific Ocean waves.', 'https://picsum.photos/400/300?random=18', '2024-05-24', 4, 37.7594, -122.5107, true, '["bonfire", "beach", "evening", "pacific"]', 4.4, 145),
    ('user_19_firebase_uid', 'Painted Ladies Victorian Tour', 'Architecture appreciation at the famous colorful houses.', 'https://picsum.photos/400/300?random=19', '2024-05-31', 4, 37.7762, -122.4328, true, '["architecture", "victorian", "colorful", "famous"]', 4.2, 289),
    ('user_20_firebase_uid', 'Fort Point Historic Exploration', 'Civil War era fort directly under the Golden Gate Bridge.', 'https://picsum.photos/400/300?random=20', '2024-06-07', 4, 37.8104, -122.4769, true, '["historic", "fort", "civil-war", "bridge"]', 4.5, 167),

    -- PORTLAND (20 experiences)
    ('user_21_firebase_uid', 'Powell''s Books Literary Adventure', 'Getting lost in the world''s largest independent bookstore.', 'https://picsum.photos/400/300?random=21', '2024-01-10', 5, 45.5230, -122.6814, true, '["books", "literary", "independent", "exploring"]', 4.8, 312),
    ('user_22_firebase_uid', 'Multnomah Falls Hiking Trail', 'Spectacular 620-foot waterfall with suspension bridge views.', 'https://picsum.photos/400/300?random=22', '2024-01-17', 5, 45.5762, -122.1158, true, '["hiking", "waterfall", "bridge", "spectacular"]', 4.9, 567),
    ('user_23_firebase_uid', 'Portland Saturday Market Craft Hunt', 'Unique handmade crafts and local artist discoveries.', 'https://picsum.photos/400/300?random=23', '2024-01-24', 4, 45.5152, -122.6674, true, '["crafts", "handmade", "artists", "market"]', 4.3, 189),
    ('user_24_firebase_uid', 'Mt. Hood Scenic Byway Drive', 'Stunning mountain views and alpine meadow stops.', 'https://picsum.photos/400/300?random=24', '2024-01-31', 5, 45.3738, -121.7097, true, '["driving", "mountain", "alpine", "scenic"]', 4.7, 234),
    ('user_25_firebase_uid', 'Washington Park Rose Garden Stroll', 'Thousands of rose varieties in terraced garden setting.', 'https://picsum.photos/400/300?random=25', '2024-02-07', 4, 45.5186, -122.7066, true, '["roses", "garden", "stroll", "terraced"]', 4.4, 156),
    ('user_26_firebase_uid', 'Columbia River Gorge Windsurfing', 'World-class windsurfing conditions in dramatic gorge setting.', 'https://picsum.photos/400/300?random=26', '2024-02-14', 5, 45.6387, -121.5042, true, '["windsurfing", "gorge", "world-class", "dramatic"]', 4.8, 123),
    ('user_27_firebase_uid', 'Forest Park Trail Running', 'Urban wilderness running on 80+ miles of forest trails.', 'https://picsum.photos/400/300?random=27', '2024-02-21', 4, 45.5358, -122.7661, true, '["trail-running", "forest", "wilderness", "urban"]', 4.5, 167),
    ('user_28_firebase_uid', 'Hawthorne Bridge Bicycle Crossing', 'Historic drawbridge cycling with Willamette River views.', 'https://picsum.photos/400/300?random=28', '2024-02-28', 4, 45.5126, -122.6670, true, '["cycling", "bridge", "historic", "river"]', 4.2, 145),
    ('user_29_firebase_uid', 'Powell Butte Nature Preserve Hike', 'Volcanic cone hiking with panoramic mountain views.', 'https://picsum.photos/400/300?random=29', '2024-03-07', 4, 45.5019, -122.4988, true, '["hiking", "volcanic", "nature", "panoramic"]', 4.6, 134),
    ('user_30_firebase_uid', 'Crystal Springs Rhododendron Walk', 'Stunning rhododendron blooms in peaceful garden setting.', 'https://picsum.photos/400/300?random=30', '2024-03-14', 4, 45.4654, -122.6348, true, '["rhododendron", "blooms", "garden", "peaceful"]', 4.3, 178),
    ('user_31_firebase_uid', 'Mt. Tabor Volcanic Park Exploration', 'Extinct volcano park with city views and nature trails.', 'https://picsum.photos/400/300?random=31', '2024-03-21', 4, 45.5110, -122.5932, true, '["volcanic", "park", "extinct", "city-views"]', 4.4, 189),
    ('user_32_firebase_uid', 'Lan Su Chinese Garden Meditation', 'Authentic Ming Dynasty garden with koi ponds and pavilions.', 'https://picsum.photos/400/300?random=32', '2024-03-28', 5, 45.5247, -122.6719, true, '["chinese-garden", "meditation", "koi", "pavilions"]', 4.7, 156),
    ('user_33_firebase_uid', 'Willamette River Kayaking', 'Urban river paddling through downtown Portland.', 'https://picsum.photos/400/300?random=33', '2024-04-04', 4, 45.5152, -122.6784, true, '["kayaking", "river", "urban", "paddling"]', 4.5, 167),
    ('user_34_firebase_uid', 'Oregon Museum Science Discovery', 'Interactive exhibits and planetarium shows for all ages.', 'https://picsum.photos/400/300?random=34', '2024-04-11', 4, 45.5087, -122.6854, true, '["science", "interactive", "planetarium", "discovery"]', 4.2, 134),
    ('user_35_firebase_uid', 'Pittock Mansion Historic Tour', '1914 mansion with panoramic city and mountain views.', 'https://picsum.photos/400/300?random=35', '2024-04-18', 4, 45.5252, -122.7161, true, '["mansion", "historic", "1914", "panoramic"]', 4.4, 178),
    ('user_36_firebase_uid', 'Burnside Skatepark Session', 'Legendary DIY skatepark under the Burnside Bridge.', 'https://picsum.photos/400/300?random=36', '2024-04-25', 5, 45.5161, -122.6663, true, '["skateboarding", "legendary", "DIY", "burnside"]', 4.8, 145),
    ('user_37_firebase_uid', 'Alberta Arts District Gallery Walk', 'Eclectic galleries and street art in trendy neighborhood.', 'https://picsum.photos/400/300?random=37', '2024-05-02', 4, 45.5587, -122.6537, true, '["galleries", "street-art", "eclectic", "trendy"]', 4.3, 156),
    ('user_38_firebase_uid', 'Tilikum Crossing Pedestrian Walk', 'Car-free bridge crossing with stunning river views.', 'https://picsum.photos/400/300?random=38', '2024-05-09', 4, 45.5058, -122.6646, true, '["pedestrian", "car-free", "bridge", "river-views"]', 4.5, 167),
    ('user_39_firebase_uid', 'Oregon Zoo Wildlife Discovery', 'Conservation-focused zoo with Pacific Northwest animal exhibits.', 'https://picsum.photos/400/300?random=39', '2024-05-16', 4, 45.5099, -122.7160, true, '["zoo", "wildlife", "conservation", "exhibits"]', 4.1, 198),
    ('user_40_firebase_uid', 'Portland Streetcar Urban Tour', 'Hop-on hop-off streetcar tour connecting diverse neighborhoods.', 'https://picsum.photos/400/300?random=40', '2024-05-23', 3, 45.5152, -122.6784, true, '["streetcar", "neighborhoods", "urban", "tour"]', 3.9, 123),

    -- SEATTLE (20 experiences)
    ('user_41_firebase_uid', 'Space Needle Observation Experience', 'Iconic 605-foot tower with 360-degree city views.', 'https://picsum.photos/400/300?random=41', '2024-01-12', 5, 47.6205, -122.3493, true, '["space-needle", "observation", "360-views", "iconic"]', 4.8, 445),
    ('user_42_firebase_uid', 'Pike Place Market Fish Throwing', 'Famous fish market with flying salmon and local vendors.', 'https://picsum.photos/400/300?random=42', '2024-01-19', 4, 47.6097, -122.3406, true, '["market", "fish", "salmon", "vendors"]', 4.5, 567),
    ('user_43_firebase_uid', 'Kerry Park City Skyline View', 'Best panoramic view of Seattle skyline and Mount Rainier.', 'https://picsum.photos/400/300?random=43', '2024-01-26', 5, 47.6295, -122.3598, true, '["skyline", "panoramic", "kerry-park", "rainier"]', 4.9, 378),
    ('user_44_firebase_uid', 'Chihuly Garden Glass Art Walk', 'Stunning blown glass sculptures in garden and gallery.', 'https://picsum.photos/400/300?random=44', '2024-02-02', 5, 47.6205, -122.3514, true, '["glass-art", "chihuly", "sculptures", "garden"]', 4.7, 289),
    ('user_45_firebase_uid', 'Underground Seattle Historic Tour', 'Hidden underground city beneath Pioneer Square.', 'https://picsum.photos/400/300?random=45', '2024-02-09', 4, 47.6021, -122.3326, true, '["underground", "historic", "hidden", "pioneer-square"]', 4.4, 234),
    ('user_46_firebase_uid', 'Puget Sound Ferry Island Hopping', 'Scenic ferry rides to Bainbridge and Vashon Islands.', 'https://picsum.photos/400/300?random=46', '2024-02-16', 4, 47.6062, -122.3321, true, '["ferry", "islands", "puget-sound", "scenic"]', 4.6, 178),
    ('user_47_firebase_uid', 'Discovery Park Beach Combing', 'Urban wilderness park with sandy beaches and lighthouse.', 'https://picsum.photos/400/300?random=47', '2024-02-23', 4, 47.6584, -122.4064, true, '["beach-combing", "wilderness", "lighthouse", "urban"]', 4.3, 145),
    ('user_48_firebase_uid', 'Mount Rainier Day Trip Adventure', 'Majestic volcanic peak with alpine meadows and glaciers.', 'https://picsum.photos/400/300?random=48', '2024-03-02', 5, 46.8523, -121.7603, true, '["mount-rainier", "volcanic", "alpine", "glaciers"]', 4.9, 167),
    ('user_49_firebase_uid', 'Snoqualmie Falls Nature Walk', 'Powerful 268-foot waterfall with observation deck.', 'https://picsum.photos/400/300?random=49', '2024-03-09', 4, 47.5420, -121.8370, true, '["waterfall", "nature", "observation", "powerful"]', 4.5, 198),
    ('user_50_firebase_uid', 'Capitol Hill Vinyl Record Hunting', 'Digging through independent record stores and music venues.', 'https://picsum.photos/400/300?random=50', '2024-03-16', 4, 47.6205, -122.3204, true, '["vinyl", "records", "independent", "music"]', 4.2, 156),
    ('user_51_firebase_uid', 'Fremont Troll Sculpture Visit', 'Massive concrete troll sculpture under Aurora Bridge.', 'https://picsum.photos/400/300?random=51', '2024-03-23', 4, 47.6511, -122.3472, true, '["troll", "sculpture", "concrete", "bridge"]', 4.4, 234),
    ('user_52_firebase_uid', 'Boeing Factory Tour Experience', 'Inside look at jumbo jet assembly in world''s largest building.', 'https://picsum.photos/400/300?random=52', '2024-03-30', 5, 47.9060, -122.2826, true, '["boeing", "factory", "jets", "assembly"]', 4.7, 189),
    ('user_53_firebase_uid', 'Alki Beach Volleyball Tournament', 'Beach volleyball courts with Seattle skyline backdrop.', 'https://picsum.photos/400/300?random=53', '2024-04-06', 4, 47.5764, -122.4088, true, '["volleyball", "beach", "tournament", "skyline"]', 4.3, 167),
    ('user_54_firebase_uid', 'Lake Union Seaplane Adventure', 'Scenic seaplane flight over Seattle and Puget Sound.', 'https://picsum.photos/400/300?random=54', '2024-04-13', 5, 47.6278, -122.3366, true, '["seaplane", "scenic", "flight", "puget-sound"]', 4.8, 145),
    ('user_55_firebase_uid', 'Ballard Locks Salmon Watching', 'Watch salmon migrate through fish ladder and locks.', 'https://picsum.photos/400/300?random=55', '2024-04-20', 4, 47.6617, -122.3991, true, '["salmon", "migration", "locks", "fish-ladder"]', 4.5, 178),
    ('user_56_firebase_uid', 'Green Lake Park Running Loop', 'Popular 2.8-mile loop around scenic urban lake.', 'https://picsum.photos/400/300?random=56', '2024-04-27', 4, 47.6815, -122.3239, true, '["running", "loop", "lake", "urban"]', 4.2, 234),
    ('user_57_firebase_uid', 'Gasworks Park Kite Festival', 'Colorful kites flying over former gas plant turned park.', 'https://picsum.photos/400/300?random=57', '2024-05-04', 4, 47.6456, -122.3344, true, '["kites", "festival", "gasworks", "colorful"]', 4.4, 189),
    ('user_58_firebase_uid', 'Queen Anne Hill Counterbalance Walk', 'Steep historic streetcar route with neighborhood exploration.', 'https://picsum.photos/400/300?random=58', '2024-05-11', 3, 47.6236, -122.3573, true, '["counterbalance", "steep", "historic", "streetcar"]', 4.0, 156),
    ('user_59_firebase_uid', 'Woodland Park Zoo Safari', 'Award-winning zoo with immersive animal habitat exhibits.', 'https://picsum.photos/400/300?random=59', '2024-05-18', 4, 47.6687, -122.3515, true, '["zoo", "safari", "immersive", "habitats"]', 4.3, 267),
    ('user_60_firebase_uid', 'Elliott Bay Trail Cycling', 'Waterfront cycling path with Olympic Mountain views.', 'https://picsum.photos/400/300?random=60', '2024-05-25', 4, 47.5952, -122.3316, true, '["cycling", "waterfront", "olympic", "trail"]', 4.4, 178),

    -- SAN DIEGO (20 experiences)
    ('user_61_firebase_uid', 'Balboa Park Museum Complex', 'Spanish architecture housing 15+ world-class museums.', 'https://picsum.photos/400/300?random=61', '2024-01-08', 4, 32.7341, -117.1498, true, '["museums", "spanish", "architecture", "complex"]', 4.5, 345),
    ('user_62_firebase_uid', 'La Jolla Cove Snorkeling Adventure', 'Crystal clear waters with sea lions and colorful fish.', 'https://picsum.photos/400/300?random=62', '2024-01-15', 5, 32.8507, -117.2713, true, '["snorkeling", "sea-lions", "crystal", "colorful"]', 4.8, 234),
    ('user_63_firebase_uid', 'Sunset Cliffs Natural Yoga', 'Clifftop yoga sessions with Pacific sunset backdrop.', 'https://picsum.photos/400/300?random=63', '2024-01-22', 5, 32.7157, -117.2544, true, '["yoga", "cliffs", "sunset", "pacific"]', 4.7, 189),
    ('user_64_firebase_uid', 'Torrey Pines Gliding Experience', 'Paragliding from dramatic cliffs over black sand beach.', 'https://picsum.photos/400/300?random=64', '2024-01-29', 5, 32.9224, -117.2574, true, '["paragliding", "cliffs", "dramatic", "beach"]', 4.9, 167),
    ('user_65_firebase_uid', 'Mission Beach Volleyball Tournament', 'Competitive beach volleyball on pristine sand courts.', 'https://picsum.photos/400/300?random=65', '2024-02-05', 4, 32.7733, -117.2530, true, '["volleyball", "beach", "competitive", "sand"]', 4.3, 156),
    ('user_66_firebase_uid', 'Cabrillo National Monument Tide Pools', 'Exploring marine life in natural rocky tide pools.', 'https://picsum.photos/400/300?random=66', '2024-02-12', 4, 32.6722, -117.2415, true, '["tide-pools", "marine-life", "rocky", "exploring"]', 4.6, 178),
    ('user_67_firebase_uid', 'Gaslamp Quarter Historic Walking Tour', 'Victorian-era architecture and nightlife district exploration.', 'https://picsum.photos/400/300?random=67', '2024-02-19', 3, 32.7109, -117.1601, true, '["historic", "victorian", "walking", "nightlife"]', 4.1, 134),
    ('user_68_firebase_uid', 'Coronado Beach Sand Castle Building', 'Perfect sand consistency for elaborate castle construction.', 'https://picsum.photos/400/300?random=68', '2024-02-26', 4, 32.6851, -117.1751, true, '["sand-castle", "beach", "construction", "perfect"]', 4.4, 145),
    ('user_69_firebase_uid', 'San Diego Bay Sailing Adventure', 'Harbor sailing with views of city skyline and Coronado Bridge.', 'https://picsum.photos/400/300?random=69', '2024-03-05', 5, 32.7081, -117.1977, true, '["sailing", "harbor", "skyline", "bridge"]', 4.8, 189),
    ('user_70_firebase_uid', 'Old Town Mexican Village Heritage', 'Historic birthplace of California with adobe buildings.', 'https://picsum.photos/400/300?random=70', '2024-03-12', 3, 32.7547, -117.1970, true, '["heritage", "historic", "adobe", "birthplace"]', 4.0, 167),
    ('user_71_firebase_uid', 'Scripps Pier Fishing Experience', 'Ocean pier fishing with research institution backdrop.', 'https://picsum.photos/400/300?random=71', '2024-03-19', 4, 32.8669, -117.2571, true, '["fishing", "pier", "ocean", "research"]', 4.2, 134),
    ('user_72_firebase_uid', 'Mount Soledad Veterans Memorial', 'Panoramic views and veteran tribute on 822-foot peak.', 'https://picsum.photos/400/300?random=72', '2024-03-26', 4, 32.8384, -117.2370, true, '["memorial", "veterans", "panoramic", "peak"]', 4.5, 156),
    ('user_73_firebase_uid', 'Birch Aquarium Ocean Discovery', 'Marine research aquarium with interactive exhibits and seahorses.', 'https://picsum.photos/400/300?random=73', '2024-04-02', 4, 32.8669, -117.2512, true, '["aquarium", "marine", "interactive", "seahorses"]', 4.4, 178),
    ('user_74_firebase_uid', 'Black''s Beach Surfing Challenge', 'Legendary surf break accessible by steep cliff trail.', 'https://picsum.photos/400/300?random=74', '2024-04-09', 5, 32.8892, -117.2519, true, '["surfing", "legendary", "cliff", "challenging"]', 4.7, 145),
    ('user_75_firebase_uid', 'Potato Chip Rock Hiking Trail', 'Challenging hike to famous thin rock formation photo spot.', 'https://picsum.photos/400/300?random=75', '2024-04-16', 5, 32.9369, -116.9600, true, '["hiking", "rock", "formation", "photo"]', 4.8, 267),
    ('user_76_firebase_uid', 'Seaport Village Harbor Walk', 'Waterfront shopping and street performer entertainment.', 'https://picsum.photos/400/300?random=76', '2024-04-23', 3, 32.7081, -117.1713, true, '["waterfront", "shopping", "performers", "harbor"]', 3.9, 189),
    ('user_77_firebase_uid', 'Belmont Park Roller Coaster Ride', 'Historic 1925 wooden roller coaster on the beach.', 'https://picsum.photos/400/300?random=77', '2024-04-30', 4, 32.7701, -117.2515, true, '["roller-coaster", "historic", "wooden", "beach"]', 4.3, 156),
    ('user_78_firebase_uid', 'Embarcadero Marina Park Picnic', 'Grassy waterfront park perfect for family gatherings.', 'https://picsum.photos/400/300?random=78', '2024-05-07', 4, 32.7017, -117.2108, true, '["picnic", "waterfront", "family", "grassy"]', 4.2, 134),
    ('user_79_firebase_uid', 'Point Loma Lighthouse Historic Tour', 'Civil War era lighthouse with whale watching opportunities.', 'https://picsum.photos/400/300?random=79', '2024-05-14', 4, 32.6613, -117.2424, true, '["lighthouse", "historic", "whales", "civil-war"]', 4.5, 167),
    ('user_80_firebase_uid', 'Crystal Pier Fishing Adventure', 'Unique hotel pier extending into Pacific Ocean waves.', 'https://picsum.photos/400/300?random=80', '2024-05-21', 4, 32.7794, -117.2530, true, '["fishing", "pier", "hotel", "pacific"]', 4.4, 178),

    -- LOS ANGELES (20 experiences)
    ('user_81_firebase_uid', 'Hollywood Sign Hiking Trail', 'Iconic sign viewing from multiple canyon trail approaches.', 'https://picsum.photos/400/300?random=81', '2024-01-06', 4, 34.1341, -118.3215, true, '["hollywood", "sign", "hiking", "iconic"]', 4.6, 456),
    ('user_82_firebase_uid', 'Venice Beach Boardwalk Spectacle', 'Street performers, muscle beach, and eclectic shops.', 'https://picsum.photos/400/300?random=82', '2024-01-13', 4, 33.9850, -118.4695, true, '["boardwalk", "performers", "muscle-beach", "eclectic"]', 4.3, 389),
    ('user_83_firebase_uid', 'Griffith Observatory Star Gazing', 'Public telescopes and planetarium with city views.', 'https://picsum.photos/400/300?random=83', '2024-01-20', 5, 34.1184, -118.3004, true, '["observatory", "telescopes", "planetarium", "stars"]', 4.8, 345),
    ('user_84_firebase_uid', 'Santa Monica Pier Amusement Park', 'Historic pier with Ferris wheel and classic carnival rides.', 'https://picsum.photos/400/300?random=84', '2024-01-27', 4, 34.0085, -118.4987, true, '["pier", "ferris-wheel", "carnival", "historic"]', 4.4, 567),
    ('user_85_firebase_uid', 'Runyon Canyon Celebrity Hiking', 'Popular hiking spot with potential celebrity sightings.', 'https://picsum.photos/400/300?random=85', '2024-02-03', 4, 34.1102, -118.3431, true, '["hiking", "celebrity", "popular", "sightings"]', 4.2, 234),
    ('user_86_firebase_uid', 'Getty Center Art Architecture Tour', 'World-class art collection in stunning modern architecture.', 'https://picsum.photos/400/300?random=86', '2024-02-10', 5, 34.0780, -118.4741, true, '["art", "architecture", "modern", "world-class"]', 4.9, 278),
    ('user_87_firebase_uid', 'Manhattan Beach Volleyball Tournament', 'Professional-level beach volleyball competitions.', 'https://picsum.photos/400/300?random=87', '2024-02-17', 4, 33.8847, -118.4109, true, '["volleyball", "professional", "beach", "tournament"]', 4.5, 189),
    ('user_88_firebase_uid', 'Walt Disney Concert Hall Acoustic Experience', 'Frank Gehry''s architectural masterpiece with perfect acoustics.', 'https://picsum.photos/400/300?random=88', '2024-02-24', 5, 34.0549, -118.2467, true, '["concert", "gehry", "architecture", "acoustics"]', 4.7, 156),
    ('user_89_firebase_uid', 'Mulholland Drive Scenic Overlook', 'Winding mountain road with panoramic valley views.', 'https://picsum.photos/400/300?random=89', '2024-03-03', 4, 34.1368, -118.3686, true, '["scenic", "overlook", "mountain", "panoramic"]', 4.3, 234),
    ('user_90_firebase_uid', 'LA County Museum Art Mile Walk', 'Multiple world-renowned museums along Museum Row.', 'https://picsum.photos/400/300?random=90', '2024-03-10', 4, 34.0639, -118.3592, true, '["museums", "art", "renowned", "mile"]', 4.4, 178),
    ('user_91_firebase_uid', 'Sunset Strip Music Venue Tour', 'Historic rock clubs and live music venues crawl.', 'https://picsum.photos/400/300?random=91', '2024-03-17', 4, 34.0901, -118.3852, true, '["music", "venues", "rock", "historic"]', 4.2, 167),
    ('user_92_firebase_uid', 'Malibu Point Dume Rock Climbing', 'Coastal rock climbing with ocean views and sea caves.', 'https://picsum.photos/400/300?random=92', '2024-03-24', 5, 34.0045, -118.8090, true, '["rock-climbing", "coastal", "ocean", "caves"]', 4.8, 145),
    ('user_93_firebase_uid', 'Beverly Hills Mansion Tour Drive', 'Self-guided driving tour of celebrity neighborhood mansions.', 'https://picsum.photos/400/300?random=93', '2024-03-31', 3, 34.0736, -118.4004, true, '["mansions", "celebrity", "driving", "beverly-hills"]', 3.8, 234),
    ('user_94_firebase_uid', 'El Matador Beach Tide Pool Exploration', 'Dramatic rocky coastline with hidden tide pools.', 'https://picsum.photos/400/300?random=94', '2024-04-07', 4, 34.0193, -118.8792, true, '["tide-pools", "rocky", "dramatic", "hidden"]', 4.6, 156),
    ('user_95_firebase_uid', 'Angeles National Forest Waterfall Hike', 'Hidden waterfalls accessible by moderate hiking trails.', 'https://picsum.photos/400/300?random=95', '2024-04-14', 4, 34.2804, -118.1552, true, '["waterfall", "forest", "hidden", "moderate"]', 4.5, 178),
    ('user_96_firebase_uid', 'Rodeo Drive Luxury Window Shopping', 'World-famous luxury shopping street experience.', 'https://picsum.photos/400/300?random=96', '2024-04-21', 3, 34.0673, -118.4019, true, '["luxury", "shopping", "famous", "rodeo"]', 3.9, 289),
    ('user_97_firebase_uid', 'Catalina Island Day Trip Ferry', 'Island getaway with snorkeling and scenic helicopter tours.', 'https://picsum.photos/400/300?random=97', '2024-04-28', 5, 33.3897, -118.4119, true, '["island", "ferry", "snorkeling", "helicopter"]', 4.7, 167),
    ('user_98_firebase_uid', 'Universal Studios Backlot Tour', 'Behind-the-scenes movie studio sets and special effects.', 'https://picsum.photos/400/300?random=98', '2024-05-05', 4, 34.1381, -118.3534, true, '["studios", "backlot", "movie", "effects"]', 4.4, 345),
    ('user_99_firebase_uid', 'Dodger Stadium Baseball Experience', 'Classic ballpark with city skyline and mountain backdrop.', 'https://picsum.photos/400/300?random=99', '2024-05-12', 4, 34.0739, -118.2400, true, '["baseball", "stadium", "skyline", "classic"]', 4.3, 234),
    ('user_100_firebase_uid', 'Los Angeles River Bike Path Adventure', 'Urban river trail connecting diverse neighborhoods.', 'https://picsum.photos/400/300?random=100', '2024-05-19', 3, 34.0928, -118.2107, true, '["bike-path", "river", "urban", "neighborhoods"]', 4.0, 156);

-- Insert sample trips
INSERT INTO trips (created_by, title, collaborators, experiences)
VALUES 
    ('user_1_firebase_uid', 'San Francisco Bay Area Adventures', '["user_2_firebase_uid"]', '[1, 2, 6, 12]'),
    ('user_5_firebase_uid', 'California Coast Road Trip', '["user_15_firebase_uid", "user_25_firebase_uid"]', '[20, 63, 68, 92]'),
    ('user_21_firebase_uid', 'Pacific Northwest Nature Tour', '["user_41_firebase_uid", "user_47_firebase_uid"]', '[22, 26, 48, 49]'),
    ('user_61_firebase_uid', 'Southern California Beach Hopping', '["user_81_firebase_uid"]', '[62, 64, 65, 82, 87]'),
    ('user_30_firebase_uid', 'Urban Art & Culture Circuit', '["user_50_firebase_uid", "user_90_firebase_uid"]', '[10, 32, 37, 50, 86]'),
    ('user_42_firebase_uid', 'Adventure Sports Weekend', '["user_26_firebase_uid", "user_74_firebase_uid"]', '[26, 64, 74, 92]'),
    ('user_83_firebase_uid', 'Family-Friendly West Coast', '["user_34_firebase_uid", "user_59_firebase_uid"]', '[14, 34, 39, 59, 77, 84]'),
    ('user_43_firebase_uid', 'Photography Hotspots Tour', '["user_12_firebase_uid", "user_72_firebase_uid"]', '[12, 43, 63, 72, 83, 89]');

-- Create indexes for better performance
CREATE INDEX idx_experiences_created_by ON experiences(created_by);
CREATE INDEX idx_experiences_is_public ON experiences(is_public);
CREATE INDEX idx_experiences_created_at ON experiences(created_at);
CREATE INDEX idx_experiences_rating ON experiences(rating);
CREATE INDEX idx_experiences_rating_average ON experiences(rating_average);
CREATE INDEX idx_experiences_community_rating_count ON experiences(community_rating_count);
CREATE INDEX idx_experiences_location ON experiences(latitude, longitude);
CREATE INDEX idx_experiences_keywords ON experiences USING GIN(keywords);
CREATE INDEX idx_trips_created_by ON trips(created_by);
CREATE INDEX idx_trips_collaborators ON trips USING GIN(collaborators);
CREATE INDEX idx_trips_experiences ON trips USING GIN(experiences);
CREATE INDEX idx_trip_experiences_trip_id ON trip_experiences(trip_id);
CREATE INDEX idx_trip_experiences_experience_id ON trip_experiences(experience_id);