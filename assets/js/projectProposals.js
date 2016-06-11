/* start: GET EXAMPLE 1 */
function getExample1() {
    var name = "example 1";
    var title = "This is the title of the example";
    var subtitle = "Breve description of the project described";
    var goal = "Definition of project goal here";
    var requirements = ["req1", "req2", "req3", "req4"];
    var description = [
        "paragram 1 contains as lot of linse it's fine I'd say in the end it's just a breave description.",
        "the second paragraph would appear more complex although it is not. Let's try to do this shit double line, but I was not successful at all.",
        "final paragraph to make this thing a happy ending."
    ];
    var background = "container-fluid example-search-bkg example1";
    var complexity = "25";

    return [name, title, subtitle, goal, requirements, description, background, complexity];

} /* end: GET EXAMPLE 1 */



/* start: FUNCTION TO RETURN PROPOSALS */
var projectProposals = function () {
    var self = this;

    self.getExample = function (keyword) {
        if(keyword == 'example1') return getExample1();
    };
}; /* end: FUNCTION TO RETURN PROPOSALS */

module.exports = projectProposals;
