// Function get dynamic category based on path
function getCategory() {
    var currentPage = location.pathname.split('?')[0].slice(1);
    currentPage = currentPage != '' ? currentPage : 'home';
    return currentPage;
}

// Send event based on defined parameters
function sendEvent(category, action, label, value) {
    console.log(getCategory());
    category = category != '' ? category : getCategory();
    action = action != '' ? action : null;
    label = action != '' ? label : null;
    value = typeof action !== 'undefined' ? value : null;

    ga('send', 'event', category, action, label)
}

$( document ).ready(function() {
    // Tagging home column sections
    $('.home-product').click(function () {
        var dest = $(this).attr('href').slice(1);
        sendEvent('home', 'column_sections', dest);
    });

    // Navbar traffic tagging
    $('.navbar-link').click(function () {
        var dest = $(this).attr('href').slice(1);
        dest = dest != '' ? dest : 'home';
        sendEvent('', 'navbar', dest);
    });
});
