// Global Variables
var token;
var saveCookie = false;

// Decide if token in local storage / cookie
if (typeof(Storage) !== "undefined") {
    token = localStorage.token ? localStorage.token : '';
} else {
    saveCookie = true;
}

// Remove localStorage / session depending situation
if(localStorage.token && $("#signOut").hasClass('hidden')) localStorage.removeItem('token');
else if(!localStorage.token && $("#signOut").hasClass('visible')) {
    $.ajax({
        type: "POST",
        url: "/token/logout",
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8'
    });
}

// Make log-in call
function serverLogIn(apiToken) {
    $.ajax({
        type: "POST",
        url: "/token/login",
        data: JSON.stringify({token: apiToken}),
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function(data) {
            // Send Event + redirect
            sendEvent('', 'session', 'login');
            window.location.replace(document.location.protocol + '//' + document.location.host + data.redirect);
        }
    });
}

// Function to log-out from everywhere
function serverLogOut() {
    // Delete all local instances of the session
    localStorage.removeItem('token');
    client.invalidateAccessToken();

    // Kill server session
    $.ajax({
        type: "POST",
        url: "/token/logout",
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function(data) {
            // Send Event + redirect
            sendEvent('', 'session', 'logout');
            window.location.href = document.location.protocol + '//' + document.location.host + data.redirect;
        }
    });
}

// Create client instance
var client = new FamilySearch({
    client_id: 'a02j000000E5DXqAAN',
    redirect_uri: document.location.protocol + '//' + document.location.host + '/',
    save_access_token: saveCookie,
    access_token: token,
    auto_expire: true,
    auto_signin: true,
    maxHttpRequestRetries: 2,
    expire_callback: function(data) {
        localStorage.removeItem('token');
        // Kill server session
        $.ajax({
            type: "POST",
            url: "/token/logout",
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            success: function(data) {
                    window.location.href = document.location.protocol + '//' + document.location.host + data.redirect;
            }
        });
    },
    environment: 'production'
});

// Function to logOut
$( document ).ready(function() {
    // Signout function
    $('#signOut').click(function() {
        serverLogOut();
    });
});
