# Create database script for Berties books

# Create the database
-- CREATE DATABASE myBookshop;
-- USE myBookshop;

-- # Create the tables
-- CREATE TABLE books (id INT AUTO_INCREMENT,name VARCHAR(50),price DECIMAL(5, 2) unsigned,PRIMARY KEY(id));

CREATE DATABASE myforum;
USE myforum;
drop user appuser@localhost;
flush privileges;
CREATE USER 'appuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'app2027';
GRANT ALL PRIVILEGES ON myforum.* TO 'appuser'@'localhost';
CREATE TABLE topics (
	topic_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50)
);
ALTER TABLE topics
MODIFY name VARCHAR(50) NOT NULL;
INSERT INTO topics (name) VALUES("Mathematics"), ("History"), ("Computer Science");