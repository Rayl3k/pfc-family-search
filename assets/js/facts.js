// LINECHART: Variables
var linechart;
var linechartData;
var linechartRows;
var yearsConsulted;

/* Print linechart if more than one year */
function printLinechart() {
    alert("HELLOOOOOOOOO");
    // Disable specific and enable canvas
    $('#linechart').fadeOut('fast');
    $('#lineOverall').fadeIn('slow');

    // add rows to the dataset
    var title = 'Number of ';
    var linechartOptions = {
        chart: {
          title: title,
          subtitle: 'in number of FamilySearch person instances'
        },
        height: 500,
        axes: {
          x: {
            0: {side: 'top'}
          }
        }
      };

    // print the chart
    linechart = new google.charts.Line(document.getElementById('linechart'));
    linechart.draw(linechartData, linechartOptions);

    // Fade-in specific
    $('#linechart').fadeIn('slow');
}

/* Get facts Params */
function getFactsParams(fact, year, place) {
    if(fact == "births") return { birthDate: year, birthPlace: place }
    else if(fact == "deaths") return { deathDate: year, deathPlace: place }
    else if(fact == "marriages") return { marriageDate: year, marriagePlace: place }
}

// ======================================== //
// ************ DOCUMENT READY ************
// ======================================== //
$( document ).ready(function() {
    // START: Stop focus on button press
    $(".btn").mouseup(function(){
        $(this).blur();
    });

    // ======================================== //
    // inline-validation
    // ======================================== //
    $('.form-vali').focusout(function() {
        if(inlineValidation($(this).attr('id'))) {
            $(this).parent().removeClass('has-success');
            $(this).parent().addClass('has-error');
        }
        else {
            $(this).parent().removeClass('has-error');
            $(this).parent().addClass('has-success');
        }
    });

    // ======================================== //
    // *** LAUNCH FACTS SEARCH ***
    // ======================================== //
    $('#facts-submit').click(function() {
        // Initialize Values
        linechartRows = new Array();
        linechartData = new google.visualization.DataTable();
        yearsConsulted = 0;
        linechartData.addColumn('string', 'Year');
        linechartData.addColumn('number', 'Instances');

        // Get all parameters and avoid injection
        var place = escapeHtml($('#factsPlace').val());
        var centralYear = escapeHtml($('#centralYear').val());
        var factSelected = escapeHtml($('.radio-facts.active').button().text().trim());

        // Check errors and prepare messages
        var placeError = 0; var centralYearError = 0; var factSelectedError = 0;
        if(inlineValidation('factsPlace')) {
            $('#factsPlace').trigger('focusout');
            placeError = 1;
            $('#fact-place-error').removeClass('hidden');
        }
        if(inlineValidation('centralYear')) {
            $('#centralYear').trigger('focusout');
            centralYearError = 1;
            $('#fact-year-error').removeClass('hidden');
        }
        if(factSelected == "") {
            factSelectedError = 1;
            $('#fact-type-error').removeClass('hidden');
        }

        // Display errors & abort ejecution or continue?
        if(placeError || centralYearError || factSelectedError) {
            //$(this).removeClass('disabled');
            $('#form-errors').removeClass('hidden');
            $('#error-trigger').trigger('click');
            throw new FatalError("Some fields had mistakes!");
        }
        else {
            // fadein & fadeout content
            $('#lineOverall').fadeOut('fast');
            $('.search-fact-type').text(" " + factSelected);
            $('#search-fact-place').text(" " + place + " ");
            $('#search-fact-year').text(" " + centralYear + " ");

            // Diable button
            $(this).text('Searching now...');
            $(this).addClass('disabled');
        }

        // Initialize variables
        var firstYear = centralYear-5;

        // Get data from family search
        for(var i = 0; i < 11; i++) {
            // Set params for search
            var params = getFactsParams(factSelected.toLowerCase(), firstYear+i, place);

            // Delay all calls to the API by apiDELAY param
            (function(i) {
                setTimeout(function() {
                    // Launch search to the API
                    client.getPersonSearch(params).then(function(searchResponse) {
                        // Get instances of people with name in country[k]
                        var total = searchResponse.getResultsCount();

                        // Update progress bar: We divide/10 instead of 1000 to multiply after*100
                        var pValue = Math.round((i+1)/11*100);
                        $("#progress-value").css('width', pValue+'%');
                        $("#progress-text").text(pValue+'% completed');
                        console.log(i);

                        // Add total
                        linechartRows.push([String(firstYear+i), total]);

                        // Check if year data should be printed
                        yearsConsulted = yearsConsulted + 1;
                        if(yearsConsulted == 11) printLinechart(i);
                    });
                }, 1000*i);
            }(i));
        }
    });

});
