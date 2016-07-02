var geomap;
var geomapData;
var geomapOptions;
var countryCodes;
var countryNames;
var year;

function prepareGeomap() {
    geomapOptions = {};
    geomapOptions['dataMode'] = 'regions';
    geomapOptions['width'] = '100%';

    var countries = []
    countries.push(['Country', 'Number of People']);
    geomapData = google.visualization.arrayToDataTable(countries);
    geomap = new google.visualization.GeoChart(document.getElementById('geomap'));

    geomap.draw(geomapData, geomapOptions);
}

// Document ready function
$( document ).ready(function() {

    // ======================================== //
    // checkboxes control
    // ======================================== //
    // select or deselect all
    $('#eu-all').click(function() {
        if($(this).html().trim() == "Select All Countries") {
            $('.checkbox-eu').prop('checked', true);
            $(this).html("Deselect All Countries");
        }
        else {
            $('.checkbox-eu').prop('checked', false);
            $(this).html("Select All Countries");
        }
    });

    $('#na-all').click(function() {
        if($(this).html().trim() == "Select All Countries") {
            $('.checkbox-na').prop('checked', true);
            $(this).html("Deselect All Countries");
        }
        else {
            $('.checkbox-na').prop('checked', false);
            $(this).html("Select All Countries");
        }
    });

    $('#sa-all').click(function() {
        if($(this).html().trim() == "Select All Countries") {
            $('.checkbox-sa').prop('checked', true);
            $(this).html("Deselect All Countries");
        }
        else {
            $('.checkbox-sa').prop('checked', false);
            $(this).html("Select All Countries");
        }
    });

    $('#oc-all').click(function() {
        if($(this).html().trim() == "Select All Countries") {
            $('.checkbox-oc').prop('checked', true);
            $(this).html("Deselect All Countries");
        }
        else {
            $('.checkbox-oc').prop('checked', false);
            $(this).html("Select All Countries");
        }
    });

    $('#as-all').click(function() {
        if($(this).html().trim() == "Select All Countries") {
            $('.checkbox-as').prop('checked', true);
            $(this).html("Deselect All Countries");
        }
        else {
            $('.checkbox-as').prop('checked', false);
            $(this).html("Select All Countries");
        }
    });

    $('#af-all').click(function() {
        if($(this).html().trim() == "Select All Countries") {
            $('.checkbox-af').prop('checked', true);
            $(this).html("Deselect All Countries");
        }
        else {
            $('.checkbox-af').prop('checked', false);
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
    // Launch surname search
    // ======================================== //
    $('#submit').click(function() {    

        // Get all countries to consult
        $(".form-checkbox").each(function(index) {
            if($(this).is(':checked')) {
                var country = $(this).parent().html().trim().split(">")[1];
                alert(country);
            }
        });

        var inputSurname = $('#surname').val();

        /* Search for the surname and each country */
        var countryNames = ['Afghanistan','Aland Islands','Albania','Algeria','American Samoa','Andorra','Angola','Anguilla','Antarctica','Antigua and Barbuda','Argentina','Armenia','Aruba','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bermuda','Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Bouvet Island','Brazil','British Virgin Islands','British Indian Ocean Territory','Brunei Darussalam','Bulgaria','Burkina Faso','Burundi','Cambodia','Cameroon','Canada','Cape Verde','Cayman Islands','Central African Republic','Chad','Chile','China','Hong Kong','Macao','Christmas Island','Cocos Islands','Colombia','Comoros','Congo','Cook Islands','Costa Rica','Côte Ivoire','Croatia','Cuba','Cyprus','Czech Republic','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Ethiopia','Falkland Islands','Faroe Islands','Fiji','Finland','France','French Guiana','French Polynesia','French Southern Territories','Gabon','Gambia','Georgia','Germany','Ghana','Gibraltar','Greece','Greenland','Grenada','Guadeloupe','Guam','Guatemala','Guernsey','Guinea','Guinea-Bissau','Guyana','Haiti','Heard Island and Mcdonald Islands','Holy See','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Isle of Man','Israel','Italy','Jamaica','Japan','Jersey','Jordan','Kazakhstan','Kenya','Kiribati','Korea','Kuwait','Kyrgyzstan','Lao PDR','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Macedonia','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Martinique','Mauritania','Mauritius','Mayotte','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Montserrat','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands','Netherlands Antilles','New Caledonia','New Zealand','Nicaragua','Niger','Nigeria','Niue','Norfolk Island','Northern Mariana Islands','Norway','Oman','Pakistan','Palau','Palestinian Territory','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Pitcairn','Poland','Portugal','Puerto Rico','Qatar','Réunion','Romania','Russian Federation','Rwanda','Saint-Barthélemy','Saint Helena','Saint Kitts and Nevis','Saint Lucia','Saint-Martin','Saint Pierre and Miquelon','Saint Vincent and Grenadines','Samoa','San Marino','Sao Tome and Principe','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Georgia and the South Sandwich Islands','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Svalbard and Jan Mayen Islands','Swaziland','Sweden','Switzerland','Syrian Arab Republic','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tokelau','Tonga','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Turks and Caicos Islands','Tuvalu','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States of America','United States Minor Outlying Islands','Uruguay','Uzbekistan','Vanuatu','Venezuela','Viet Nam','Virgin Islands, US','Wallis and Futuna Islands','Western Sahara','Yemen','Zambia','Zimbabwe'];
        var countryCodes = ['AF','AX','AL','DZ','AS','AD','AO','AI','AQ','AG','AR','AM','AW','AU','AT','AZ','BS','BH','BD','BB','BY','BE','BZ','BJ','BM','BT','BO','BA','BW','BV','BR','VG','IO','BN','BG','BF','BI','KH','CM','CA','CV','KY','CF','TD','CL','CN','HK','MO','CX','CC','CO','KM','CG','CK','CR','CI','HR','CU','CY','CZ','DK','DJ','DM','DO','EC','EG','SV','GQ','ER','EE','ET','FK','FO','FJ','FI','FR','GF','PF','TF','GA','GM','GE','DE','GH','GI','GR','GL','GD','GP','GU','GT','GG','GN','GW','GY','HT','HM','VA','HN','HU','IS','IN','ID','IR','IQ','IE','IM','IL','IT','JM','JP','JE','JO','KZ','KE','KI','KR','KW','KG','LA','LV','LB','LS','LR','LY','LI','LT','LU','MK','MG','MW','MY','MV','ML','MT','MH','MQ','MR','MU','YT','MX','FM','MD','MC','MN','ME','MS','MA','MZ','MM','NA','NR','NP','NL','AN','NC','NZ','NI','NE','NG','NU','NF','MP','NO','OM','PK','PW','PS','PA','PG','PY','PE','PH','PN','PL','PT','PR','QA','RE','RO','RU','RW','BL','SH','KN','LC','MF','PM','VC','WS','SM','ST','SA','SN','RS','SC','SL','SG','SK','SI','SB','SO','ZA','GS','SS','ES','LK','SD','SR','SJ','SZ','SE','CH','SY','TW','TJ','TZ','TH','TL','TG','TK','TO','TT','TN','TR','TM','TC','TV','UG','UA','AE','GB','US','UM','UY','UZ','VU','VE','VN','VI','WF','EH','YE','ZM','ZW'];
        var europe = ['Russia','Germany','France','United Kingdom','Italy','Spain','Ukraine','Poland','Romania','Kazakhstan','Netherlands','Belgium','Greece','Czech Republic','Portugal','Sweden','Hungary','Austria','Switzerland','Denmark','Finland','Norway','Ireland','Portugal'];

        countryNames = ['Antigua and Barbuda','Bahamas','Barbados','Belize','Canada','Costa Rica','Cuba','Dominica','Dominican Republic','El Salvador','Grenada','Guatemala','Haiti','Honduras','Jamaica','Mexico','Nicaragua','Panama','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Trinidad and Tobago','United States'];
        countryCodes = ['AG','BS','BB','BZ','CA','CR','CU','DM','DO','SV','GD','GT','HT','HN','JM','MX','NI','PA','KN','LC','VC','TT','US'];

        for(var k = 0; k < countryNames.length; k++) {
            (function(k) {
                setTimeout(function() {
                    var params = {
                        surname: inputSurname,
                        birthPlace: countryNames[k]
                    }

                    client.getPersonSearch(params).then(function(searchResponse) {
                        //var results = searchResponse.getSearchResults();
                        // Get instances of people with name in country[k]
                        var total = searchResponse.getResultsCount();
        //                console.log("Country " + europe[k] + " " + results.length);

                        console.log("Country " + countryNames[k] + " " + total);

                    });
                }, 2000*k);
            }(k));
        }
    });

    // ======================================== //
    // Scroll-spy
    // ======================================== //
    $(window).scroll(function(){
        var windowHeight = $(window).height();
        var countryList = $("#eu-container").position().top;
        var fromTop =  $(document).scrollTop();
        var resultsZone = $("#results-zone").position().top;

        // current position
        var currentPosition = fromTop+windowHeight;

        // decide if we need to higlight the bar or nto
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
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });








    $('#submit2').click(function() {
        birthDate = $('#birthDate').val() + "~";

        var params = {
            givenName: $('#givenName').val(),
            birthDate: birthDate
        };

        console.log("param used: " + params.givenName);

        client.getPersonSearch(params).then(function(searchResponse){
            var results = searchResponse.getSearchResults();

            console.log("Response length: " + results.length);

            var countries = [];
            var countryNames = [];
            var countryCounter = [];
            countries.push(['Country', 'Number of People']);

            if(results.length > 0) {
                var tmpCountries = [];
                for(var i = 0; i < results.length; i++){
                    /* tryout getPrimaryPerson */
                    var result = results[i];
                    person = result.getPrimaryPerson();
                    birth = person.getBirth();

                    console.log("Person name: " + person.getDisplayName());
                    console.log("Normalized Place: " + birth.getNormalizedPlace());
                    console.log("Get Place: " + birth.getPlace());
                    console.log("Bet date: " + birth.getDate());
                    console.log("Get formal date: " + birth.getNormalizedDate());

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
                } // end: PERSOONS LOOP
            } // end: results found IF-ELSE

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

        }); //end getPersonSearch function
    }); // end onSubmit function
});


//backup search function
function backupSearch() {
    $('#submit').click(function(){

        var params = {
              givenName: $('#givenName').val(),
              surname: $('#surname').val()//,
              //birthDate: $('#birthDate').val(),
              //birthPlace: $('#birthPlace').val(),
              //deathDate: $('#deathDate').val(),
              //deathPlace: $('#deathPlace').val(),
              //fatherGivenName: $('#fatherGivenName').val(),
              //fatherSurname: $('#fatherSurname').val(),
              //motherGivenName: $('#motherGivenName').val(),
              //motherSurname: $('#motherSurname').val(),
              //spouseGivenName: $('#spouseGivenName').val(),
              //spouseSurname: $('#spouseSurname').val()
            };

        client.getPersonSearch(params).then(function(searchResponse){

            var results = searchResponse.getSearchResults();
            var numberResults = searchResponse.getResultsCount();
            var context = searchResponse.getContext();
            //alert(numberResults);
            //alert(context);
            if(results.length == 0) alert("NO RESULTS");
            else {
                for(var i = 0; i < results.length; i++){
                    /* tryout getPrimaryPerson */
                    var result = results[i];
                    person = result.getPrimaryPerson();
                    birth = person.getBirth();
                    birthPlace = birth.getNormalizedPlace();
                    alert("Birth Place: " + birthPlace);


                    childs = result.getChildIds();
                    //alert(childs.length);
                    if(childs.length > 0) {
                        //alert("IN");
                        children = result.getChildren();
                        for(var j = 0; j < children.length; j++) {
                            child = children[j];
                            //alert(child.getId());
                        }
                    }
                    //alert(person.getId());
                }
            }
        });
    });
}
