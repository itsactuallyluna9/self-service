CREATE TABLE COURSE_DATA(
    CODE INT PRIMARY KEY AUTO_INCREMENT,  -- Primary Key. Randomized Integer? #Digits?
    -- These Columns are information required for a course, so they cannot be NULL values and must be provided, or pass default values.
    ACADEMICYEAR SMALLINT NOT NULL, 
    SEATS TINYINT NOT NULL,
    COURSECODE SMALLINT NOT NULL,  --Course Code (Ex. 315) ?
    BLOCKNUM VARCHAR(15) NOT NULL, -- The Block is a string, so that it may support Adjunct Fall/Spring (INT Values but Adjunct are Block 9 and 10?)
    TITLE VARCHAR(255) NOT NULL,
    PROFESSOR VARCHAR(255) NOT NULL,
    CREDITS FLOAT NOT NULL,
    DEPARTMENT CHAR(3),  -- Dept. Code (Ex. CSC) ?
    -- These Columns aren't necessarily required for a course, so they can be NULL values if not provided.
    FEE SMALLINT,
    DESCR TEXT,
    PREREQS TEXT,
    COURSETYPES TEXT,
);
