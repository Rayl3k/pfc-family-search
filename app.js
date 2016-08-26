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

var pageTitles = require("./assets/js/pageTitles.js");
var pageTitlesIns = new pageTitles();

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
// Tryout page
app.get('/login', function(req, res) {
    res.render('login.html');
});

// Serve index page
app.get('/', function(req, res){
    var params = pageTitlesIns.getTitle('index');
    res.render('index.html', {
        backgroundImage: params[0],
        highlight: params[1],
        title: params[2],
        titleMobile: params[3],
        subtitleDesktop: params[4],
        subtitleTablet: params[5],
        button: params[6],
        buttonHref: ''
    });
});

app.get('/background', function(req, res) {
    var params = pageTitlesIns.getTitle('background');
    res.render('background.html', {
        backgroundImage: params[0],
        highlight: params[1],
        title: params[2],
        titleMobile: params[3],
        subtitleDesktop: params[4],
        subtitleTablet: params[5],
        button: params[6],
        buttonHref: ''
    });
});

// Get all proposals page
app.get('/proposals', function(req, res) {
    var params = pageTitlesIns.getTitle('proposals');
    res.render('proposals.html', {
        backgroundImage: params[0],
        highlight: params[1],
        title: params[2],
        titleMobile: params[3],
        subtitleDesktop: params[4],
        subtitleTablet: params[5],
        button: params[6],
        buttonHref: ''
    });
});

// Get projectProposals page
app.get('/proposals/:project', function(req, res) {

    var proposal = projectProposalsIns.getExample(req.params.project);
    var goal = proposal[0];
    var requirements = proposal[1];
    var description = proposal[2];
    var complexity = proposal[3];
    var complexityCSS = "width: " + complexity + "%";
    var complexityProgressBar = "";

    if(complexity < 30) {complexity = "Low Complexity"; complexityProgressBar = "progress-bar progress-bar-info";}
    else if(complexity < 70) {complexity = "Medium Complexity"; complexityProgressBar = "progress-bar progress-bar-warning";}
    else {complexity = "High Complexity"; complexityProgressBar = "progress-bar progress-bar-danger";}

    var params = pageTitlesIns.getTitle('/proposals/' + req.params.project);

    res.render('proposalsTemplate.html', {
        goal: goal,
        requirements : requirements,
        description : description,
        complexity : complexity,
        complexityCSS : complexityCSS,
        complexityProgressBar : complexityProgressBar,
        backgroundImage: params[0],
        highlight: params[1],
        title: params[2],
        titleMobile: params[3],
        subtitleDesktop: params[4],
        subtitleTablet: params[5],
        button: params[6],
        buttonHref: '/proposals',
        listKeyword: 'proposals'
    });
});

// Get all examples page
app.get('/examples', isAuthenticated, function(req, res) {
    var params = pageTitlesIns.getTitle('examples');
    res.render('examples.html', {
        backgroundImage: params[0],
        highlight: params[1],
        title: params[2],
        titleMobile: params[3],
        subtitleDesktop: params[4],
        subtitleTablet: params[5],
        button: params[6],
        buttonHref: ''
    });
});

// Surnames example page
app.get('/examples/surnames', isAuthenticated, function(req, res) {
    var europe = countryParametersIns.getCountries("EU");
    var northAmerica = countryParametersIns.getCountries("NA");
    var southAmerica = countryParametersIns.getCountries("SA");
    var oceania = countryParametersIns.getCountries("OC");
    var asia = countryParametersIns.getCountries("AS");
    var africa = countryParametersIns.getCountries("AF");

    var params = pageTitlesIns.getTitle('surnames');

    res.render('surnames.html', {
        europe : europe,
        northAmerica : northAmerica,
        southAmerica : southAmerica,
        oceania : oceania,
        asia : asia,
        africa: africa,
        backgroundImage: params[0],
        highlight: params[1],
        title: params[2],
        titleMobile: params[3],
        subtitleDesktop: params[4],
        subtitleTablet: params[5],
        button: params[6],
        buttonHref: '/examples',
        listKeyword: 'examples'
    });
});

// Facts example page
app.get('/examples/facts', isAuthenticated, function(req, res) {
    var params = pageTitlesIns.getTitle('facts');
    res.render('facts.html', {
        backgroundImage: params[0],
        highlight: params[1],
        title: params[2],
        titleMobile: params[3],
        subtitleDesktop: params[4],
        subtitleTablet: params[5],
        button: params[6],
        buttonHref: '/examples',
        listKeyword: 'examples'
    });
});

// Search example page
app.get('/examples/search', isAuthenticated, function(req, res) {
    var params = pageTitlesIns.getTitle('search');
    res.render('search.html', {
        backgroundImage: params[0],
        highlight: params[1],
        title: params[2],
        titleMobile: params[3],
        subtitleDesktop: params[4],
        subtitleTablet: params[5],
        button: params[6],
        buttonHref: '/examples',
        listKeyword: 'examples'
    });
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
