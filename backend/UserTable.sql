sql

CREATE TABLE USERS(
    userID int AUTO_INCREMENT PRIMARY KEY, -- user identification, auto incrementing for unique ids per person
    userName varchar(50) NOT NULL UNIQUE, -- given username of user
    pswd varchar(50) NOT NULL, -- user password TO BE HASHED
    usertype ENUM('STUDENT', 'FACULTY', 'REGISTRAR') -- type of account being logged in
);

INSERT INTO USERS (userName, pswd, usertype)
VALUES ("ckawase25", "password123", "STUDENT");
