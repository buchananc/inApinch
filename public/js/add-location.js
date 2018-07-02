// Add Restroom click event
$("#add-restroom").on("click", function () {
    // Grab radio button value
    var radioValue = $("input[name='add-data']:checked").val();
    console.log(radioValue);

    // Define a variable for new location
    var newRestroom = {};

    // Cheack if user wants to use currunet location
    if (radioValue === "current-location") {
        var newRestroom = {
            name: "current-location"
        }
    // If address is pluged in manually
    } else if (radioValue === "address") {
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

        var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + queryString + "&key=AIzaSyDekGM5R8k_3h-e_HECVFxKXD-3Tf7-MAI"
        console.log(queryURL);

        // Transform address into Latitude and Longitude
        $.ajax({
            url: queryURL,
            type: "GET",
        }).then(function (response) {
            var geodata = response.results;
            console.log(geodata);
            var geocode = geodata[0].geometry.location;
            var lat = geocode.lat;
            var lng = geocode.lng;

            var newRestroom = {
                restroomName: name,
                lat: lat,
                lng: lng
            };
            console.log(newRestroom);   
        });

    } else {
        console.log("Error occured")
    }

    // $.post("http://localhost/api/newrestrom/", newRestroom, function(res){
    //     if(res === true){
    //         console.log("made a succsessfull post request")
    //     }
    //     else{
    //         console.log("post request didn't happen")
    //     }
    // }).then($( "#close-modal" ).trigger( "click" ));

});