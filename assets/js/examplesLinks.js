$( document ).ready(function() {

    // reroute when clicked proposal or examplple box
    $(".implemented-box-1").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/search';
    });

    $(".implemented-box-2").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/examples/names-popularity';
    });

});
