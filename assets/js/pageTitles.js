/* ============================== */
/*           MAIN PAGES           */
/* ============================== */

// titles: INDEX
function titleIndex() {
    var background = "title-zone-index";
    var highlight = "lightbox-text";
    var title = "STUDY OF FAMILYSEARCH API POTENTIAL";
    var titleMobile = "FAMILY SEARCH API POTENTIAL";
    var subtitleDesktop = "This project studies the accessible genalogical data inside the FamilySearch API and provides some examples of its usages";
    var subtitleTablet = "Study of the accessible genealogical data inside the FamilySearch API and possible usages";
    var button = false;

    // Return parameters
    return [background, highlight, title, titleMobile, subtitleDesktop, subtitleTablet, button];
}

// titles: BACKGROUND
function titleBackground() {
    var background = "titleBackground";
    var highlight = "lightbox-text";
    var title = "PROJECT BACKGROUND";
    var titleMobile = "PROJECT BACK-GROUND";
    var subtitleDesktop = "Short introduction to the project objectives and motivations";
    var subtitleTablet = "Introduction to the objectives and motivations";
    var button = false;

    // Return parameters
    return [background, highlight, title, titleMobile, subtitleDesktop, subtitleTablet, button];
}

// titles: PROPOSALS
function titleProposals() {
    var background = "titleProposals";
    var highlight = "lightbox-text";
    var title = "PROJECT PROPOSALS";
    var titleMobile = "PROJECT PROPOSALS";
    var subtitleDesktop = "Collection of project proposals that interact with the FamilySearch API for future students";
    var subtitleTablet = "Collection of project proposals for future students";
    var button = false;

    // Return parameters
    return [background, highlight, title, titleMobile, subtitleDesktop, subtitleTablet, button];
}

// titles: EXAMPLES
function titleExamples() {
    var background = "titleExamples";
    var highlight = "lightbox-text";
    var title = "IMPLEMENTED EXAMPLES";
    var titleMobile = "IMPLEMENTED EXAMPLES";
    var subtitleDesktop = "Explore the FamilySearch accessible data and API potential through three examples"
    var subtitleTablet = "Explore the Familysearch API through examples";
    var button = false;

    // Return parameters
    return [background, highlight, title, titleMobile, subtitleDesktop, subtitleTablet, button];
}

// titles: SEARCH
function titleSearch() {
    var background = "exampleSearch";
    var highlight = "lightbox-text";
    var title = "PERSON SEARCH";
    var titleMobile = "PERSON SEARCH";
    var subtitleDesktop = "Explore the persons inside the Family Tree and check their genealogical data";
    var subtitleTablet = "Explore the Family Tree";
    var button = true;

    // Return parameters
    return [background, highlight, title, titleMobile, subtitleDesktop, subtitleTablet, button];
}

// titles: SURNAMES
function titleSurnames() {
    var background = "exampleSurnames";
    var highlight = "lightbox-text";
    var title = "SURNAMES EXPANSION";
    var titleMobile = "SURNAMES EXPANSION";
    var subtitleDesktop = "Study how many instances of a given surname can be found in a specific set of countries over the course of time";
    var subtitleTablet = "Study the geographical evolution of a given surname";
    var button = true;

    // Return parameters
    return [background, highlight, title, titleMobile, subtitleDesktop, subtitleTablet, button];
}

// titles: FACTS
function titleFacts() {
    var background = "exampleFacts";
    var highlight = "lightbox-text";
    var title = "FACTS EVOLUTION";
    var titleMobile = "FACTS EVOLUTION";
    var subtitleDesktop = "Check how birth, marriage and death occurances changed around a period of time for a specific country or location";
    var subtitleTablet = "Evolution of birth, marriage and death occurances";
    var button = true;

    // Return parameters
    return [background, highlight, title, titleMobile, subtitleDesktop, subtitleTablet, button];
}


/* ============================== */
 /*           PROPOSALS           */
/* ============================== */
function namesPopularity() {

}

/* ============================== */
 /*        RETURN PARAMS          */
/* ============================== */

/* start: FUNCTION TO GET PAGE TITLES */
var pageTitles = function () {
    var self = this;

    /* Get specific example */
    self.getTitle = function (keyword) {
        if(keyword == 'index') return titleIndex();
        else if(keyword == "background") return titleBackground();
        else if(keyword == 'proposals') return titleProposals();
        else if(keyword == 'examples') return titleExamples();
        else if(keyword == 'search') return titleSearch();
        else if(keyword == 'surnames') return titleSurnames();
        else if(keyword == 'facts') return titleFacts();
        else if(keyword == '/proposals/names-popularity') return titleFacts();
    };

}; /* end: FUNCTION TO RETURN PROPOSALS */

module.exports = pageTitles;
