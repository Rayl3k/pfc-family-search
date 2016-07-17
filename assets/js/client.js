// Global Variables
var token;
var saveCookie = false;

// Decide if token in local storage / cookie
if (typeof(Storage) !== "undefined") {
    token = localStorage.token ? localStorage.token : '';
} else {
    saveCookie = true;
}

// Show signout if required
if(localStorage.token) {
    $('#signOut').css('display', 'block');
    $('#signOut').fadeIn('fast');
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
    client.invalidateAccessToken();
    localStorage.removeItem('token');

    // Kill server session
    $.ajax({
        type: "POST",
        url: "/token/logout",
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function(data) {
            // Send Event + redirect
            sendEvent('', 'session', 'logout');
            window.location.replace(document.location.protocol + '//' + document.location.host + data.redirect);
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
    expire_callback: function(data) {
        localStorage.removeItem('token');
        // Kill server session
        $.ajax({
            type: "POST",
            url: "/token/logout",
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            success: function(data) {
                window.location.replace(document.location.protocol + '//' + document.location.host + data.redirect);
            }
        });
    },
    environment: 'sandbox'
});

// Function to logOut
$( document ).ready(function() {
    // Signout function
    $('#signOut').click(function() {
        serverLogOut();
    });
});
