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

});

// launch preload images
$(window).load(function() {
    $.preload(
      '/images/headers/16_duplicates-min.png',
      '/images/headers/15_genealogies-min.png',
      '/images/headers/14_fsReality-min.png',
      '/images/headers/03_surnames-min.png',
      '/images/headers/12_29crack-min.png',
      '/images/headers/11_schindler-min.png',
      '/images/headers/10_marriages-min.png',
      '/images/headers/09_natalityMortality-min.png',
      '/images/headers/08_collections-min.png',
      '/images/headers/07_ancestry-min.png',
      '/images/headers/06_lds2-min.png',
      '/images/headers/05_indexing-min.png',
      '/images/headers/04_heraldry-min.png',
      '/images/headers/13_socialMedia-min.png',
      '/images/headers/02_catalan-min.png',
      '/images/headers/01_names-min.png',
      '/images/headers/surnames2-min.png',
      '/images/headers/facts2-min.png',
      '/images/headers/search2-min.png'
    );
});
