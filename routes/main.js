module.exports = function(app, forumData) {

    // Handle our routes
    app.get('/',function(req,res){
        res.render('index.ejs', forumData)
    });
    app.get('/about', function(req,res){
        res.render('about.ejs', forumData)
    });
    app.get('/topics',function(req,res){
        // retrieves all of the information from topics table
        let sqlquery = "SELECT * FROM topics";
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }
            let newData = Object.assign({}, forumData, {availableTopics: result});
            console.log(newData);
            res.render("topics.ejs", newData);
        })
    });

    // inserts value from search box into database
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
            let newData = Object.assign({}, forumData, {availableTopics: result});
            console.log(newData);
            res.render("topicadded.ejs", newData);
        })
    });

    // returns all information about users from users table
    app.get('/users',function(req,res){
        let sqlquery = "SELECT * FROM users";

        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }
            let newData = Object.assign({}, forumData, {users: result});
            console.log(newData);
            res.render("users.ejs", newData);
        })
    });

    // inserts information from form to create a new user in users table
    app.post('/useradded',function(req,res){
        let sqlquery = "INSERT INTO users (first_name, last_name, username, email) VALUES(?, ?, ?, ?)";
        let newrecord = [req.body.firstname, req.body.lastname, req.body.username, req.body.email];
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                res.redirect('./');
            }
            let newData = Object.assign({}, forumData, {availableTopics: result});
            console.log(newData);
            res.render("useradded.ejs", newData);
        })
    });

    // uses the view post_details_table so that query is cleaner
    // orders posts by the date it was posted, so most recent bubble to top
    app.get('/posts', function (req,res) {
        let sqlquery = "SELECT * FROM post_details_table ORDER BY post_date DESC";

        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }
            // updates forumData with all the posts ordered from most recent to least
            let newData = Object.assign({}, forumData, {users: result});
            console.log(newData);
            res.render("posts.ejs", newData);
        })
    })                                                   
       
    app.get('/addPosts', function (req,res) {
        res.render('addPosts.ejs', forumData);                                                                     
    });

    app.post('/postadded', function (req,res) {
        // saving data in database
        // gets user id and topicid from topic name and username
        let findUserId = "SELECT user_id FROM users WHERE username = '" + req.body.username + "';"
        let findTopicId = "SELECT topic_id FROM topics WHERE topics.name = '" + req.body.topic + "';"
        db.query(findUserId, (err, result) => {
            if (err) {
                return console.error(err.message);
            }

            if (result.length === 0) {
                // User with the specified username does not exist
                res.render('usernotfound.ejs', forumData);
            }

            else {
                let userId = result[0].user_id;
                db.query(findTopicId, (err, result) => {
                    if (err) {
                        return console.error(err.message);
                    }

                    if (result.length === 0) {
                        // Specified topic does not exist
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
                            let newData = Object.assign({}, forumData, {users: req.body.topic});
                            console.log(newData);
                            res.render("postadded.ejs", newData);
                          }
                        });
                    }
                });
            }
        });
    });                                                                                              

    app.get('/search-posts', function (req, res) {
        // returns records which are like the keyword inputted by user, advanced
        let sqlquery = "SELECT * FROM post_details_table WHERE name = '" + req.query.keyword + "' ORDER BY post_date DESC;";
        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }
            let newData = Object.assign({}, forumData, {users: result});
            console.log(newData);
            res.render("search-posts.ejs", newData);
        })
    });
}
