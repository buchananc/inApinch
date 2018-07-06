//--------------------------------------------------------------------------------------------------
//  map functions
//--------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------
//  This is function is referenced/called in main.html and required by google.maps
//--------------------------------------------------------------------------------------------------
function initMap() {
    let myLatLng = {
        lat: 35.22888353357024,
        lng: -80.83476207120572
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 11
    });
    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            myLatLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            console.log(myLatLng);
            // getLocation(myLatLng);
            infoWindow.setPosition(myLatLng);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(myLatLng);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());

        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
        // getLocation(myLatLng);
    }

    //
    // Add listner so that user may drop a pin at new location
    //
    addPinClickEvent();

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    ////////////////////////////////////////////////////////////////////////////////////
    // ToDo - remove this due to it being placed in the middle of the screen
    //         need to determine where to position this
    ///        or set a timeout that will clear it after a few seconds of display
    ////////////////////////////////////////////////////////////////////////////////////
    //infoWindow.setPosition(pos);
    //infoWindow.setContent(browserHasGeolocation ?
    //                      'Error: The Geolocation service failed.' :
    //                      'Error: Your browser doesn\'t support geolocation.');
    //infoWindow.open(map);
}


//-------------------------------------------------------------------------------------------------
// Adds markers to the map.
//
// Marker sizes are expressed as a Size of X,Y where the origin of the image
// (0,0) is located in the top left of the image.
//
// Origins, anchor positions and coordinates of the marker increase in the X
// direction to the right and in the Y direction down.
//-------------------------------------------------------------------------------------------------
function setMarkers(map, restRooms) {

    console.log(`DEBUG - setMarkers() - # of Rest Rooms = ${restRooms.length}`);
    for (var i = 0; i < restRooms.length; i++) {
        addNewMarker(map, restRooms[i]);
    }
}

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
function addNewMarker(map, restroom) {

    //
    // custom restroom pin image
    //
    var pinForRestroom = { 
        url: './images/the-pin.svg',
        scaledSize: new google.maps.Size(32, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
    };

    var marker = new google.maps.Marker({
        position: {
            lat: restroom.lat,
            lng: restroom.lng
        },
        map: map,
        icon: pinForRestroom,
        title: restroom.name,
        zIndex: restroom.zIndex
    });

    var newInfoWindow = new google.maps.InfoWindow({
        markerID: restroom.id
    });
    addRestroomClickEvent( marker, newInfoWindow );
}

//-------------------------------------------------------------------------------------------------
// Search user enter location function
//-------------------------------------------------------------------------------------------------
function searchLocation() {
    // Prevent reloading the page
    event.preventDefault();
    // Get value forn the input
    var location = $("#nav-search").val().trim().replace(/ /g, "+");
    console.log(location);
    $("#nav-search").val("");

   
    $.post('/map/location', location, function(response){
        if (response) {
            var geodata = response;
            console.log(geodata);
            var geocode = geodata[0].geometry.location;
            var lat = geocode.lat;
            var lng = geocode.lng;
            console.log(lat);
            console.log(lng);
            map.setCenter(new google.maps.LatLng(lat, lng));
        }
    });
}


// function getLocation(latlng) {
//     $.post("/map/gasStations", latlng, function (data) {
//         if (data) {
//             console.log(data)
//             for (var i = 0; i < data.length; i++) {
//                 restroomArray.push({
//                     name: data[i].name,
//                     lat: data[i].geometry.location.lat,
//                     lng: data[i].geometry.location.lng,
//                     zIndex: 1
//                 });
//             }
//         }
//     })

//     $.post('/map/restaurant', latlng, function (data) {
//         if (data) {
//             console.log(data)
//             for (var i = 0; i < data.length; i++) {
//                 restroomArray.push({
//                     name: data[i].name,
//                     lat: data[i].geometry.location.lat,
//                     lng: data[i].geometry.location.lng,
//                     zIndex: 1
//                 });
//             }
//             setTimeout(function () { setMarkers(map, restroomArray) }, 50);
//         }
//     })

// };
