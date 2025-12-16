-- Create All Tables Script
-- This script creates all tables in the correct order respecting foreign key dependencies
-- To run from backend/sql directory: mariadb -u username -p database_name < tables/create_all_tables.sql
-- ~Luna

-- Drop tables in reverse dependency order (if they exist)
DROP TABLE IF EXISTS CART_SAVE;
DROP TABLE IF EXISTS REGISTERED_COURSES;
DROP TABLE IF EXISTS STUDENT_STUDY_FIELD;
DROP TABLE IF EXISTS STUDENTS;
DROP TABLE IF EXISTS FINANCE_DATA;
DROP TABLE IF EXISTS COURSE_OFFER;
DROP TABLE IF EXISTS COURSE_DATA;
DROP TABLE IF EXISTS ACADEMIC_PROGRAMS;
DROP TABLE IF EXISTS USERS;

-- Create base tables (no dependencies)
SOURCE tables/users_data.sql;
SOURCE tables/courses_data.sql;
SOURCE tables/student_data.sql;
SOURCE tables/academic_programs.sql;

-- Create tables with one level of dependencies
SOURCE tables/course_offerings.sql;
SOURCE tables/finance_data.sql;
SOURCE tables/student_study_field.sql;

-- Create tables with two levels of dependencies
SOURCE tables/cart_save.sql;
SOURCE tables/registered_table.sql;

-- All tables created successfully
