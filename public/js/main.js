//-----------------------------------------------------------------------------------------------------
// Global variables
//-----------------------------------------------------------------------------------------------------
import {addRestroom} from './addRestroom.js';
let authUser = {                                 // authorized User's info
    email: '',
    password: '',
    userName: '',
    loggedIn: false,
    errMessage: '',
    authToken: ''
};

var restroomArray = [];                          // main array of known restrooms 

var map, infoWindow, service;                    // google map data

//--------------------------------------------------------------------------------------------------
//  map functions
//--------------------------------------------------------------------------------------------------
getAllRestRooms();

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
            getLocation(myLatLng);
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
        getLocation(myLatLng);
    }

    //
    // Add listner to capture map location click events that are not know restroom locations
    //
    map.addListener('click', event => {
        let restroom = {
            name: "",
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            zIndex: 1
        }
    console.log(`DEBUG - after definition ${JSON.stringify(restroom)}`);

        //
        // Determine if the user clicked on a known google map "place" 
        //
        console.log(`DEBUG - place id: ${event.placeId}`);
        if (event.placeId) {
            service.getDetails( {placeId: event.placeId}, (place, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    console.log(`DEBUG - place name: ${place.name}`);
                    restroom.name = place.name;
                }
                addRestroom( restroom );
            });
        }
        else {
            addRestroom( restroom );
        }
    });
   
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
};


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
        addNewMarker( map, restRooms[i] );
    }
}

function addNewMarker( map, restroom ) {
    var pinForRestroom = {                           // custom restroom pin images
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

    addMarkerUniqID(marker, restroom.id);
}

function addMarkerUniqID(marker, ID) {
    var newInfoWindow = new google.maps.InfoWindow({
        markerID: ID
    });

    marker.addListener('click', function () {
        // newInfoWindow.open( marker.get('map'), marker);
        console.log(`DEBUG - addMarkerUniqID() - ${newInfoWindow.markerID}`);
        $.get(`/api/getRestRoom/${newInfoWindow.markerID}`, function (data) {
            console.log(`DEBUG - addMarkerUniqID() .... ${JSON.stringify(data)}`);
        });
    });
}

function getAllRestRooms() {
    $.get('/api/allRestRooms', function (restRooms) {
        console.log(`DEBUG - getAllRestRooms() - # of Rest Rooms = ${restRooms.length}`);
        setMarkers(map, restRooms);
    });
};

function getLocation(latlng) {
    $.post("/map/gasStations", latlng, function (data){
        if (data){
            console.log(data)
            for(var i = 0; i < data.length; i ++){
                restroomArray.push({
                    name: data[i].name,
                    lat: data[i].geometry.location.lat,
                    lng: data[i].geometry.location.lng,
                    zIndex: 1
                });
            }
        }
    })
  
    $.post('/map/restaurant', latlng, function (data) {
        if (data){
            console.log(data)
            for(var i = 0; i < data.length; i ++){
                restroomArray.push({
                    name: data[i].name,
                    lat: data[i].geometry.location.lat,
                    lng: data[i].geometry.location.lng,
                    zIndex: 1
                });
            }
            setTimeout(function(){setMarkers(map, restroomArray)}, 50);
        }
    }) 

};  
//--------------------------------------------------------------------------------------------------
$(document).ready(function () {
    ///////////////////////////////////////////////////////
    // Get elements
    ///////////////////////////////////////////////////////
    const userEmail = $('#userEmail'); //registered user
    const userPassword = $('#userPassword'); //registered user
    //--------------------------------------------------------
    const txtUsername = $('#txtUsername'); //new user
    const txtEmail = $('#txtEmail'); //new user
    const txtPassword = $('#txtPassword'); //new user
    //--------------------------------------------------------

    /////////////////////////////////////////////////////// 
    //Add login event
    ///////////////////////////////////////////////////////
    $('#btnLogin').on('click', e => {
        e.preventDefault();
        // Get email and pass
        authUser.email = userEmail.val();
        authUser.password = userPassword.val();

        $.post('/api/authSignIn', authUser, (validAuthUser) => {
            authUser = validAuthUser;
            if (authUser.loggedIn) {
                console.log('I made it this far!');
                $('#user_div').hide();
                $('#main_div').hide();
            } else {
                $('#exampleModal').modal();
                console.log(authUser.errMessage);
            }
        });

    });

    ///////////////////////////////////////////////////////
    // Add login to signup event
    ///////////////////////////////////////////////////////
    $('#sign-up').on('click', e => {
        $('.log-section').hide();
        $('#signupDiv').show('slow');
    });


    ///////////////////////////////////////////////////////
    // Add signup event
    ///////////////////////////////////////////////////////
    $('#createUser').on('click', e => {
        // Get username, email, and pass
        authUser.email = txtEmail.val();
        authUser.password = txtPassword.val();
        authUser.userName = txtUsername.val().trim();

        $.post('/api/authCreateUser', authUser, (validAuthUser) => {
            authUser = validAuthUser;
            if (authUser.loggedIn) {
                console.log('I made it this far!');
                $('#signupDiv').modal('hide');
                $('#user_div').hide();
                $('#main_div').hide();
            } else {
                $('#exampleModal').modal();
                console.log(authUser.errMessage);
            }
        });
    });

    $('#btnLogout').on('click', e => {
        $.post('/api/authSignOut', authUser, (validAuthUser) => {
            authUser = validAuthUser;
            window.location.assign('/');
        });
    });

    $('#sign-out').on('click', e => {
        $.post('/api/authSignOut', authUser, (validAuthUser) => {
            authUser = validAuthUser;
            window.location.assign('/');
        });
    });

    ///////////////////////////////////////////////////////
    //Review Modal Content (pulling info from DB)
    ///////////////////////////////////////////////////////


    //star rating

    $("#rateYoStars").rateYo({
        rating: "50%",
        precision: 0

    });
    // Getter
    var normalFill = $("#rateYoStars").rateYo("option", "rating"); //returns 50

    // Setter
    $("#rateYoStars").rateYo("option", "rating", 5); //returns a jQuery Element



    ///////////////////////////////////////////////////////
    //User click btn event to go to rating modal
    ///////////////////////////////////////////////////////
    $('#addReviewBtn').on('click', e => {
        $('#ratingModal').modal('show');
        $('#review-modal').modal('hide');
        $('#locationModal').modal('hide');
    });


    ///////////////////////////////////////////////////////
    // Rating Modal Event
    //http://rateyo.fundoocode.ninja/#method-rating
    ///////////////////////////////////////////////////////
    //This is not working yet (not creating json obj)...
    //Needs to include restroomId, username, rating, comments

    //Star rating function (do not erase ;)
    $("#rateYo").rateYo({
        onSet: function (rating, rateYoInstance) {
            // $(this).parent().parent().data('rating', rating); //TA Alan's code (not in correct spot)
            //gets user rating
            rating = Math.ceil(rating);
            $('#rating_input').val(rating); //setting up rating value to hidden field
            console.log("User rating: " + rating);
        }

    });

    //when user click 'save' button, response will print (still not json obj)
    $('#updateRatingBtn').click(function () {
        //api call
        //update our database
        $('#ratingModal').modal('hide');
        //uncomment restroomId and locationRating once they are connected to db
        // var restroomId = $('#ratingModal #locationName').val().trim();
        // var userUsername = $('#ratingModal #ratingUsername').val().trim();

        var locationRating = $('#ratingModal #rating_input');
        var comments = $('#ratingModal #commentBox');
        //prints to DOM
        $.post('/api/addReview', // url
            {
                starRating: locationRating,
                remarks: comments,
            }, // data to be submit
            function (data, status, jqXHR) {
                console.log(`${status} ${data}`);
            })
        // $('#result').html(comments + " " + locationRating + " " + userUsername + " " + restroomId);
        console.log(locationRating + " " + comments);
    });


    //Alan's code:
    // $(function () {
    //     //Star rating function
    //     $("#rateYo").rateYo({
    //         onSet: function (rating, rateYoInstance) {
    //             //gets user rating
    //             rating = Math.ceil(rating);
    //             $(this).parent().parent().data(`rating`, rating);
    //             console.log(this);

    //             $('#rating_input').val(rating); //setting up rating value to hidden field
    //             // alert("Rating is set to: " + rating);
    //             console.log("User rating: " + rating);
    //         }
    //     });

    //     $("#updateRatingBtn").on("click", function (event) {
    //         //Get user comment
    //         var comment = $("#commentBox").val();
    //         var reviewObj = {
    //           comment: comment,
    //           rating = $(this).parent().data(`rating`);
    //         }
    //         console.log(reviewObj);
    //         // add in whatever you need to do with it. Maybe save it ina database?  Maybe just passing it to the DOM? 
    //     });
    // });

});