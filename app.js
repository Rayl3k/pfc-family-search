var express = require('express'),
    app = express(),
    path = require('path');

// Set View Engine
app.use(express.static('views'));

// Set Views folder as normal path route
app.set('views', path.join(__dirname, 'views'));

// Set node_modules folder and assets folder
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Serve index page
app.get('/', function(req, res){
  res.render('index.html');
});

var server = app.listen(process.env.PORT || 8080, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});

////Serve HTML with mustacheExpress
//var mustacheExpress = require('mustache-express');
//app.engine('html', mustacheExpress());
//app.set('view engine', 'html');

////Serve ejs
//app.set('view engine', 'ejs');

////Serve standalone HTML
//app.use(express.static('views'));
