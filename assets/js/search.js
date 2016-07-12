// Global variables to manage the search
var start, count, params;
var resultsLength = 15;
var context = "";

// Function to iterate over an object parameters
var forEach = function(obj, iterator, context) {
    if (obj == null) { // also catches undefined
        return;
    }
    if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
        for (var i = 0, length = obj.length; i < length; i++) {
            if (iterator.call(context, obj[i], i, obj) === {}) {
                return;
            }
        }
    } else {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (iterator.call(context, obj[key], key, obj) === {}) {
                    return;
                }
            }
        }
    }
};

// Remove empty properties from objects
function removeEmptyProperties(obj) {
    forEach(obj, function(value, key) {
        if (key != context && (value == null || value === '')) {  // == null also catches undefined
            delete obj[key];
        }
    });
    return obj;
};

// Print persons from start + results.length
function printPersonsToTable(pos) {
    // Update start in params
    params.start = pos;
    params.context = context;
    console.log("current context: "+context);

    // Search with the defined parameters
    client.getPersonSearch(params).then(function(searchResponse) {
       // Get parameters
       count = searchResponse.getResultsCount();
       start = searchResponse.getIndex();
       context = searchResponse.getContext();

       // Log total results and starting point
       console.log("count: " + count + " start: " + start + " context: " + context);

       // Set persons totals
       $('#person-totals').text(" " + count);

        // Initialize table content
        var $table = $('<table>').addClass('table table-hover table-responsive');
        $table.append(
            $('<thead>')
                .append($('<tr>')
                    .append('<th>ID</th>')
                    .append('<th>NAME</th>')
                    .append('<th>BIRTH</th>')
                    .append('<th>DEATH</th>')
                )
            )
            .append($('<tbody>'));

        // Refresh start position and get persons
        start = pos;
        var results = searchResponse.getSearchResults();

        // For each person in results update table
        for(var i = 0; i < results.length; i++){
            var result = results[i],
                person = result.getPrimaryPerson(),
                $row = $('<tr>').appendTo($table);

                // Get basic variables
                $('<td>').text(person.getId()).appendTo($row);
                $('<td>').text(person.getDisplayName()).appendTo($row);
                $('<td>').text(person.getDisplayBirthDate()).appendTo($row);
                $('<td>').text(person.getDisplayDeathDate()).appendTo($row);
          }

          // Update table controsl content
          $('#persons-block').text(' ' + (pos+1) + '-' + (pos+results.length) + ' ');

          // Update table content
          $('#table-container').fadeOut('fast');
          $('#table-container').empty();
          $('#table-container').append($table);
          $('#table-container').fadeIn('slow');
      });
}

// ======================================== //
// ************ DOCUMENT READY ************
// ======================================== //
$( document ).ready(function() {
    // START: Stop focus on button press
    $(".btn").mouseup(function(){
        $(this).blur();
    });

    // Expand/contract searchers
    $('.searchPersonHeader').click(function () {
        var x = $(this).children('.personHeaderGlyph').children('.glyphicon');
        x.toggleClass('glyph-rotated');
        if(x.hasClass('glyph-rotated')) $(this).children('.personHeaderTitle').children('h3').children('.personHeaderSign').text('-');
        else $(this).children('.personHeaderTitle').children('h3').children('.personHeaderSign').text('+');
    });

    // ======================================== //
    // *** PERSON TABLE CONTROLS  ***
    // ======================================== //
    $('#previous-persons').click(function () {
        var next = (start-resultsLength) > 0 ? (start-resultsLength) : 0;
        if(start != next) printPersonsToTable(next);
    });

    $('#next-persons').click(function () {
        var next = (start+resultsLength) < count ? (start+resultsLength) : start;
        if(start != next) printPersonsToTable(next);
    });

    // ======================================== //
    // *** LAUNCH PERSON SEARCH  ***
    // ======================================== //
    $('#person-search-submit').click(function() {
        // Check current status button and kill if necessary
        if($(this).hasClass('disabled')) throw new FatalError("Can't launch two at the same time!");

        // Diable button
        //$(this).text('Searching now...');
        //$(this).addClass('disabled');

        // Read variables and avoid inejection (no form control needed)
        var mainGender, mainExact, mainName, mainSurname, mainBirthPlace, mainBirthDate, mainDeathPlace, mainDeathDate, mainMarriagePlace, mainMarriageDate;
        var spouseExact, spouseName, spouseSurname, spouseBirthPlace, spouseBirthDate, spouseDeathPlace, spouseDeathDate, spouseMarriagePlace, spouseMarriageDate;
        var fatherExact, fatherName, fatherSurname, fatherBirthPlace, fatherBirthDate, fatherDeathPlace, fatherDeathDate, fatherMarriagePlace, fatherMarriageDate;
        var motherExact, motherName, motherSurname, motherBirthPlace, motherBirthDate, motherDeathPlace, motherDeathDate, motherMarriagePlace, motherMarriageDate;

        // Main person fields
        mainGender = $("input:radio[name ='personGender']:checked").val(); mainExact = $("input:radio[name ='exactInput']:checked").val();
        mainName = escapeHtml($('#givenName').val()); mainSurname = escapeHtml($('#surname').val());
        mainBirthPlace = escapeHtml($('#birthPlace').val()); mainBirthDate = escapeHtml($('#birthDate').val());
        mainDeathPlace = escapeHtml($('#deathPlace').val()); mainDeathDate = escapeHtml($('#deathDate').val());
        mainMarriagePlace = escapeHtml($('#marriagePlace').val()); mainMarriageDate = escapeHtml($('#marriageDate').val());
        // Spouse person fields
        spouseExact = $("input:radio[name ='spouseExactInput']:checked").val();
        spouseName = escapeHtml($('#spouseGivenName').val()); spouseSurname = escapeHtml($('#spouseSurname').val());
        spouseBirthPlace = escapeHtml($('#spouseBirthPlace').val()); spouseBirthDate = escapeHtml($('#spouseBirthDate').val());
        spouseDeathPlace = escapeHtml($('#spouseDeathPlace').val()); spouseDeathDate = escapeHtml($('#spouseDeathDate').val());
        spouseMarriagePlace = escapeHtml($('#spouseMarriagePlace').val()); spouseMarriageDate = escapeHtml($('#spouseMarriageDate').val());
        // Father person fields
        fatherExact = $("input:radio[name ='fatherExactInput']:checked").val();
        fatherName = escapeHtml($('#fatherGivenName').val()); fatherSurname = escapeHtml($('#fatherSurname').val());
        fatherBirthPlace = escapeHtml($('#fatherBirthPlace').val()); fatherBirthDate = escapeHtml($('#fatherBirthDate').val());
        fatherDeathPlace = escapeHtml($('#fatherDeathPlace').val()); fatherDeathDate = escapeHtml($('#fatherDeathDate').val());
        fatherMarriagePlace = escapeHtml($('#fatherMarriagePlace').val()); fatherMarriageDate = escapeHtml($('#fatherMarriageDate').val());
        // Mother person fields
        motherExact = $("input:radio[name ='motherExactInput']:checked").val();
        motherName = escapeHtml($('#motherGivenName').val()); motherSurname = escapeHtml($('#motherSurname').val());
        motherBirthPlace = escapeHtml($('#motherBirthPlace').val()); motherBirthDate = escapeHtml($('#motherBirthDate').val());
        motherDeathPlace = escapeHtml($('#motherDeathPlace').val()); motherDeathDate = escapeHtml($('#motherDeathDate').val());
        motherMarriagePlace = escapeHtml($('#motherMarriagePlace').val()); motherMarriageDate = escapeHtml($('#motherMarriageDate').val());

        var error = 1;
        if(mainName!="" || mainSurname !="" || mainBirthPlace!="" || mainBirthDate!="" || mainDeathPlace!="" || mainDeathDate!="" || mainMarriagePlace!="" || mainMarriageDate!="" ||
           spouseName!="" || spouseSurname !="" || spouseBirthPlace!="" || spouseBirthDate!="" || spouseDeathPlace!="" || spouseDeathDate!="" || spouseMarriagePlace!="" || spouseMarriageDate!="" ||
           fatherName!="" || fatherSurname !="" || fatherBirthPlace!="" || fatherBirthDate!="" || fatherDeathPlace!="" || fatherDeathDate!="" || fatherMarriagePlace!="" || fatherMarriageDate!="" ||
           motherName!="" || motherSurname !="" || motherBirthPlace!="" || motherBirthDate!="" || motherDeathPlace!="" || motherDeathDate!="" || motherMarriagePlace!="" || motherMarriageDate!="") {

               // Set error
               error = 0;
         }

         if(error) {
             // Display error of: please fill at least a field and reactivate button + abort execution
             $('#form-errors').removeClass('hidden');
             $('#error-trigger').trigger('click');
             throw new FatalError("We need you to at least select a field!");
         }

         // Hide errors
         $('#form-errors').addClass('hidden');

         // Dislay loading icon and jump to results


         // Append tilde if non-exact applies
         if(mainExact != "exactYes") { mainName = mainName + '~'; mainSurname = mainSurname + '~'; }
         if(spouseExact != "exactYes") { spouseName = spouseName + '~'; spouseSurname = spouseSurname + '~'; }
         if(fatherExact != "exactYes") { fatherName = fatherName + '~'; fatherSurname = fatherSurname + '~'; }
         if(motherExact != "exactYes") { motherName = motherName + '~'; motherSurname = motherSurname + '~'; }

         // Populate params variable to get results
         params = {
             start : 0,
             context: '',
             gender : mainGender,
             givenName : mainName,
             surname : mainSurname,
             birthPlace : mainBirthPlace,
             birthDate : mainBirthDate,
             deathPlace : mainDeathPlace,
             deathDate : mainDeathDate,
             marriagePlace : mainMarriagePlace,
             marriageDate : mainMarriageDate,
             spouseName : spouseName,
             spouseSurname : spouseSurname,
             spouseBirthPlace : spouseBirthPlace,
             spouseBirthDate : spouseBirthDate,
             spouseDeathPlace : spouseDeathPlace,
             spouseDeathDate : spouseDeathDate,
             spouseMarriagePlace : spouseMarriagePlace,
             spouseMarriageDate : spouseMarriageDate,
             fatherName : fatherName,
             fatherSurname : fatherSurname,
             fatherBirthPlace : fatherBirthPlace,
             fatherBirthDate : fatherBirthDate,
             fatherDeathPlace : fatherDeathPlace,
             fatherDeathDate : fatherDeathDate,
             fatherMarriagePlace : fatherMarriagePlace,
             fatherMarriageDate : fatherMarriageDate,
             motherName : motherName,
             motherSurname : motherSurname,
             motherBirthPlace : motherBirthPlace,
             motherBirthDate : motherBirthDate,
             motherDeathPlace : motherDeathPlace,
             motherDeathDate : motherDeathDate,
             motherMarriagePlace : motherMarriagePlace,
             motherMarriageDate : motherMarriageDate
         }

         // Remove empty properties and clean context
         params = removeEmptyProperties(params);
         context = '';

         // Print first batch of results
         printPersonsToTable(0);

    });
});
