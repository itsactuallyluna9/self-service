CREATE TABLE STUDENTS(
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL, -- leave fullname VARCHAR(255) just in case
  major VARCHAR(50),
  minor VARCHAR(50),
  gradyear SMALLINT NOT NULL, -- graduation year of a student

  FOREIGN KEY (id) REFERENCES USERS(userid)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

