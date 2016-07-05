// ======================================== //
// CONTROL INJECTION
// ======================================== //
// maping of parameters to scape
var entityMap = {
   "&": "&amp;",
   "<": "&lt;",
   ">": "&gt;",
   '"': '&quot;',
   "'": '&#39;',
   "/": '&#x2F;'
 };

// function to scape
function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
    });
}

/* ================= */
/* INLINE VALIDATION */
/* ================= */

// surname validation
function surnameValidation() {
    var x = escapeHtml($('#surname').val());
    if(x.length == 0) return 1;
    else return 0;
}

// firstYear validation
function firstYearValidation() {
    var x = escapeHtml($('#firstYear').val());
    if(x.length != 4 || isNaN(x)) return 1;
    else return 0;
}

// lastYear validation
function lastYearValidation() {
    var x = escapeHtml($('#lastYear').val());
    var y = escapeHtml($('#firstYear').val());
    if(x != "" && (x.length != 4 || isNaN(x) || x < y)) return 1;
    else return 0;
}

// interval validation
function intervalValidation() {
    var x = escapeHtml($('#lastYear').val());
    var y = escapeHtml($('#firstYear').val());
    var z = escapeHtml($('#interval').val());
    if(x != y && x != "" && (z == "" | isNaN(z))) return 1;
    return 0;
}

// facts-place validation
function factsPlaceValidation() {
    var x = escapeHtml($('#factsPlace').val());
    if(x == "") return 1;
    return 0;
}

// centralYear validation
function centralYearValidation() {
    var x = escapeHtml($('#centralYear').val());
    if(x.length != 4 || isNaN(x)) return 1;
    else return 0;
}

/* =============== */
/* MOTHER FUNCTION */
/* =============== */
function inlineValidation(keyword) {
    if(keyword == 'surname') return surnameValidation();
    else if(keyword == 'firstYear') return firstYearValidation();
    else if(keyword == 'lastYear') return lastYearValidation();
    else if(keyword == 'interval') return intervalValidation();
    else if(keyword == 'factsPlace') return factsPlaceValidation();
    else if(keyword == 'centralYear') return centralYearValidation();
}
