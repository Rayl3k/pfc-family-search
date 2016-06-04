var map;

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

    /*var image = {
            url: 'images/googleMarker.png',
            size: new google.maps.Size(85, 100),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(42, 100)
    };*/

    geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          });
        }
    });
}

$( document ).ready(function() {

    $('#submit').click(function() {
        var params = {
            givenName: $('#givenName').val()
        };

        client.getPersonSearch(params).then(function(searchResponse){
            var results = searchResponse.getSearchResults();

            if(results.length == 0) alert("NO RESULTS");
            else {
                for(var i = 0; i < results.length; i++){
                    /* tryout getPrimaryPerson */
                    var result = results[i];
                    person = result.getPrimaryPerson();
                    birth = person.getBirth();

                    if(typeof birth !== "undefined") {
                        birthPlace = birth.getNormalizedPlace();

                        if(birthPlace.length > 0) {
                            birthParams = birthPlace.split(',');
                            lengthParams = birthParams.length;
                            console.log(birthParams[lengthParams-1]);
                            changeMapPosition(birthParams[lengthParams-1]);
                        }
                    }
                    else alert("undefined");
                    //alert("Birth Place: " + birthParams[lengthParams-1]);
                }
            }
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
