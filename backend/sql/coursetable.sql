CREATE TABLE COURSE_DATA(
    KEYCODE INT PRIMARY KEY AUTO_INCREMENT,  -- Primary Key. Randomized Integer? #Digits?
    -- These Columns are information required for a course, so they cannot be NULL values and must be provided, or pass default values.
    ACADEMICYEAR SMALLINT NOT NULL, 
    SEATS TINYINT NOT NULL,
    COURSECODE CHAR(7) NOT NULL,  --Course Code (Ex. "CSC 318")
    COURSEBLOCK VARCHAR(15) NOT NULL, -- The Block is a string, so that it may support Adjunct Fall/Spring
    TITLE VARCHAR(255) NOT NULL,
    PROFESSOR VARCHAR(255) NOT NULL,
    CREDITS FLOAT NOT NULL,
    DEPARTMENT VARCHAR(255) NOT NULL,
    -- These Columns aren't necessarily required for a course, so they can be NULL values if not provided.
    FEE SMALLINT,
    DESCR TEXT,
    PREREQS TEXT, -- Comma Seperated Types (Ex. "CSC 140, CSC 144, CSC 201, CSC 301")
    COURSETYPES TEXT -- Comma Seperated Types (Ex. "W, Social Science")
);
