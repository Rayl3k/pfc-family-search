$( document ).ready(function() {

    // reroute when clicked proposal box
    $("#proposal-box-1").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/example1';
    });

    $("#proposal-box-2").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/names-popularity';
    });


    // reroute when clicked examplple box
    $("#implemented-box-1").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/examples/surnames';
    });

    $("#implemented-box-2").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/examples/facts';
    });

});
