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

   
    $.post('/map', location, function(response){
        if(response){

        var geodata = response;
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
    };
});
}