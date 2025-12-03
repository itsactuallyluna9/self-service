-- Course Data Table
CREATE TABLE COURSE_DATA(
    KEYCODE INT PRIMARY KEY AUTO_INCREMENT,
    -- These Columns are information required for a course, so they cannot be NULL values and must be provided, or pass default values.
    ACADEMICYEAR SMALLINT NOT NULL, 
    SEATS TINYINT NOT NULL,
    COURSECODE SMALLINT NOT NULL,
    BLOCKNUM VARCHAR(15) NOT NULL, -- The Block is a string, so that it may support Adjunct Fall/Spring
    TITLE VARCHAR(255) NOT NULL,
    PROFESSOR VARCHAR(255) NOT NULL, --If Multiple, Comma Seperated Instructors
    CREDITS FLOAT NOT NULL,
    DEPARTMENT VARCHAR(255) NOT NULL,
    -- These Columns aren't necessarily required for a course, so they can be NULL values if not provided.
    FEE SMALLINT,
    DESCR TEXT,
    PREREQS TEXT, -- Comma Seperated Prereqs (Ex. "CSC 140, CSC 144, CSC 201, CSC 301")
    COURSETYPES TEXT -- Comma Seperated Course Types (Ex. "W, Social Science")
);

