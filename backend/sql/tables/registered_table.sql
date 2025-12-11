CREATE TABLE REGISTERED_COURSES(
    registeredID INT AUTO_INCREMENT PRIMARY KEY, -- leave registeredID INT for now
    userName varchar(50) NOT NULL,
    keycode SMALLINT NOT NULL, -- This should be SMALLINT since keycode is a foreign key refers id of COURSE_DATA and should mathc the same data type
    enrollmentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    coursegrade DEC(4,2),

    FOREIGN KEY (username) REFERENCES USERS(username)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    FOREIGN KEY (keycode) REFERENCES COURSE_OFFER(id) -- modified keycode to id of COURSE_DATA
        ON UPDATE CASCADE
        ON DELETE CASCADE
);