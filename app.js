// =================================================== //
// CREATE ALL REQUIRED VARIABLES
// =================================================== //
var express = require('express'),
    app = express(),
    path = require('path'),
    mustacheExpress = require('mustache-express'),
    cookieSession = require('cookie-session'),
    bodyParser = require('body-parser');

var projectProposals = require("./assets/js/projectProposals.js");
var projectProposalsIns = new projectProposals();

var countryParameters = require("./assets/js/countryParameters.js");
var countryParametersIns = new countryParameters();

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
// COOKIES MANAGEMENT + POST DATA
// =================================================== //
// Use cookie-session
app.use(cookieSession({
    name: 'session',
    keys: ['misaholdrin', 'tommarvoloriddle']
}));

// Prepare server to recieve json bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// =================================================== //
// SET ROUTER PROPERTIES
// =================================================== //
// Serve index page
app.get('/', function(req, res){
    res.render('index.html');
});

// Tryout page
app.get('/login', function(req, res) {
    res.render('login.html');
});

// Get all proposals page
app.get('/proposals', function(req, res) {
    res.render('proposals.html');
});

// Get projectProposals page
app.get('/proposals/:project', function(req, res) {

    var caption1 = projectProposalsIns.getExample(req.params.project);
    var name = caption1[0];
    var title = caption1[1];
    var subtitle = caption1[2];
    var goal = caption1[3];
    var requirements = caption1[4];
    var description = caption1[5];
    var background = caption1[6];
    var backgroundText = caption1[7];
    var complexity = caption1[8];
    var complexityCSS = "width: " + complexity + "%";
    var complexityProgressBar = "";

    if(complexity < 30) {complexity = "Low Complexity"; complexityProgressBar = "progress-bar progress-bar-info";}
    else if(complexity < 70) {complexity = "Medium Complexity"; complexityProgressBar = "progress-bar progress-bar-warning";}
    else {complexity = "High Complexity"; complexityProgressBar = "progress-bar progress-bar-danger";}

    res.render('proposalsTemplate.html', {
        name : name,
        title : title,
        subtitle : subtitle,
        goal: goal,
        requirements : requirements,
        description : description,
        background : background,
        backgroundText : backgroundText,
        complexity : complexity,
        complexityCSS : complexityCSS,
        complexityProgressBar : complexityProgressBar
    });
});

// Get all examples page
app.get('/examples', isAuthenticated, function(req, res) {
    res.render('examples.html');
});

// Surnames example page
app.get('/examples/surnames', isAuthenticated, function(req, res) {
    var europe = countryParametersIns.getCountries("EU");
    var northAmerica = countryParametersIns.getCountries("NA");
    var southAmerica = countryParametersIns.getCountries("SA");
    var oceania = countryParametersIns.getCountries("OC");
    var asia = countryParametersIns.getCountries("AS");
    var africa = countryParametersIns.getCountries("AF");

    res.render('surnames.html', {
        europe : europe,
        northAmerica : northAmerica,
        southAmerica : southAmerica,
        oceania : oceania,
        asia : asia,
        africa: africa
    });
});

// Facts example page
app.get('/examples/facts', isAuthenticated, function(req, res) {
    res.render('facts.html');
});

// Search example page
app.get('/examples/search', isAuthenticated, function(req, res) {
    res.render('search.html');
})

// =================================================== //
// SESSION MANAGEMENT
// =================================================== //
// Set req.session
app.post('/token/login', function(req, res) {
    req.session.logged = req.session.logged || req.body.token;
    res.end('{"redirect" : "/examples"}');
});

// Delete req.session
app.post('/token/logout', function(req, res) {
    req.session = null;
    res.end('{"redirect" : "/"}');
});

// =================================================== //
// AUTHENTICATION VALIDATION
// =================================================== //
function isAuthenticated(req, res, next) {
    if(req.session.isPopulated) next();
    else res.redirect('/login');
}

// =================================================== //
// SET SERVER PROPERTIES
// =================================================== //
var server = app.listen(process.env.PORT || 8080, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});
