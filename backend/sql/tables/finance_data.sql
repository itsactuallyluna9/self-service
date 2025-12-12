CREATE TABLE FINANCE_DATA(
    balance INT NOT NULL,
    fees INT NOT NULL,
    financeaid INT NOT NULL,
    payments INT NOT NULL,
    tuition INT NOT NULL,
    roomboard INT NOT NULL,
    payperiod VARCHAR[20],
    userid SMALLINT NOT NULL
    FOREIGN KEY (userid) REFERENCES USERS(userid)
);
