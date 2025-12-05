-- Course Data Table
CREATE TABLE COURSE_DATA(
    id INT PRIMARY KEY AUTO_INCREMENT,
    -- These Columns are information required for a course, so they cannot be NULL values and must be provided, or pass default values.
    coursecode SMALLINT NOT NULL,   
    title VARCHAR(255) NOT NULL,
    credits FLOAT NOT NULL,
    department CHAR(5) NOT NULL,
    -- These Columns aren't necessarily required for a course, so they can be NULL values if not provided.
    fee SMALLINT,
    description TEXT,
    prereqs TEXT, -- Comma Seperated Prereqs (Ex. "CSC 140, CSC 144, CSC 201, CSC 301")
    coursetypes TEXT -- Comma Seperated Course Types (Ex. "W, Social Science")
);
