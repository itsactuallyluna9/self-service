CREATE TABLE COURSES_REL(
    courseid SMALLINT NOT NULL,
    offerid SMALLINT NOT NULL,
    PRIMARY KEY (courseid, offerid),
    FOREIGN KEY (courseid) REFERENCES courses_dta(id),
    FOREIGN KEY (offerid) REFERENCES course_offerings(id)
);
