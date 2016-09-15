// LINECHART: Variables
var linechart;
var linechartData;
var linechartRows;
var yearsConsulted;
// GOOGLE ANALYTICS errors
//    gaError => variable to control that same error is not sent multiple times
var gaError = 0;

/* Print linechart if more than one year */
function printLinechart() {
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
        legend: {
            position: 'none'
        },
        axes: {
          x: {
            0: {side: 'top'}
          }
        }
      };

    // print the chart
    linechartData.addRows(linechartRows);
    linechart = new google.charts.Line(document.getElementById('linechart'));
    linechart.draw(linechartData, linechartOptions);

    // Fade-in specific
    $('#linechart').fadeIn('slow');
    $('#search-title').text('Search for');
    $('#search-title-2').text('completed.');
    $('#facts-submit').text('Launch facts searcher');
    $('#facts-submit').removeClass('disabled');

    // Bar remove active class & stripes
    $('#progress-value').removeClass('active');
    $('#progress-value').removeClass('progress-bar-striped');

    // Send facts success event
    sendEvent('familysearch', 'facts', 'facts_successful');
}

/* Get facts Params */
function getFactsParams(fact, year, place) {
    if(fact == "births") return { count: 0, birthDate: year, birthPlace: place }
    else if(fact == "deaths") return { count: 0, deathDate: year, deathPlace: place }
    else if(fact == "marriages") return { count: 0, marriageDate: year, marriagePlace: place }
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
        // Check current status button and kill if necessary
        if($(this).hasClass('disabled')) throw new FatalError("Can't launch two at the same time!");

        // Diable button
        $(this).text('Searching now...');
        $(this).addClass('disabled');

        // Initialize Values
        linechartRows = new Array();
        linechartData = new google.visualization.DataTable();
        yearsConsulted = 0;
        linechartData.addColumn('string', 'Year');
        linechartData.addColumn('number', 'Instances');

        // Enable ga error
        gaError = 0;

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
            // Recover search button status
            $(this).text('Lauch facts searcher');
            $(this).removeClass('disabled');

            // Trigger errors
            $('#form-errors').removeClass('hidden');
            $('#error-trigger').trigger('click');
            $("#waiting-page").fadeOut("fast");
            $('#lineOverall').fadeOut('fast');

            // Send GA event
            sendEvent('familysearch', 'facts', 'facts_error_formValidation');

            // Stop execution
            throw new FatalError("Some fields had mistakes!");
        }
        else {
            // Hide errors and validations
            $('#form-errors').fadeOut('fast');
            $('.form-vali').each(function() {
                $(this).parent().removeClass('has-error');
                $(this).parent().addClass('has-success');
            });

            // fadein & fadeout content
            $('#api-errors').fadeOut('fast');
            $('#lineOverall').fadeOut('fast');
            $('.search-fact-type').text(" " + factSelected + " ");
            $('#search-fact-place').text(" " + place + " ");
            $('#search-fact-year').text(" " + centralYear + " ");
            $('#linechart-title').text(" " + factSelected.toLowerCase() + " ");
            $('#search-title').text('Searching for');
            $('#search-title-2').text('...');

            // Progress bar functions
            $("#progress-value").css('width', '0%');
            $("#progress-text").text('');
            $('#progress-value').addClass('active');
            $('#progress-value').addClass('progress-bar-striped');

            // Trigger to content
            $("#waiting-page").fadeIn("slow");
            $('#results-trigger').trigger('click');
        }

        // Initialize variables
        var firstYear = centralYear-5;

        // Send GA event
        var label = 'facts_'+factSelected+'_'+firstYear+'_'+(parseInt(centralYear)+5)+'_'+ place.replace(/\s+/g, '');
        sendEvent('familysearch', 'facts', label);

        // Get data from family search
        for(var i = 0; i < 11; i++) {
            // Initialize data to store results
            linechartRows[i] = new Array();

            // Delay all calls to the API by apiDELAY param
            (function(i) {
                setTimeout(function() {
                    // Set params for search
                    var params = getFactsParams(factSelected.toLowerCase(), firstYear+i, place);

                    // Launch search to the API
                    client.getPersonSearch(params).then(function(searchResponse) {
                        // Get instances of people with name in country[k]
                        var total = searchResponse.getResultsCount();
                        console.log("results total: " + total);

                        // Update counter + progress bar
                        yearsConsulted = yearsConsulted + 1;
                        var pValue = Math.round(yearsConsulted/11*100);
                        $("#progress-value").css('width', pValue+'%');
                        $("#progress-text").text(pValue+'% completed');

                        // Add total
                        linechartRows[i].push(String(firstYear+i));
                        linechartRows[i].push(total);

                        // Check if year data should be printed
                        if(yearsConsulted == 11) printLinechart();
                    })
                    // Catch errors
                    .catch(function(e) {
                        // Print error
                        $('#api-error-text').text(e.message);
                        $('#api-errors').fadeIn('slow');

                        // Enable search button
                        $('#facts-submit').text('Launch facts search');
                        $('#facts-submit').removeClass('disabled');

                        // Send ga error
                        if(!gaError) {
                            var error = 'facts_error_' + String(e.message).replace(' ', '_').toLowerCase();
                            sendEvent('familysearch', 'facts', error);
                            gaError = 1;
                        }

                        // Update counter + progress bar
                        yearsConsulted = yearsConsulted + 1;
                        var pValue = Math.round(yearsConsulted/11*100);
                        $("#progress-value").css('width', pValue+'%');
                        $("#progress-text").text(pValue+'% completed');
                        linechartRows[i].push(String(firstYear+i));
                        linechartRows[i].push(0);

                        // Check if year data should be printed
                        if(yearsConsulted == 11) printLinechart();
                    });
                }, 2500*i);
            }(i));
        }
    });

    // ======================================== //
    // Smooth jumping
    // ======================================== //
    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                var targetString = String(this.hash.slice(1));
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
});
