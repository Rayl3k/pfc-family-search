$( document ).ready(function() {

    // Hover on thumbnail
    $('.thumbnail').hover(
       function(){
           $(this).css('background-color', '#eff4f8');
       },
       function(){
           $(this).css('background-color', '#FFF');
       }
   );

    // reroute when clicked proposal box
    $("#proposal-box-1").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/names-popularity';
    });

    $("#proposal-box-2").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/catalan-portal';
    });

    $("#proposal-box-3").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/improved-surname-geo';
    });

    $("#proposal-box-4").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/genealogy-heraldy';
    });

    $("#proposal-box-5").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/indexing-projects';
    });

    $("#proposal-box-6").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/lds-church';
    });

    $("#proposal-box-7").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/ancestry-diversity';
    });

    $("#proposal-box-8").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/collections';
    });

    $("#proposal-box-9").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/natality-mortality';
    });

    $("#proposal-box-10").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/marriages';
    });

    $("#proposal-box-11").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/schindler';
    });

    $("#proposal-box-12").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/great-depression';
    });

    $("#proposal-box-13").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/social-media';
    });

    $("#proposal-box-14").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/fs-vs-reality';
    });

    $("#proposal-box-15").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/genealogies';
    });

    $("#proposal-box-16").click(function() {
        window.location = document.location.protocol + '//' + document.location.host + '/proposals/duplicates';
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

    /*$(".proposal-box").click(function() {
        alert("Specific view for proposals still not ni place!");
    });

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
    });*/
});
