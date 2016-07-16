// Make log-in call
function serverLogIn(apiToken) {
    $.ajax({
        type: "POST",
        url: "/token/login",
        data: {token: apiToken},
        dataType: 'application/json'
    });
}

function serverLogOut() {
    client.invalidateAccessToken();
    $.ajax({
        type: "POST",
        url: "/token/logout"
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

        $("#loading-container").fadeOut("fast");
        setTimeout(function() {
            window.location = document.location.protocol + '//' + document.location.host + '/';
        }, 300);
    });
});
