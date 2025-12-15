#!/bin/bash

# Create all tables
sudo mariadb -p sandbox < tables/create_all_tables.sql

# Insert all data  
sudo mariadb -p sandbox < rawdata/insert_all_data.sql
