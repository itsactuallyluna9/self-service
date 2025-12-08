CREATE TABLE USERS(
    userid INT AUTO_INCREMENT PRIMARY KEY, -- user identification, auto incrementing for unique ids per person
    username VARCHAR(50) NOT NULL UNIQUE, -- given username of user
    password VARCHAR(50) NOT NULL, -- user password
    usertype ENUM('STUDENT', 'FACULTY', 'REGISTRAR') -- type of account being logged in
);
