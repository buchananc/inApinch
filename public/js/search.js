// Listening to Enter keypress
$('#nav-search').keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        searchLocation();
    }
});

// Listening to Search-icon click
$("#search-btn-icon").on("click", function () {
    searchLocation();
})

// Search function
function searchLocation() {
    // Prevent reloading the page
    event.preventDefault();
    // Get value forn the input
    var location = $("#nav-search").val().trim().replace(/ /g, "+");
    console.log(location)
    $("#nav-search").val("");

    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + location + "&key=AIzaSyDekGM5R8k_3h-e_HECVFxKXD-3Tf7-MAI"
    console.log(queryURL);

    // Get Borders for the map
    $.ajax({
        url: queryURL,
        type: "GET",
    }).then(function (response) {
        var geodata = response.results;
        console.log(geodata);
        var geocode = geodata[0].geometry.bounds;
        var northEastLat = geocode.northeast.lat;
        var northEastLng = geocode.northeast.lng;
        var southwestLat = geocode.southwest.lat;
        var southwestLng = geocode.southwest.lng
        console.log(northEastLat)
        console.log(northEastLng)
        console.log(southwestLat)
        console.log(southwestLng)
    });
}