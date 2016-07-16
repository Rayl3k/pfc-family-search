// Show signout if required
if(cookiesUtil.hasItem('logged')) {
    $('#signOut').css('display', 'block');
    $('#signOut').fadeIn('fast');
    console.log("HIHO");
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
            window.location.replace(document.location.protocol + '//' + document.location.host + data.redirect);
        }
    });
}

// Function to log-out from everywhere
function serverLogOut() {
    client.invalidateAccessToken();
    cookiesUtil.removeItem('logged');
    $.ajax({
        type: "POST",
        url: "/token/logout",
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        success: function(data) {
            window.location.replace(document.location.protocol + '//' + document.location.host + data.redirect);
        }
    });
}

// Setup the SDK client
var client = new FamilySearch({
  client_id: 'a02j000000E5DXqAAN',
  redirect_uri: document.location.protocol + '//' + document.location.host + '/',
  save_access_token: true,
  environment: 'sandbox'
});

// Function to logOut
$( document ).ready(function() {
    // Signout function
    $('#signOut').click(function() {
        serverLogOut();
    });
});
