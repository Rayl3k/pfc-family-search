// Function is called when the user clicks the "Sign In" button.
function signIn() {
    // Request an access token (login)
    client.getAccessToken().then(function(testTokenValue){
        // Save token in local storage
        localStorage.token = testTokenValue;

        // Create server sid secure cookie
        serverLogIn(testTokenValue);
    })
    // Error handling
    .catch(function(e){
        var error = 'login_error_' + String(e.message).replace(' ', '_').toLowerCase();
        sendEvent('', 'session', error);
        location.reload();
    });
}

$( document ).ready(function() {
    // START: Stop focus on button press
    $(".btn").mouseup(function(){
        $(this).blur();
    }); // -- end: focus on button press

    // START: Sign-in-back
    $('#sign-in-back').click(function() {
        if(document.referrer) history.back();
        else window.location.href = document.location.protocol + '//' + document.location.host + '/';
    });

    // START: sign-in button
    $('#sign-in').click(function() {

        // Set properties for new loading gif container
        var height = $(window).height();
        var move = (height/2)-110;
        $("#wrap").css('transform', 'translateY(+' + move + 'px)');

        // Fade out main container, fade in logging
        $("#main-container").fadeOut("fast");
        $("#loading-container").fadeIn("slow");

        // Launch signIn function
        signIn();

    }); // -- end: sign-in button

    // START: Listen on window resize to keep content aligned
    $(window).resize(function () {
        if($("#loading-container").css('display') != "none") {
            var height = $(window).height();
            var move = (height/2)-66;
            $("#wrap").css('transform', 'translateY(+' + move + 'px)');
        }
    }); // END: Listen on window resize
});
