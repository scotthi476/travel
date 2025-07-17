SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

DROP TABLE IF EXISTS Users;

CREATE OR REPLACE TABLE Users (
    userID int unique AUTO_INCREMENT,
    username varchar(255) NOT NULL,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    userPassword varchar(255) NOT NULL,
    PRIMARY KEY (userID)
);

DROP TABLE IF EXISTS Trips;

CREATE OR REPLACE TABLE Trips (
    tripID int unique AUTO_INCREMENT,
    userID int NOT NULL,
    title varchar(255) NOT NULL,
    PRIMARY KEY (tripID)
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Experiences;

CREATE OR REPLACE TABLE Experiences (
    experienceID int unique AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    expDescription varchar(255) NOT NULL,
    expDate date NOT NULL,
    imageURL varchar(255) NOT NULL,
    latitude int NOT NULL,
    longitude int NOT NULL,
    rating varchar(255),
    keyword varchar(255)
    PRIMARY KEY (experienceID)
);

