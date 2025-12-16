-- Financial Data Table
CREATE TABLE FINANCE_DATA(
    balance INT NOT NULL, -- Is this a Sum of the other columns?
    fees INT NOT NULL,
    financeaid INT NOT NULL,
    payments INT NOT NULL,
    tuition INT NOT NULL,
    roomboard INT NOT NULL,
    payperiod VARCHAR(20), -- i.e. fall2025
    userid INT NOT NULL,
    FOREIGN KEY (userid) REFERENCES USERS(userid)
);

