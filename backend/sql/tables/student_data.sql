CREATE TABLE STUDENTS(
  studentid INT PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL, -- leave fullname VARCHAR(255) just in case
  dategranted DATE, -- the graduated date if a student is degree awarded otherwise NULL

  FOREIGN KEY (studentid) REFERENCES USERS(userid)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

