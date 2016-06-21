$( document ).ready(function() {

    // reroute when clicked proposal or examplple box
    $(".proposal-box-1").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/example1';
    });

    $(".proposal-box-2").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/names-popularity';
    });

});
