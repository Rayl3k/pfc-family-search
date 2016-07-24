$( document ).ready(function() {

    // reroute when clicked proposal box
    $("#proposal-box-1").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/example1';
    });

    $("#proposal-box-2").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/names-popularity';
    });


    // reroute when clicked examplple box depending on current path
    $("#implemented-box-1").click(function() {
        var path = location.pathname.split('?')[0].slice(1);
        var redirect = path == "proposals" ? '/proposals/search' : '/examples/search';
        window.location = document.location.protocol + '//' + document.location.host + redirect;
    });

    $("#implemented-box-2").click(function() {
        var path = location.pathname.split('?')[0].slice(1);
        var redirect = path == "proposals" ? '/proposals/surnames' : '/examples/surnames';
        window.location = document.location.protocol + '//' + document.location.host + redirect;
    });

    $("#implemented-box-3").click(function() {
        var path = location.pathname.split('?')[0].slice(1);
        var redirect = path == "proposals" ? '/proposals/facts' : '/examples/facts';
        window.location = document.location.protocol + '//' + document.location.host + redirect;
    });
});
