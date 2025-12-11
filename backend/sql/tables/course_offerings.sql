--Course Offer Table
CREATE TABLE COURSE_OFFER(
    id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    academicyear SMALLINT NOT NULL,
    openseats SMALLINT NOT NULL,
    totalseats SMALLINT NOT NULL,
    waitcount TINYINT NOT NULL,
    session VARCHAR(50),
    professor VARCHAR(255) NOT NULL, -- If Multiple, Comma Seperated Instructors
    -- One-To-Many Relationship
    courseid SMALLINT NOT NULL,
    FOREIGN KEY (courseid) REFERENCES COURSE_DATA(id)
);