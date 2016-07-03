
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
// FAMILYSEARCH & ITERATION: Variables
//    countries => Countries selected by user (HTML)
//    years => Year or Interval of years
//    countriesConsulted => To control when to print interval data
//    yearsConsulted => To control when to re-enable the functionality
//    apiDELAY => Ensure no blocking
var countries;
var years;
var countriesConsulted;
var yearsConsulted;
var apiDELAY = 1500;

/* Function firstToUpperCase */
function firstToUpperCase(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

/* Function to print & update data */
function printGeomap(i) {
    // Console log verification
    console.log("Printing data for years: ", years[i]);
    console.log(geomapCountries[i]);

    // Transform required data & update counter
    var geomapData = google.visualization.arrayToDataTable(geomapCountries[i]);
    yearsConsulted = yearsConsulted + 1;

    // Create & print map
    geomap = new google.visualization.GeoChart(document.getElementById('geomap'));
    $('#geomap').fadeOut('fast');
    geomap.draw(geomapData, geomapOptions);
    $('#geomap').fadeIn('slow');

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
        $('#submit').removeAttr('disabled');
    }
}

/* Document ready function */
$( document ).ready(function() {
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

    // ======================================== //
    // *** LAUNCH SURNAME SEARCH ***
    // ======================================== //
    $('#submit').click(function() {
        // If the button was disabled, cancel the thing
        if($(this).attr('disabled') == 'disabled') throw new FatalError("Another instance already running");

        // Show waiting page & edit values & hide sections
        $('#search-title').text('Searching for ');
        $('#search-title-2').text('...');
        $('#search-time').text('Please note that this process could take up to: ');
        $('#search-time-2').text(' seconds');
        $("#progress-value").css('width', '0%');
        $("#progress-text").text('');
        $('.year-label').text('Year: ');
        $('.country-label').text('Country: ');
        $('#progress-value').addClass('active');
        $("#waiting-page").fadeIn("slow");

        // Diable button and initialize content
        $(this).attr('disabled', 'disabled');
        countries = new Array();
        geomapCountries = new Array();
        years = new Array();
        countriesConsulted = 0;
        yearsConsulted = 0;

        // Get all parameters and avoid injection
        $(".form-checkbox").each(function(index) {
            if($(this).is(':checked')) {
                var country = $(this).parent().html().trim().split(">")[1];
                country = escapeHtml(country);
                countries.push({code:$(this).attr('id'), name:country});
            }
        });
        var inputSurname = escapeHtml($('#surname').val());
        var firstYear = escapeHtml($('#firstYear').val());
        var lastYear = escapeHtml($('#lastYear').val());
        var interval = escapeHtml($('#interval').val());

        // Check if errors and trigger them
        var countryError = 0; var surnameError = 0; var firstError = 0; var lastError = 0; var intervalError = 0;
        if(countries.length == 0) countryError = 1;
        if(inputSurname.length == 0) surnameError = 1;
        if(firstYear.length != 4 || isNaN(firstYear)) firstError = 1;
        if(lastYear != "" && (lastYear.length != 4 || isNaN(lastYear))) lastError = 1;
        firstYear = parseInt(firstYear);
        lastYear =  lastYear == "" ? firstYear : parseInt(lastYear);
        interval = parseInt(interval);
        if(lastYear != firstYear && (interval == "" | isNaN(interval))) intervalError = 1;

        // Compute year checkpoints
        years.push(firstYear);
        if(lastYear != firstYear) {
            var auxYear = firstYear;
            while(auxYear < lastYear) {
                auxYear = auxYear+interval < lastYear ? auxYear+interval : lastYear;
                years.push(auxYear);
            }
        }

        // Waiting: Show estimated duration & surname
        var searchDuration = countries.length*years.length;
        $('#search-duration').text(searchDuration*apiDELAY/1000);
        $('#search-surname').text(firstToUpperCase(inputSurname));

        /* Loops through intervals and countries */
        for (var i = 0; i < years.length; i++) {
            // Initialize block of years geomapCountries
            geomapCountries[i] = new Array();
            geomapCountries[i].push(['Country', 'Number of People']);

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
                            console.log(pValue);
                            $("#progress-value").css('width', pValue+'%');
                            $("#progress-text").text(pValue+'% completed');

                            /*// real born years
                            for(var p = 0; p < total; p = p+15) {
                                var persons = searchResponse.getSearchResults({start:p});
                                for(var j = 0; j < persons.length; j++) {
                                    var result = persons[i];
                                    person = result.getPrimaryPerson();
                                    birth = person.getBirth();

                                    console.log("Person name: " + person.getDisplayName());
                                    //console.log("Normalized Place: " + birth.getNormalizedPlace());
                                    //console.log("Get Place: " + birth.getPlace());
                                    console.log("Get date: " + birth.getDate());
                                }
                            } */

                            // Add results to be printed
                            console.log("Country " + countries[k].name + " " + total);
                            countriesConsulted = countriesConsulted + 1;
                            if(total != 0) {
                                geomapCountries[i].push([countries[k].code, total]);
                            }

                            // Check if year data should be printed
                            if(countriesConsulted%countries.length == 0) printGeomap(i);
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

        // current position
        var currentPosition = fromTop+windowHeight;

        // decide if we need to fix the search bar or not
        if(currentPosition >= countryList+160) {
            if($("#submit-search").hasClass('detached-bottom')) {
                if(currentPosition >= resultsZone+70) $("#submit-search").toggleClass('detached-bottom', false);
            }
            else {
                var submitZone = $("#submit-search").position().top;
                if(currentPosition < submitZone+70) $("#submit-search").toggleClass('detached-bottom', true);
            }
        }
        else {
            $("#submit-search").toggleClass('detached-bottom', false);
        }
    });

    // ======================================== //
    // Smooth jumping
    // ======================================== //
    $(function() {
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    if($("#submit-search").hasClass('detached-bottom')) {
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








    $('#submit2').click(function() {
        birthDate = $('#firstYear').val();

        var params = {
            givenName: $('#surname').val(),
            birthDate: birthDate
        };

        console.log("param used: " + params.birthDate);

        client.getPersonSearch(params).then(function(searchResponse){
            var results = searchResponse.getSearchResults();
            var results2 = searchResponse.getResultsCount();
            console.log("Response length: " + results.length);
            console.log("Response count: " + results2);

            //var countries = [];
            //var countryNames = [];
            //var countryCounter = [];
            //countries.push(['Country', 'Number of People']);

            if(results.length > 0) {
                //var tmpCountries = [];
                for(var i = 0; i < results.length; i++){
                    // tryout getPrimaryPerson
                    var result = results[i];
                    person = result.getPrimaryPerson();
                    birth = person.getBirth();

                    console.log("Person name: " + person.getDisplayName());
                    //console.log("Normalized Place: " + birth.getNormalizedPlace());
                    //console.log("Get Place: " + birth.getPlace());
                    //console.log("Get date: " + birth.getDate());
                    //console.log("Get formal date: " + birth.getNormalizedDate());
/*
                    if(typeof birth !== "undefined") {
                        birthPlace = birth.getNormalizedPlace();

                        if(typeof birthPlace !== "undefined") {
                            birthParams = birthPlace.split(',');
                            lengthParams = birthParams.length;

                            current = birthParams[lengthParams-1];
                            if(countryCounter[current]) countryCounter[current] = countryCounter[current] + 1;
                            else {
                                countryCounter[current] = 1;
                                countryNames.push(current);
                            }

                            //console.log('Current Country: ' + current + ': ' + countryCounter[current]);
                        }
                        else {
                            if(countryCounter['undefined']) countryCounter['undefined'] = countryCounter['undefined'] + 1
                            else {
                                countryCounter['undefined'] = 1;
                                countryNames.push('undefined');
                            }
                        }
                    }
                    else {
                        if(countryCounter['undefined']) countryCounter['undefined'] = countryCounter['undefined'] + 1
                        else {
                            countryCounter['undefined'] = 1;
                            countryNames.push('undefined');
                        }
                    }
                    */
                } // end: PERSOONS LOOP
            } // end: results found IF-ELSE
/*
            // Create array to be passed to google geochart
            for (var i = 0; i < countryNames.length; i++)
                if(countryNames[i] != 'undefined')
                    countries.push([countryNames[i], countryCounter[countryNames[i]]]);

            // Log on console results to be printed in graph
            console.log(countries);

            // Clearn geomap + craete new one
            if(geomap) geomap.clearChart();
            geomapData = google.visualization.arrayToDataTable(countries);
            geomap = new google.visualization.GeoChart(document.getElementById('geomap'));
            geomap.draw(geomapData, geomapOptions);

            // prepare barplot
            for (var i = 0; i < countryNames.length; i++)
                if(countryNames[i] == 'undefined') countries.push(['undefined', countryCounter[countryNames[i]]]);

            var options = {
                title: 'Amount of people born with the name: ' + $('#givenName').val(),
                chartArea: {width: '60%'},
                hAxis: {
                  title: 'Amount of people',
                  minValue: 0
                },
                vAxis: {
                  title: 'Country'
                }
              };

              var barchart = new google.visualization.BarChart(document.getElementById('barchart'));
              barchartData = google.visualization.arrayToDataTable(countries);
              barchart.draw(barchartData, options);
*/
        }); //end getPersonSearch function
    }); // end onSubmit function
});
