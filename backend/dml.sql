-- This file contains the SQL queries to be used in the web app

-- Experience Queries
-- This query displays an experience
SELECT title, expDescription, expDate, imageURL, latitude, longitude, rating, keyword
FROM Experiences

-- This query inserts an experience 
INSERT INTO Experiences(title, expDescription, expDate, imageURL, latitude, longitude, rating, keyword)
VALUES (:titleEntry, :expDescriptionEntry, :expDateEntry, :imageURLEntry, :latitudeEntry, :longitudeEntry, :ratingEntry, :keywordEntry)

-- This query deletes an experience
DELETE FROM Experiences
WHERE experienceID = :rowSelectedFromTable

-- This query updates an experience
UPDATE Experiences
SET title = :titleEntry, expDescription = :expDescriptionEntry, expDate = :expDateEntry, imageURL = :imageURLEntry,
    latitude = :latitudeEntry, longitude = :longitudeEntry, rating = :ratingEntry, keyword = :keywordEntry
WHERE experienceID = :rowSelectedFromTable


-- Trip Queries
-- This query displays a trip
SELECT Trips.title, Users.username
FROM Trips
INNER JOIN Users ON Users.userID = Trips.userID

-- This query inserts a trip
INSERT INTO Trips(title, username)
VALUES (:titleEntry, usernameEntry)

--This query deletes a trip
DELETE FROM Trips
WHERE tripID = :rowSelectedFromTable

--This query updates a trip
UPDATE Trips
SET title = :titleEntry
WHERE tripID = :rowSelectedFromTable
