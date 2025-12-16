#!/bin/bash

# Create all tables
sudo mariadb sandbox < tables/create_all_tables.sql

# Insert all data  
sudo mariadb sandbox < rawdata/insert_all_data.sql
