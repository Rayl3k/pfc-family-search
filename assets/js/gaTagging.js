// Function get dynamic category based on path
function getCategory() {
    var currentPage = location.pathname.split('?')[0].slice(1);
    currentPage = currentPage != '' ? currentPage : 'home';
    return currentPage;
}

// Send event based on defined parameters
function sendEvent(category, action, label, value) {
    category = category != '' ? category : getCategory();
    action = action != '' ? action : null;
    label = action != '' ? label : null;
    value = typeof value !== 'undefined' ? value : null;

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

    // Tagging proposal-box
    $('.proposal-box').click(function () {
        var label = 'future_proposal_' + $(this).attr('id').split('-')[2];
        sendEvent('proposals', 'future_proposals', label);
    });

    // Tagging implemented-box
    $('.implemented-box').click(function () {
        var label = 'implemented_example_' + $(this).attr('id').split('-')[2];
        sendEvent('', 'implemented_examples', label);
    });
});
