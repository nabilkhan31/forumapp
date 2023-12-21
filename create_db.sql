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

CREATE TABLE posts (
    post_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    topic_id INT,
    content TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (topic_id) REFERENCES topics(topic_id)
);

CREATE VIEW post_details_table AS
SELECT posts.content,DATE(posts.timestamp) AS post_date,TIME(posts.timestamp) AS post_time,topics.name,users.first_name,users.last_name,users.username 
FROM posts 
INNER JOIN topics 
ON posts.topic_id = topics.topic_id 
INNER JOIN users 
ON posts.user_id = users.user_id;

