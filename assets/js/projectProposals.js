/* start: name popularity comparison */
function namesPopularity() {
    var description = [
        "This functionality aims to compare how popular names were around a certain period of time and location.",
        "The Names functionality could for example study how many instances of a given group of names were found around a ten year interval for a specific location. Then, the user could compare name by name, the popularity of each one.",
        "Another investigation that this feature could address, is to study if a name saw its popularity increased after certain historical events related to well known persons.",
        "Finally, this feature could also be further expanded with the search popularity comparison done on multiple countries, localizing the names for each one of the searched countries."
    ];
    var complexity = "50";

    // Return parameters
    return [description, complexity];
}

function catalanPortal() {
    var description = [
        "The main idea of this functionality is to create a web portal in Catalan, which could help users browse the FamilySearch data in that language.",
        "The project does not only consist on offering a website in Catalan, but also to localize the language of the returned attributes and genealogical data to Catalan. For example, instead of using the word ‘deceased’, the website could use the term ‘difunt’.",
        "The project could also be extended by limiting the search results to the Catalan region, with the possibility of overriding that restriction.",
        "Of course this project can be adapted to any language and it would be equally interesting."
    ];
    var complexity = "35";

    // Return parameters
    return [description, complexity];
}

function improvedSurnameGeo() {
    var description = [
        "This functionality aims to improve the implemented surname geolocation feature implemented on this website.",
        "The implemented functionality only allows the user to check the surname presence or expansion over a group of countries, while it could be interesting to offer the same functionality at State level, continent level and etcetera.",
        "This project suggests a functionality that would enable the user to roll-up or roll-down the location level being searched and offered the surname presence picture at all those different levels."
    ];
    var complexity = "70";

    // Return parameters
    return [description, complexity];
}

function genealogyHeraldy() {
    var description = [
        "This project proposal aims to reunite two sciences that walked hand by hand on its origins.",
        "The main idea behind the project would be to acquire and collect a huge number of coat of arms and family name pictures, and print them along specific person’s data from FamilySearch.",
        "This project could simply store all the downloaded pictures together or even offer an API to get those coat of arms and family name pictures, on a more organized way."
    ];
    var complexity = "50";

    // Return parameters
    return [description, complexity];
}

/* start: FUNCTION TO RETURN PROPOSALS */
var projectProposals = function () {
    var self = this;

    /* Get specific example */
    self.getExample = function (keyword) {
        if(keyword == 'names-popularity') return namesPopularity();
        else if(keyword == 'catalan-portal') return catalanPortal();
        else if(keyword == 'improved-surname-geo') return improvedSurnameGeo();
        else if(keyword == 'genealogy-heraldy') return genealogyHeraldy();
    };

}; /* end: FUNCTION TO RETURN PROPOSALS */

module.exports = projectProposals;
