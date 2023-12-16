# Create database script for Berties books

# Create the database
DROP DATABASE myforum;
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

CREATE TABLE users (
	user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE
);

INSERT INTO users (first_name, last_name, username, email)
VALUES ("John", "Doe", "JohnDoe456","jdoe@gmail.com"),
	   ("Jane", "Smith", "JaneSmith123","jsmith@gmail.com"),
       ("Tony", "Stark", "TonyStark789","tstark@gmail.com");

INSERT INTO users (first_name, last_name, username, email)
VALUES ("John", "Doe", "JohnDoe454","jdoe@gmail.cos");
