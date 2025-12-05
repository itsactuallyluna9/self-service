--Course Offer Table
CREATE TABLE COURSE_OFFER(
    id SMALLINT PRIMARY KEY AUTO_INCREMENT,
    academicyear SMALLINT NOT NULL,
    seats TINYINT NOT NULL,
    session VARCHAR(15),
    professor VARCHAR(255) NOT NULL, -- If Multiple, Comma Seperated Instructors
);


