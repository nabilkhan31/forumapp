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
            // updates shopData to have books from the db which are less than £20
            let newData = Object.assign({}, forumData, {availableTopics: result});
            console.log(newData);
            res.render("topics.ejs", newData);
        })
    });
    app.get('/users',function(req,res){
        let sqlquery = "SELECT * FROM users";

        db.query(sqlquery, (err, result) => {
            if (err) {
                res.redirect('./');
            }
            // updates shopData to have books from the db which are less than £20
            let newData = Object.assign({}, forumData, {users: result});
            console.log(newData);
            res.render("users.ejs", newData);
        })
        // res.render("users.ejs", forumData);
    });
    // app.get('/search-result', function (req, res) {
    //     //searching in the database
    //     res.send("You searched for: " + req.query.keyword);
    // });
    app.get('/posts', function (req,res) {
        res.render('posts.ejs', forumData);                                                                     
    });                                                                                                 
    // app.post('/registered', function (req,res) {
    //     // saving data in database
    //     res.send(' Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email);                                                                              
    // }); 
}
