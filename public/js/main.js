//-----------------------------------------------------------------------------------------------------
// Global variables
//-----------------------------------------------------------------------------------------------------
let authUser = { // authorized User's info
    email: '',
    password: '',
    userName: '',
    loggedIn: false,
    errMessage: '',
    authToken: ''
};

let selectedRestroom = { // restroom object
    id: -1,
    name: '',
    lat: 0.0,
    lng: 0.0,
    zIndex: -1,
    avgRating: -1,
    lastThreeRev: []
};

var restroomArray = []; // main array of known restrooms 

var map, infoWindow, service; // google map data

//
// Start creating all known map locations as soon as possible
//
getAllRestRooms();

//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
$(document).ready(function () {

    /////////////////////////////////////////////////////// 
    //Add login event
    ///////////////////////////////////////////////////////
    addLoginClickEvent( $('#btnLogin') );

    ///////////////////////////////////////////////////////
    // Add 'Sign Up Now' event
    ///////////////////////////////////////////////////////
    addSignUpNowEvent( $('#sign-up') );

    ///////////////////////////////////////////////////////
    // Add 'Sign Up' event and create user
    ///////////////////////////////////////////////////////
    addCreateUserEvent( $('#createUser') );

    ///////////////////////////////////////////////////////
    // Add logout event for Welcome DIV
    ///////////////////////////////////////////////////////
    addLogoutEvent( $('#btnLogout') );

    ///////////////////////////////////////////////////////
    // Add logout event for Welcome DIV
    ///////////////////////////////////////////////////////
    addLogoutEvent( $('#sign-out') );

    ///////////////////////////////////////////////////////
    // User click btn event to add a review
    ///////////////////////////////////////////////////////
    addReviewEvent( $('#addReviewBtn') );

    ///////////////////////////////////////////////////////
    // User decides to save the rating
    ///////////////////////////////////////////////////////
    saveRatingEvent( $('#updateRatingBtn') );

    ///////////////////////////////////////////////////////
    // Listening to Enter keypress while typing in search area
    ///////////////////////////////////////////////////////
    addSearchEnterEvent( $('#nav-search') );

    ///////////////////////////////////////////////////////
    // Listening to Search-icon click
    ///////////////////////////////////////////////////////
    addSearchButtonEvent( $('#search-btn-icon') )

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

});