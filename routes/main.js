module.exports = function(app, forumData) {

    // Handle our routes
    app.get('/',function(req,res){
        res.render('index.ejs', forumData)
    });
    app.get('/about', function(req,res){
        res.render('about.ejs', forumData)
    });
    app.get('/topics',function(req,res){
        res.render('topics.ejs', forumData);
    });
    app.get('/users',function(req,res){
        res.render("users.ejs", forumData);
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
