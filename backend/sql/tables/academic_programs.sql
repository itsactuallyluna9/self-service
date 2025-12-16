CREATE TABLE ACADEMIC_PROGRAMS(
  programid SMALLINT AUTO_INCREMENT PRIMARY KEY,
  degree VARCHAR(50),
  curriculum VARCHAR(255),
  programtype ENUM('major', 'minor')
);