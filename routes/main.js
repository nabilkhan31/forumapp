module.exports = function(app, forumData) {

    // Handle our routes
    app.get('/',function(req,res){
        res.render('index.ejs', forumData)
    });
    app.get('/about', function(req,res){
        res.render('about.ejs', forumData)
    });
    app.get('/topics',function(req,res){
        let sqlquery = "SELECT * FROM topics";

        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }
            // updates forumData to have books from the db which are less than £20
            let newData = Object.assign({}, forumData, {availableTopics: result});
            console.log(newData);
            res.render("topics.ejs", newData);
        })
    });

    app.post('/topicadded',function(req,res){
        let sqlquery = "INSERT INTO topics (name) VALUES(?)";
        let newrecord;
        if (req.body.topicname === "") {
            res.send("You can't have an empty topic name");
        } else {
            newrecord = [req.body.topicname];
        }
        
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                res.redirect('./');
            }
            // updates forumData to have books from the db which are less than £20
            let newData = Object.assign({}, forumData, {availableTopics: result});
            console.log(newData);
            res.render("topicadded.ejs", newData);
        })
    });
    app.get('/users',function(req,res){
        let sqlquery = "SELECT * FROM users";

        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }
            // updates forumData to have books from the db which are less than £20
            let newData = Object.assign({}, forumData, {users: result});
            console.log(newData);
            res.render("users.ejs", newData);
        })
    });

    app.post('/useradded',function(req,res){
        let sqlquery = "INSERT INTO users (first_name, last_name, username, email) VALUES(?, ?, ?, ?)";
        let newrecord = [req.body.firstname, req.body.lastname, req.body.username, req.body.email];
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                res.redirect('./');
            }
            // updates forumData to have books from the db which are less than £20
            let newData = Object.assign({}, forumData, {availableTopics: result});
            console.log(newData);
            res.render("useradded.ejs", newData);
        })
    });

    app.get('/posts', function (req,res) {
        let sqlquery = "SELECT posts.content,DATE(posts.timestamp) AS post_date,TIME(posts.timestamp) AS post_time,topics.name,users.first_name,users.last_name,users.username FROM posts INNER JOIN topics ON posts.topic_id = topics.topic_id INNER JOIN users ON posts.user_id = users.user_id ORDER BY posts.timestamp DESC;"

        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }
            // updates forumData with all the books which have the characters from req.query.keyword
            let newData = Object.assign({}, forumData, {users: result});
            console.log(newData);
            res.render("posts.ejs", newData);
        })
    })
        // res.render('posts.ejs', forumData);                                                           
       
    app.get('/addPosts', function (req,res) {
        res.render('addPosts.ejs', forumData);                                                                     
    });
    app.post('/postadded', function (req,res) {
        // saving data in database
        let findUserId = "SELECT user_id FROM users WHERE username = '" + req.body.username + "';"
        let findTopicId = "SELECT topic_id FROM topics WHERE topics.name = '" + req.body.topic + "';"
        db.query(findUserId, (err, result) => {
            if (err) {
                return console.error(err.message);
            }

            if (result.length === 0) {
                // User with the specified username does not exist
                res.render('usernotfound.ejs', forumData);
                // return res.status(400).send("User not found.");
            }

            else {
                let userId = result[0].user_id;
                db.query(findTopicId, (err, result) => {
                    if (err) {
                        return console.error(err.message);
                    }

                    if (result.length === 0) {
                        // User with the specified username does not exist
                        res.render('topicnotfound.ejs', forumData);
                    }
                    else {
                        let topicId = result[0].topic_id;
                        let sqlquery = "INSERT INTO posts (user_id, topic_id, content) VALUES (?,?,?)";
                        // execute sql query
                        let newrecord = [userId, topicId, req.body.content];
                        db.query(sqlquery, newrecord, (err, result) => {
                          if (err) {
                            return console.error(err.message);
                          }
                          else {
                            // sends book details
                            let newData = Object.assign({}, forumData, {users: req.body.topic});
                            console.log(newData);
                            res.render("postadded.ejs", newData);
                            // res.send(' This book is added to database, Name: ' + req.body.username + ', Author: ' + req.body.topic + ', Price: '+ req.body.content);
                          }
                        });
                    }
                });
            }
        });
    });                                                                                              

    app.get('/search-posts', function (req, res) {
        // returns records which are like the keyword inputted by user, advanced

        let sqlquery = "SELECT posts.content,DATE(posts.timestamp) AS post_date,TIME(posts.timestamp) AS post_time,topics.name,users.first_name,users.last_name,users.username FROM posts INNER JOIN topics ON posts.topic_id = topics.topic_id INNER JOIN users ON posts.user_id = users.user_id WHERE topics.name = '" + req.query.keyword + "' ORDER BY posts.timestamp DESC;";

        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }
            // updates forumData with all the books which have the characters from req.query.keyword
            let newData = Object.assign({}, forumData, {users: result});
            console.log(newData);
            res.render("search-posts.ejs", newData);
        })
    });
}
