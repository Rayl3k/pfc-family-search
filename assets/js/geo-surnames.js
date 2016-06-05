/*var map;

// start: Initialize map
function initMap() {
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, {
      center: {lat: 40.416691, lng: -3.700345},
      zoom: 4
    });

    // Resize stuff...
    google.maps.event.addDomListener(window, "resize", function() {
       var center = map.getCenter();
       google.maps.event.trigger(map, "resize");
       map.setCenter(center);
   });
}

function changeMapPosition(address) {
    var geocoder = new google.maps.Geocoder();

    var image = {
            url: 'images/googleMarker.png',
            size: new google.maps.Size(85, 100),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(42, 100)
    };

    geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          });
        }
    });
} */

var geomap;
var geomapData;
var geomapOptions;

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

    $('#submit').click(function() {
        var params = {
            givenName: $('#givenName').val()
        };

        client.getPersonSearch(params).then(function(searchResponse){
            var results = searchResponse.getSearchResults();
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

                            console.log('Current Country: ' + current + ': ' + countryCounter[current]);
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
                if(countryNames[i] != 'undefined') countries.push([countryNames[i], countryCounter[countryNames[i]]]);

            // Log on console results to be printed in graph
            console.log(countries);

            // Clearn geomap + craete new one
            if(geomap) geomap.clearChart();
            geomapData = google.visualization.arrayToDataTable(countries);
            geomap = new google.visualization.GeoChart(document.getElementById('geomap'));
            geomap.draw(geomapData, geomapOptions);
            
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
