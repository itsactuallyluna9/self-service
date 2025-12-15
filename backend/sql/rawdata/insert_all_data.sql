-- Insert All Data Script
-- This script inserts all data in the correct order respecting foreign key dependencies
-- To run from backend/sql directory: mariadb -u username -p database_name < rawdata/insert_all_data.sql
-- Note: Run tables/create_all_tables.sql before running this script
-- ~Luna

-- Insert base tables (no dependencies)
SOURCE rawdata/create_accounts.sql;
SOURCE rawdata/2526_courses.sql;

-- Insert tables with dependencies
SOURCE rawdata/insert_financial_data.sql;

-- All data inserted successfully
