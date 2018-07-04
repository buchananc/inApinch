$("#location-btn").on("click", function () {
    if (authUser.loggedIn) {
        $('#locationModal').modal('show')
        
    } else {
        alert("You must be logged in to add a new Restroom!")
    }
})

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

        $.post('/map/location', queryString, function(data){
            if(data){
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
            console.log(newRestroom); 

            $.post("/api/newrestrom", newRestroom, function(res){
                if(res){
                    console.log("made a succsessfull post request")
                }
                else{
                    console.log("post request didn't happen")
                }
            }).then($( "#close-modal" ).trigger( "click" ));
        });  

    } else {
        console.log("Error occured")
    }

   

});