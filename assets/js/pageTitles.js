// titles: INDEX
function titleIndex() {
    var background = "title-zone-index";
    var highlight = "lightbox-text";
    var title = "STUDY OF FAMILY SEARCH API";
    var subtitleDesktop = "Potentiality study of the Family Search API. What could be achieved with this API? Example implementations and some project proposals for future students";
    var subtitleTablet = "Reduced subtitle just to fit the size and rock";
    var button = false;

    // Return parameters
    return [background, highlight, title, subtitleDesktop, subtitleTablet, button];
}

// titles: PROPOSALS
function titleProposals() {
    var background = "titleProposals";
    var highlight = "lightbox-text";
    var title = "PROJECT PROPOSALS";
    var subtitleDesktop = "Wondering what could you implement with the family search API? Check the following project proposals";
    var subtitleTablet = "Reduced subtitle just to fit the size and rock";
    var button = false;

    // Return parameters
    return [background, highlight, title, subtitleDesktop, subtitleTablet, button];
}

// titles: EXAMPLES
function titleExamples() {
    var background = "titleExamples";
    var highlight = "darkbox-text";
    var title = "IMPLEMENTED EXAMPLES";
    var subtitleDesktop = "Play with some examples that illustrate how data from the FamilySearch API can be accessed and played with";
    var subtitleTablet = "Reduced subtitle just to fit the size and rock";
    var button = false;

    // Return parameters
    return [background, highlight, title, subtitleDesktop, subtitleTablet, button];
}

// titles: FACTS
function titleFacts() {
    var background = "exampleFacts";
    var highlight = "lightbox-text";
    var title = "FACTS EVOLUTION";
    var subtitleDesktop = "Check birth, marriage and death occurances around a specific year and place";
    var subtitleTablet = "Reduced subtitle just to fit the size and rock";
    var button = true;

    // Return parameters
    return [background, highlight, title, subtitleDesktop, subtitleTablet, button];
}

// titles: SEARCH
function titleSearch() {
    var background = "exampleSearch";
    var highlight = "lightbox-text";
    var title = "SEARCH EXAMPLE";
    var subtitleDesktop = "Explore the Family Search person search and the deta inside";
    var subtitleTablet = "Reduced subtitle just to fit the size and rock";
    var button = true;

    // Return parameters
    return [background, highlight, title, subtitleDesktop, subtitleTablet, button];
}

// titles: SURNAMES
function titleSurnames() {
    var background = "exampleSurnames";
    var highlight = "lightbox-text";
    var title = "SURNAME NEWBORNS";
    var subtitleDesktop = "Check how many people with a specific surname were born last year";
    var subtitleTablet = "Reduced subtitle just to fit the size and rock";
    var button = true;

    // Return parameters
    return [background, highlight, title, subtitleDesktop, subtitleTablet, button];
}


/* start: FUNCTION TO GET PAGE TITLES */
var pageTitles = function () {
    var self = this;

    /* Get specific example */
    self.getTitle = function (keyword) {
        if(keyword == 'index') return titleIndex();
        else if(keyword == 'proposals') return titleProposals();
        else if(keyword == 'examples') return titleExamples();
        else if(keyword == 'facts') return titleFacts();
        else if(keyword == 'search') return titleSearch();
        else if(keyword == 'surnames') return titleSurnames();
        else if(keyword == '/proposals/example1') return titleSurnames();
        else if(keyword == '/proposals/names-popularity') return titleFacts();
    };

}; /* end: FUNCTION TO RETURN PROPOSALS */

module.exports = pageTitles;
