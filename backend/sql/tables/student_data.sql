CREATE TABLE STUDENTS(
  studentid INT PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL, -- leave fullname VARCHAR(255) just in case
  dategranted DATE, -- graduation year of a student

  FOREIGN KEY (studentid) REFERENCES USERS(userid)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

