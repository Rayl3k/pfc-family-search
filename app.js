var express = require('express'),
    app = express(),
    path = require('path'),
    mustacheExpress = require('mustache-express'),
    cookieParser = require('cookie-parser');

// =================================================== //
// SET VIEWS AND FOLDERS
// =================================================== //
// Set Views folder as normal path route + view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view_engine', 'html');
app.engine('html', mustacheExpress("views/globals", ".html"));

// Set folders + things to be used
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/images', express.static(path.join(__dirname, 'images')));



// =================================================== //
// SET ROUTER PROPERTIES
// =================================================== //
app.use(cookieParser());

// Serve index page
app.get('/', function(req, res){
  res.render('index.html');
});

// Tryout page
app.get('/tryout', isAuthenticated, function(req, res) {
    var products = [{"name" : "paco"}, {"name" : "porras"}, {"name" : "name3"}];
    res.render('tryout.html', {
        product : products
    });
});

function isAuthenticated(req, res, next) {
    if(!req.cookies.FS_ACCESS_TOKEN_1) res.redirect('/');
    else next();
}



// =================================================== //
// SET SERVER PROPERTIES
// =================================================== //
var server = app.listen(process.env.PORT || 8080, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});
