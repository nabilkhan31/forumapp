# Create database script for Berties books

# Create the database
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