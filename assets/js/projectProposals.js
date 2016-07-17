/* start: GET EXAMPLE 1 */
function getExample1() {
    var goal = "Definition of project goal here";
    var requirements = ["req1", "req2", "req3", "req4"];
    var description = [
        "paragram 1 contains as lot of linse it's fine I'd say in the end it's just a breave description.",
        "the second paragraph would appear more complex although it is not. Let's try to do this shit double line, but I was not successful at all.",
        "final paragraph to make this thing a happy ending."
    ];
    var complexity = "25";

    // Return parameters
    return [goal, requirements, description, complexity];
}

/* start: name popularity comparison */
function getNamesPopularity() {
    var goal = "The goal of this project is being able to compare for a set of names which one was the most common one for the past 10 years. Additionaly the user can also specify a specific country to look into.";
    var requirements = ["req1", "req2", "req3", "req4"];
    var description = [
        "paragram 1 contains as lot of linse it's fine I'd say in the end it's just a breave description.",
        "the second paragraph would appear more complex although it is not. Let's try to do this shit double line, but I was not successful at all.",
        "final paragraph to make this thing a happy ending."
    ];
    var complexity = "20";

    // Return parameters
    return [goal, requirements, description, complexity];
}

/* start: FUNCTION TO RETURN PROPOSALS */
var projectProposals = function () {
    var self = this;

    /* Get specific example */
    self.getExample = function (keyword) {
        if(keyword == 'example1') return getExample1();
        else if(keyword == 'names-popularity') return getNamesPopularity();
    };

}; /* end: FUNCTION TO RETURN PROPOSALS */

module.exports = projectProposals;
