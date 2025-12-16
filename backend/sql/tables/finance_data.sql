-- Financial Data Table
CREATE TABLE FINANCE_DATA(
    balance INT NOT NULL, -- Is this a Sum of the other columns?
    fees INT NOT NULL,
    financeaid INT NOT NULL,
    payments INT NOT NULL,
    tuition INT NOT NULL,
    roomboard INT NOT NULL,
    payperiod VARCHAR(20), -- i.e. fall2025
    username VARCHAR(50) NOT NULL,
    FOREIGN KEY (username) REFERENCES USERS(username)
);

