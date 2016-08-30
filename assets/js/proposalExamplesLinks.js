$( document ).ready(function() {

    // reroute when clicked proposal box
    $("#proposal-box-1").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/names-popularity';
    });

    $("#proposal-box-2").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/ancestry-diversity';
    });


    // reroute when clicked examplple box depending on current path
    /*
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
    */

    /*$(".proposal-box").click(function() {
        alert("Specific view for proposals still not ni place!");
    });*/

    $("#implemented-box-1").click(function() {
        var path = location.pathname.split('?')[0].slice(1);
        var redirect = path == "proposals" ? '' : '/examples/search';
        if(redirect != '') window.location = document.location.protocol + '//' + document.location.host + redirect;
        else alert("Specific view for proposals still not ni place!");
    });

    $("#implemented-box-2").click(function() {
        var path = location.pathname.split('?')[0].slice(1);
        var redirect = path == "proposals" ? '' : '/examples/surnames';
        if(redirect != '') window.location = document.location.protocol + '//' + document.location.host + redirect;
        else alert("Specific view for proposals still not ni place!");
    });

    $("#implemented-box-3").click(function() {
        var path = location.pathname.split('?')[0].slice(1);
        var redirect = path == "proposals" ? '' : '/examples/facts';
        if(redirect != '') window.location = document.location.protocol + '//' + document.location.host + redirect;
        else alert("Specific view for proposals still not ni place!");
    });
});
