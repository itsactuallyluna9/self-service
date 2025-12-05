--Many-to-Many Relationships Table between COURSE_DATA and COURSE_OFFER tables
CREATE TABLE COURSES_REL(
    courseid SMALLINT NOT NULL,
    offerid SMALLINT NOT NULL,
    PRIMARY KEY (courseid, offerid),
    FOREIGN KEY (courseid) REFERENCES COURSE_DATA(id),
    FOREIGN KEY (offerid) REFERENCES COURSE_OFFER(id)
);
