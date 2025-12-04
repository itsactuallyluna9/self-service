CREATE TABLE USERS(
    userID int AUTO_INCREMENT PRIMARY KEY, -- user identification, auto incrementing for unique ids per person
    userName varchar(50) NOT NULL UNIQUE, -- given username of user
    pswd varchar(50) NOT NULL, -- user password TO BE HASHED
    usertype ENUM('STUDENT', 'FACULTY', 'REGISTRAR') -- type of account being logged in
);

INSERT INTO USERS (userName, pswd, usertype)
VALUES ("ckawase25", "password123", "STUDENT");
INSERT INTO USERS (userName, pswd, usertype) VALUES ('asantos27', 'password123', 'STUDENT');
INSERT INTO USERS (userName, pswd, usertype) VALUES ('clampe27', 'password123', 'STUDENT');
INSERT INTO USERS (userName, pswd, usertype) VALUES ('echesnut26', 'password123', 'STUDENT');
INSERT INTO USERS (userName, pswd, usertype) VALUES ('eweber26', 'password123', 'STUDENT');
INSERT INTO USERS (userName, pswd, usertype) VALUES ('jtressel27', 'password123', 'STUDENT');
INSERT INTO USERS (userName, pswd, usertype) VALUES ('jwaughon27', 'password123', 'STUDENT');
INSERT INTO USERS (userName, pswd, usertype) VALUES ('ksaho27', 'password123', 'STUDENT');
INSERT INTO USERS (userName, pswd, usertype) VALUES ('mryan27', 'password123', 'STUDENT');
INSERT INTO USERS (userName, pswd, usertype) VALUES ('msmith26', 'password123', 'STUDENT');
INSERT INTO USERS (userName, pswd, usertype) VALUES ('achavan', 'password123', 'FACULTY');
