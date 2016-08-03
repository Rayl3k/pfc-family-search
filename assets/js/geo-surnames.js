
// GEOMAP: Variables
//    geomap => map to print on the HTML
//    geomapOptions => global options for geomap
//    geomapCountries => ALL data for search launched
var geomap;
var geomapOptions;
var geomapCountries;
geomapOptions = {};
geomapOptions['dataMode'] = 'regions';
geomapOptions['width'] = '100%';
// BARCHART: Variables
//    barchart => barchart to print on the HTML
var barchart;
// LINECHART: Variables
var linechart;
var linechartData;
var linechartRows;
// FAMILYSEARCH & ITERATION: Variables
//    countries => Countries selected by user (HTML)
//    years => Year or Interval of years
//    countriesConsulted => To control when to print interval data
//    yearsConsulted => To control when to re-enable the functionality
//    apiDELAY => Ensure no blocking
//    currentPrinted => To control which plots are printed
var countries;
var years;
var countriesConsulted;
var yearsConsulted;
var apiDELAY = 2000;
var currentPrinted;
// GOOGLE ANALYTICS errors
//    gaError => variable to control that same error is not sent multiple times
var gaError = 0;

// ========================================================================== //

/* Function firstToUpperCase */
function firstToUpperCase(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}


// ========================================================================== //
// PRINT MAPS
// ========================================================================== //

/* Function to sort countries biggest to smaller */
function compareCountries(a, b) {
    if(parseInt(a[1]) < parseInt(b[1])) return 1;
    else if(parseInt(a[1]) > parseInt(b[1])) return -1;
    else return 0;
}

/* Print linechart if more than one year */
function printLinechart() {
    // Disable specific and enable canvas
    $('#linechart').fadeOut('fast');
    $('#lineOverall').fadeIn('slow');

    // add rows to the dataset
    linechartData.addRows(linechartRows);
    var title = 'Number of people matching surname ' + firstToUpperCase($('#surname').val()) + " per country";
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

/* Print GEOMAP */
function printGeomap(i) {
    // Print geomap
    var geomapData = google.visualization.arrayToDataTable(geomapCountries[i]);
    $('#geomap').css('width', '100%');
    geomap = new google.visualization.GeoChart(document.getElementById('geomap'));
    geomap.draw(geomapData, geomapOptions);
}

/* Print BARCHART */
function printBarchart(i) {
    // Get the data, sort it and increase container size
    var barchartCountries = geomapCountries[i];
    var first = barchartCountries.splice(0, 1);
    barchartCountries.sort(compareCountries);
    barchartCountries.unshift(first[0]);
    $('#barchart').css('height', 100*countries.length);
    var barchartOptions = {
          chart: {
            title: 'Persons found at year: ' + years[i] + ' by country'
          },
          bars: 'horizontal' // Required for Material Bar Charts.
    };

    // transform and plot
    var barchartData = google.visualization.arrayToDataTable(barchartCountries);
    barchart = new google.charts.Bar(document.getElementById('barchart'));
    barchart.draw(barchartData, barchartOptions);
}

// Print the graphs and controls of a specific year
function printGraphs(i) {
    // Fade out specific graphs
    $('#geomap').fadeOut('fast');
    $('#barchart').fadeOut('fast');

    // Ensure canvas is ready
    $('#graphs').fadeIn('fast');
    $('#controls-block').fadeIn('fast');

    // Update geomap, barchart and yearControl
    printGeomap(i);
    printBarchart(i);
    $('#year-number').text(years[i]);

    // Fade in specific graphs
    $('#geomap').fadeIn('slow');
    $('#barchart').fadeIn('slow');

    // Update current printed
    currentPrinted = i;
}

/* Function to print & update data */
function yearGraphs(i) {
    // Update years counter
    yearsConsulted = yearsConsulted + 1;

    // Print graphs
    printGraphs(i);

    // Enable button if it was last update
    if(yearsConsulted == years.length) {
        $('#search-title').text('Search completed for ');
        $('#search-surname').text(firstToUpperCase($('#surname').val()));
        $('#search-title-2').text('!');
        $('#search-time').text('You will find your results on the sections below.');
        $('#search-duration').text('');
        $('#search-time-2').text('');
        $('.year-label').text('Years: ');
        $('.country-label').text('Countries: ');
        $('.current-year').text(years.length);
        $('.current-country').text(countries.length);
        $('#progress-value').removeClass('active');
        $('#progress-value').removeClass('progress-bar-striped');

        // Re-enable search button
        $('#submit').text('Lauch surname search');
        $('#submit').removeClass('disabled');

        // Print linecahrt
        if(years.length > 1) {
            printLinechart();

            // Enable surfing commands
            $('#previous-year').fadeIn('fast');
            $('#next-year').fadeIn('fast');
        }

        // Send facts success event
        sendEvent('familysearch', 'surnames', 'surnames_successful');
    }
}

// ======================================== //
// ************ DOCUMENT READY ************
// ======================================== //
$( document ).ready(function() {
    // START: Stop focus on button press
    $(".btn").mouseup(function(){
        $(this).blur();
    });

    // Control graphs displayed
    $('#previous-year').click(function() {
        if(currentPrinted > 0) {
            printGraphs(currentPrinted-1);
        }
    });
    $('#next-year').click(function() {
        if(currentPrinted < years.length-1) {
            printGraphs(currentPrinted+1);
        }
    });

    // Expand/contract countries
    $('.collapseHeader').click(function () {
        var x = $(this).children('.personHeaderGlyph').children('.glyphicon');
        x.toggleClass('glyph-rotated');
        if(x.hasClass('glyph-rotated')) $(this).children('.personHeaderTitle').children('h3').children('.personHeaderSign').text('-');
        else $(this).children('.personHeaderTitle').children('h3').children('.personHeaderSign').text('+');
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
    // checkboxes control
    // ======================================== //
    // select or deselect all
    $('.checkbox-all').click(function() {
        var fatherID = $(this).parent().parent().parent().attr('id');
        fatherID = ".checkbox-" + fatherID.split('-')[0];
        if($(this).html().trim() == "Select All Countries") {
            $(fatherID).prop('checked', true);
            $(this).html("Deselect All Countries");
        }
        else {
            $(fatherID).prop('checked', false);
            $(this).html("Select All Countries");
        }
    });

    // Expand/Coallpse buttons
    $('.exp-button').click(function() {
        if($(this).html().trim() == "Collapse country list") {
            $(this).html("Expand country list");
        }
        else {
            $(this).html("Collapse country list");
        }
    });

    // ======================================== //
    // *** LAUNCH SURNAME SEARCH ***
    // ======================================== //
    $('#submit').click(function() {
        // Check current status button and kill if necessary
        if($(this).hasClass('disabled')) throw new FatalError("Can't launch two at the same time!");

        // Diable button
        $(this).text('Searching now...');
        $(this).addClass('disabled');

        // Remove values from previous SEARCH
        countries = new Array();
        geomapCountries = new Array();
        years = new Array();
        linechartRows = new Array();
        linechartData = new google.visualization.DataTable();
        linechartData.addColumn('string', 'Year');
        countriesConsulted = 0;
        yearsConsulted = 0;

        // Reset gaError
        gaError = 0;

        // Get all parameters and avoid injection
        $(".form-checkbox").each(function(index) {
            if($(this).is(':checked')) {
                var country = $(this).parent().html().trim().split(">")[1];
                country = escapeHtml(country);
                countries.push({code:$(this).attr('id'), name:country});
                linechartData.addColumn('number', $(this).attr('id'));
            }
        });
        var inputSurname = escapeHtml($('#surname').val());
        var firstYear = escapeHtml($('#firstYear').val());
        var lastYear = escapeHtml($('#lastYear').val());
        var interval = escapeHtml($('#interval').val());

        // Check errors and prepare messages
        var countryError = 0; var surnameError = 0;
        var firstError = 0; var lastError = 0; var intervalError = 0;
        if(countries.length == 0) {countryError = 1; $('#countryError').removeClass('hidden');}
        else $('#countryError').addClass('hidden');
        if(inlineValidation('surname')) { $('#surname').trigger('focusout'); surnameError = 1; $('#surnameError').removeClass('hidden');}
        else $('#surnameError').addClass('hidden');
        if(inlineValidation('firstYear')) { $('#firstYear').trigger('focusout'); firstError = 1; $('#firstYearError').removeClass('hidden');}
        else $('#firstYearError').addClass('hidden');
        if(inlineValidation('lastYear')) { $('#lastYear').trigger('focusout'); lastError = 1; $('#lastYearError').removeClass('hidden');}
        else $('#lastYearError').addClass('hidden');
        if(inlineValidation('interval')) { $('#interval').trigger('focusout'); intervalError = 1; $('#intervalError').removeClass('hidden');}
        else $('#intervalError').addClass('hidden');

        // Display errors & abort ejecution or continue?
        if(countryError || surnameError || firstError || lastError || intervalError) {
            // Recover serch button
            $(this).removeClass('disabled');
            $('#submit').text('Lauch surname search');

            // Display errors
            $('#form-errors').removeClass('hidden');
            $('#error-trigger').trigger('click');

            // Once Jumped, hide content
            $('#graphs').fadeOut('fast');
            $('#lineOverall').fadeOut('fast');
            $('#controls-block').fadeOut('fast');
            $('#previous-year').fadeOut('fast');
            $('#next-year').fadeOut('fast');
            throw new FatalError("Some fields had mistakes!");
        }
        else {
            // fadein & fadeout content
            $('#graphs').fadeOut('fast');
            $('#api-errors').fadeOut('fast');
            $('#lineOverall').fadeOut('fast');
            $('#controls-block').fadeOut('fast');
            $('#previous-year').fadeOut('fast');
            $('#next-year').fadeOut('fast');
            $('#search-title').text('Searching for ');
            $('#search-title-2').text('...');
            $('#search-time').text('Please note that this process could take up to: ');
            $('#search-time-2').text(' seconds');
            $("#progress-value").css('width', '0%');
            $("#progress-text").text('');
            $('.year-label').text('Year: ');
            $('.country-label').text('Country: ');
            $('#progress-value').addClass('active');
            $('#progress-value').addClass('progress-bar-striped');
            $("#waiting-page").fadeIn("slow");
            $('#form-errors').addClass('hidden');
            $('#results-trigger').trigger('click');

            // remove errors from validation
            $('.form-vali').each(function() {
                $(this).parent().removeClass('has-error');
                $(this).parent().addClass('has-success');
            });
        }

        // Compute year checkpoints
        firstYear = parseInt(firstYear);
        lastYear =  lastYear == "" ? firstYear : parseInt(lastYear);
        interval = parseInt(interval);
        years.push(firstYear);
        if(lastYear != firstYear) {
            var auxYear = firstYear;
            while(auxYear < lastYear) {
                auxYear = auxYear+interval < lastYear ? auxYear+interval : lastYear;
                years.push(auxYear);
            }
        }
        else interval = 0;

        // Send GA event
        var label = 'surnames_'+countries.length+'_'+years.length+'_'+firstYear+'_'+interval+'_'+inputSurname.replace(/\s+/g, '');
        sendEvent('familysearch', 'surnames', label);

        // Waiting: Show estimated duration & surname
        var searchDuration = countries.length*years.length;
        $('#search-duration').text(searchDuration*apiDELAY/1000);
        $('#search-surname').text(firstToUpperCase(inputSurname));

        /* Loops through intervals and countries */
        for (var i = 0; i < years.length; i++) {
            // Initialize blocks for graphs
            geomapCountries[i] = new Array();
            geomapCountries[i].push(['Country', 'Number of People']);
            linechartRows[i] = new Array();
            linechartRows[i].push(String(years[i]));

            // Search for the surname on each country
            for(var k = 0; k < countries.length; k++) {
                // Delay all calls to the API by apiDELAY param
                (function(k, i) {
                    setTimeout(function() {
                        // Waiting: Update current year & country
                        $('.current-year').text(years[i]);
                        $('.current-country').text(countries[k].name);

                        // Set params for search
                        var params = {
                            surname: inputSurname,
                            birthPlace: countries[k].name,
                            birthDate: years[i]
                        }
                        // Launch search against FamilySearch API
                        client.getPersonSearch(params).then(function(searchResponse) {
                            // Get instances of people with name in country[k]
                            var total = searchResponse.getResultsCount();

                            // Update progress bar: We divide/10 instead of 1000 to multiply after*100
                            var pValue = Math.round((k+1+countries.length*i)/searchDuration*100);
                            $("#progress-value").css('width', pValue+'%');
                            $("#progress-text").text(pValue+'% completed');

                            // Add results to be printed
                            countriesConsulted = countriesConsulted + 1;
                            geomapCountries[i].push([countries[k].code, total]);
                            linechartRows[i].push(total);
                            console.log("Pushing at year: " + years[i] + " " + countries[k].code + " " + total);

                            // Check if year data should be printed
                            if(countriesConsulted%countries.length == 0) yearGraphs(i);
                        })
                        // Catch errors
                        .catch(function(e) {
                            // Print error
                            $('#api-error-text').text(e.message);
                            $('#api-errors').fadeIn('slow');

                            // Enable search button
                            $('#submit').text('Launch surname sesarch');
                            $('#submit').removeClass('disabled');

                            // Send ga error
                            if(!gaError) {
                                var error = 'surnames_error_' + String(e.message).replace(' ', '_').toLowerCase();
                                sendEvent('familysearch', 'surnames', error);
                                gaError = 1;
                            }
                        });
                    }, apiDELAY*k+(i*countries.length*apiDELAY));
                }(k, i));
            }
        }
    });

    // ======================================== //
    // Scroll spy
    // ======================================== //
    $(window).scroll(function() {
        var windowHeight = $(window).height();
        var countryList = $("#eu-container").position().top;
        var fromTop =  $(document).scrollTop();
        var resultsZone = $("#results-zone").position().top;
        var controlsBlock = $("#controls-block").position().top;
        var graphs = $("#graphs").position().top;

        // current position
        var currentPosition = fromTop+windowHeight;

        // decide if we need to fix the search bar or not
        if(currentPosition >= countryList+160) {
            if($("#submit-search").hasClass('detached-bottom')) {
                if(currentPosition >= resultsZone+110) $("#submit-search").toggleClass('detached-bottom', false);
            }
            else {
                if(currentPosition < resultsZone) $("#submit-search").toggleClass('detached-bottom', true);
            }
        }
        else {
            $("#submit-search").toggleClass('detached-bottom', false);
        }

        // controls detach
        if(fromTop >= graphs-80) {
            $("#controls-block").addClass('detached-top', true);
            $('#graphs').css('margin-top', '109px');
        }
        else {
            $("#controls-block").removeClass('detached-top', false);
            $('#graphs').css('margin-top', '0px');
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
                    if(targetString == "results-zone") {
                        $('html, body').animate({
                            scrollTop: target.offset().top+100
                        }, 1000);
                        return false;
                    }
                    else {
                        $('html, body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            }
        });
    });
});
