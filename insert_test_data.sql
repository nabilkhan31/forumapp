# Insert data into the tables

USE myforum;

INSERT INTO users (first_name, last_name, username, email)
VALUES ("John", "Doe", "JohnDoe456","jdoe@gmail.com"),
	     ("Jane", "Smith", "JaneSmith123","jsmith@gmail.com"),
       ("Tony", "Stark", "TonyStark789","tstark@gmail.com"),
       ("Alice", "Johnson", "AliceJ123", "ajohnson@gmail.com"),
       ("Bob", "Williams", "BobW456", "bwilliams@gmail.com"),
       ("Emily", "Davis", "EmilyD789", "edavis@gmail.com"),
       ("John", "Doe", "NotJohnDoe456", "johndoe@gmail.com");;

INSERT INTO topics (name)
VALUES 
    ("Mathematics"),
    ("History"),
    ("Computer Science"),
    ("Physics"),
    ("Literature"),
    ("Biology"),
    ("Chemistry"),
    ("Art"),
    ("Music");

INSERT INTO posts (user_id, topic_id, content)
VALUES (1, 1, 'This is a post about mathematics.'),
       (2, 3, 'I have a question about computer science.'),
       (3, 2, 'Interesting historical fact!');