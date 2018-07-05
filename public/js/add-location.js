// Listen to plus btn click
$("#location-btn").on("click", function () {
    if (authUser.loggedIn) {
        $('#locationModal').modal('show')

    } else {
        alert("You must be logged in to add a new Restroom!")
    }
})

// Add Restroom click event
$("#add-restroom").on("click", function () {

    // Take values from the form
    var name = $("#name_field").val().trim();
    var street = $("#street_id").val().trim().replace(/ /g, "+");
    var city = $("#city").val().trim().replace(/ /g, "+");
    var state = $("#state").val().trim().replace(/ /g, "+");
    var zip = $("#zip").val().trim();

    // Create queryString
    var queryString = street + ",+";
    queryString += city + ",+";
    queryString += state + ",+";
    queryString += zip;

    console.log( `DEBUG - add address before post ` );

    $.post('/map/location', queryString, function (data) {
        if (data) {
            var geocode = data[0].geometry.location;
            var lat = geocode.lat;
            var lng = geocode.lng;
        }
        var newRestroom = {
            name: name,
            lat: lat,
            lng: lng,
            zIndex: 1
        };
        console.log( `DEBUG - add address: ${JSON.stringify(newRestroom)}` );

        // this will add the marker to the map and write to the db
        addRestroom( newRestroom );

        $('#locationModal').modal('hide');
        clearAddressForm();
    });
});

function addDropPinEvent( jq_dropPin ) {

    jq_dropPin.on("click", function () {
        $('#locationModal').modal('hide');
        dropPinOnMapEnabled = true;
    });
};

// Function to clear the form 
function clearAddressForm(){
    $("input[type=text]").val("");
}