-- This file creates the tables for the database

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS Users;

CREATE OR REPLACE TABLE Users (
    userID int unique AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    userPassword varchar(255) NOT NULL,
    PRIMARY KEY (userID)
);

INSERT INTO Users (username, firstName, lastname, email, userPassword)
VALUES ('user1', 'test', 'test', 'test@gmail.com', 'testing123')

DROP TABLE IF EXISTS Trips;

CREATE OR REPLACE TABLE Trips (
    tripID int unique AUTO_INCREMENT,
    userID int NOT NULL,
    title varchar(255) NOT NULL,
    PRIMARY KEY (tripID),
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
);

INSERT INTO Trips (userID, title)
VALUES (1, 'California Trip'),(1, 'New York Trip'), (1, 'Hawaii Trip'), (1, 'Tokyo Trip');

DROP TABLE IF EXISTS Experiences;

CREATE OR REPLACE TABLE Experiences (
    experienceID int unique AUTO_INCREMENT,
    userID int NOT NULL,
    title varchar(255) NOT NULL,
    expDescription varchar(255) NOT NULL,
    expDate date,
    imageURL varchar(255) NOT NULL,
    latitude decimal NOT NULL,
    longitude decimal NOT NULL,
    rating int,
    keyword varchar(255)[],
    PRIMARY KEY (experienceID),
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE 
);

INSERT INTO Experiences (userID, title, expDescription, expDate, imageURL, latitude, longitude, rating, keyword)
VALUES (1, 'Hike the Lost Coast', 'Remote trail through California wilderness.', 07/12/2025, 'https://picsum.photos/200', 40.12, -124.35, 4, [{ id: "k1", label: "hiking" }]),
    (1, 'Surf Santa Cruz', 'Beginner-friendly surf experience with lessons.', 03/12/2025, 'https://picsum.photos/200', 36.96, -122.02, 5, [{ id: "k2", label: "surfing" }]),
    (1, 'Wine Tour in Napa', 'Visit 3 boutique wineries with a local guide.', 12/12/2023, 'https://picsum.photos/200', 38.29, -122.28, 3, [{ id: "k3", label: "wine tasting" }]),
    (1, 'San Francisco Street Art Walk', 'Explore iconic murals and local graffiti culture.', 10/15/2024, 'https://picsum.photos/200', 37.77, -122.42, 4, [{ id: "k4", label: "art" }]);

DROP TABLE IF EXISTS TripExperiences;

CREATE OR REPLACE TABLE TripExperiences (
    tripExpID int unique AUTO_INCREMENT,
    tripID int NOT NULL,
    experienceID int NOT NULL,
    PRIMARY KEY (tripExpID),
    FOREIGN KEY (tripID) REFERENCES Trips(tripID) ON DELETE CASCADE,
    FOREIGN KEY (experienceID) REFERENCES Experiences(experienceID) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Ratings;

CREATE OR REPLACE TABLE Ratings (
    ratingID int unique AUTO_INCREMENT,
    rating int,
    PRIMARY KEY (ratingID)
);

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;