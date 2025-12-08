-- Create Sandbox User
-- This'll create a sandbox database and a user with full access to it.
-- Really used for testing/development purposes, production should ideally have its own setup.
-- ~Luna
CREATE DATABASE IF NOT EXISTS sandbox;
CREATE USER IF NOT EXISTS 'selfservice'@'%' IDENTIFIED BY 'password';
GRANT ALL ON sandbox.* TO 'selfservice'@'%';
FLUSH PRIVILEGES;
