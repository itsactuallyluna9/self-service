sql

CREATE TABLE USERS(
    userID int AUTO_INCREMENT PRIMARY KEY,
    userName varchar(20) NOT NULL UNIQUE,
    pswd varchar(12) NOT NULL,
    Utype varchar(20)
)


