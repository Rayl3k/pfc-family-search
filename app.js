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
    var logged = isLogged(req);
    res.render('index.html', {
        backgroundImage: params[0],
        highlight: params[1],
        title: params[2],
        titleMobile: params[3],
        subtitleDesktop: params[4],
        subtitleTablet: params[5],
        button: params[6],
        buttonHref: '',
        logged
    });
});

app.get('/background', function(req, res) {
    var params = pageTitlesIns.getTitle('background');
    var logged = isLogged(req);
    res.render('background.html', {
        backgroundImage: params[0],
        highlight: params[1],
        title: params[2],
        titleMobile: params[3],
        subtitleDesktop: params[4],
        subtitleTablet: params[5],
        button: params[6],
        buttonHref: '',
        logged
    });
});

// Get all proposals page
app.get('/proposals', function(req, res) {
    var params = pageTitlesIns.getTitle('proposals');
    var logged = isLogged(req);
    res.render('proposals.html', {
        backgroundImage: params[0],
        highlight: params[1],
        title: params[2],
        titleMobile: params[3],
        subtitleDesktop: params[4],
        subtitleTablet: params[5],
        button: params[6],
        buttonHref: '',
        logged
    });
});

// Get projectProposals page
app.get('/proposals/:project', function(req, res) {
    var proposal = projectProposalsIns.getExample(req.params.project);
    var logged = isLogged(req);
    var description = proposal[0];
    var complexity = proposal[1];
    var complexityCSS = "width: " + complexity + "%";
    var complexityProgressBar = "";

    if(complexity < 40) {complexity = "Low Complexity (" + complexity + "%)"; complexityProgressBar = "progress-bar progress-bar-info";}
    else if(complexity < 80) {complexity = "Medium Complexity (" + complexity + "%)"; complexityProgressBar = "progress-bar progress-bar-warning";}
    else {complexity = "High Complexity (" + complexity + "%)"; complexityProgressBar = "progress-bar progress-bar-danger";}

    var params = pageTitlesIns.getTitle(req.params.project);

    res.render('proposalsTemplate.html', {
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
        listKeyword: 'proposals',
        logged
    });
});

// Get all examples page
app.get('/examples', isAuthenticated, function(req, res) {
    var params = pageTitlesIns.getTitle('examples');
    var logged = isLogged(req);
    res.render('examples.html', {
        backgroundImage: params[0],
        highlight: params[1],
        title: params[2],
        titleMobile: params[3],
        subtitleDesktop: params[4],
        subtitleTablet: params[5],
        button: params[6],
        buttonHref: '',
        logged
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
    var logged = isLogged(req);

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
        listKeyword: 'examples',
        logged
    });
});

// Facts example page
app.get('/examples/facts', isAuthenticated, function(req, res) {
    var params = pageTitlesIns.getTitle('facts');
    var logged = isLogged(req);
    res.render('facts.html', {
        backgroundImage: params[0],
        highlight: params[1],
        title: params[2],
        titleMobile: params[3],
        subtitleDesktop: params[4],
        subtitleTablet: params[5],
        button: params[6],
        buttonHref: '/examples',
        listKeyword: 'examples',
        logged
    });
});

// Search example page
app.get('/examples/search', isAuthenticated, function(req, res) {
    var params = pageTitlesIns.getTitle('search');
    var logged = isLogged(req);
    res.render('search.html', {
        backgroundImage: params[0],
        highlight: params[1],
        title: params[2],
        titleMobile: params[3],
        subtitleDesktop: params[4],
        subtitleTablet: params[5],
        button: params[6],
        buttonHref: '/examples',
        listKeyword: 'examples',
        logged
    });
})

// =================================================== //
// SESSION MANAGEMENT
// =================================================== //
// Set req.session
app.post('/token/login', function(req, res) {
    req.session.logged = req.session.logged || req.body.token;
    res.send({redirect : '/examples'});
});

// Delete req.session
app.post('/token/logout', function(req, res) {
    if(req.session.isPopulated) req.session = null;
    res.send({redirect : '/'});
});

// =================================================== //
// AUTHENTICATION VALIDATION
// =================================================== //
function isAuthenticated(req, res, next) {
    if(req.session.isPopulated) next();
    else res.redirect('/login');
}

function isLogged(req) {
    if(req.session.isPopulated) return 'visible';
    else return 'hidden';
}

// =================================================== //
// SET SERVER PROPERTIES
// =================================================== //
var server = app.listen(process.env.PORT || 8080, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});
