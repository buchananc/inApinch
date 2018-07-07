//-------------------------------------------------------------------------------------------------
//  All mouse click events
//-------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------
// user clicks the Login in Button  ( Add login event )
//-------------------------------------------------------------------------------------------------
function addLoginClickEvent(jq_btnLogin) {

    const userEmail = $('#userEmail'); //registered user
    const userPassword = $('#userPassword'); //registered user

    jq_btnLogin.on('click', e => {
        e.preventDefault();
        // Get email and pass
        authUser.email = userEmail.val();
        authUser.password = userPassword.val();

        $.post('/api/authSignIn', authUser, (validAuthUser) => {
            authUser = validAuthUser;
            if (authUser.loggedIn) {
                $('#user_div').hide();
                $('#main_div').hide();
                // Render userName in the navbar
                $('#dropdownMenuLink').text(authUser.userName);
            } else {
                $('#exampleModal').modal();
            }
        });

    });
}

//-------------------------------------------------------------------------------------------------
// user clicks "Continue as Guest"
//-------------------------------------------------------------------------------------------------
function addContinueAsGuestEvent(jq_btnGuest) {

    jq_btnGuest.on('click', e => {
        e.preventDefault();

        $('#user_div').hide();
        $('#main_div').hide();
    });
}


//-------------------------------------------------------------------------------------------------
// user decides to "Sign Up now" ( Add signup event )
//-------------------------------------------------------------------------------------------------
function addSignUpNowEvent(jq_siginUp) {
    jq_siginUp.on('click', e => {
        $('.log-section').hide();
        $('#signupDiv').show('slow');
    });
}

//-------------------------------------------------------------------------------------------------
// user decides to "Sign Up" and create user
//-------------------------------------------------------------------------------------------------
function addCreateUserEvent(jq_createUser) {
    const txtUsername = $('#txtUsername'); //new user
    const txtEmail = $('#txtEmail'); //new user
    const txtPassword = $('#txtPassword'); //new user

    jq_createUser.on('click', e => {
        // Get username, email, and pass
        authUser.email = txtEmail.val();
        authUser.password = txtPassword.val();
        authUser.userName = txtUsername.val().trim();

        $.post('/api/authCreateUser', authUser, (validAuthUser) => {
            authUser = validAuthUser;
            if (authUser.loggedIn) {
                $('#signupDiv').modal('hide');
                $('#user_div').hide();
                $('#main_div').hide();
                // Render userName in the navbar
                $('#dropdownMenuLink').text(authUser.userName);
            } else {
                $('#exampleModal').modal();
            }
        });
    });
}

//-------------------------------------------------------------------------------------------------
// user decides to logout 
//-------------------------------------------------------------------------------------------------
function addLogoutEvent(jq_element) {
    jq_element.on('click', e => {
        $.post('/api/authSignOut', authUser, (validAuthUser) => {
            authUser = validAuthUser;
            $('#main_div').show();
            $('#dropdownMenuLink').text(authUser.userName);
        });
    });
}

//-------------------------------------------------------------------------------------------------
// user decides to add a review
//-------------------------------------------------------------------------------------------------
function addReviewEvent(jq_addReviewBtn) {
    jq_addReviewBtn.on('click', e => {
        if (authUser.loggedIn) {

            $('#ratingModal').modal('show');
            $('#review-modal').modal('hide');
            $('#locationModal').modal('hide');

            $('#ratingUsername').text(authUser.userName);
            $('#rateThisTitle').text(selectedRestroom.name);
        } else {
            alert("You must be logged in to add a Review!");
        }

    });
}


//-------------------------------------------------------------------------------------------------
// user decides to hit the save review button
//-------------------------------------------------------------------------------------------------
function saveRatingEvent(jq_updateRatingBtn) {
    jq_updateRatingBtn.click(function () {
        //api call
        //update our database
        $('#ratingModal').modal('hide');

        var locationRating = $('#ratingModal #rating_input').val().trim();
        var comments = $('#ratingModal #commentBox').val().trim();

        $.post('/api/addReview', {
                remarks: comments,
                starRating: locationRating,
                submittedBy: authUser.userName,
                PottyId: selectedRestroom.id
            },
            function (data, status) {
                console.log(``);
            }).done(function(){
                $("#commentBox").val("");
                $("#rateYo").rateYo("option", "rating", "0");
            });
    });
}

//-------------------------------------------------------------------------------------------------
// Listening to Enter keypress while typing in search area
//-------------------------------------------------------------------------------------------------
function addSearchEnterEvent(jq_navSearch) {
    jq_navSearch.keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            searchLocation();
        }
    });
}

//-------------------------------------------------------------------------------------------------
// Listening for search icon click
//-------------------------------------------------------------------------------------------------
function addSearchButtonEvent(jq_searchBtnIcon) {
    jq_searchBtnIcon.on("click", function () {
        searchLocation();
    });
}


//-------------------------------------------------------------------------------------------------
// user clicks on restroom pin
//
//     + query db for restroom and associcated reviews
//     + how review modal
//-------------------------------------------------------------------------------------------------
function addRestroomClickEvent(marker, newInfoWindow) {
    marker.addListener('click', function () {
        $.get(`/api/getRestroomSummary/${newInfoWindow.markerID}`, function (data) {
            $('#review-modal').modal('show');
            selectedRestroom.id = data.id;
            selectedRestroom.name = data.name;
            selectedRestroom.lat = data.lat;
            selectedRestroom.lng = data.lng;
            selectedRestroom.zIndex = data.zIndex;
            selectedRestroom.avgRating = data.avgRating;

            // re-init the values
            selectedRestroom.lastThree = [];


            for (let i = 0; i < data.lastThree.length; i++) {
                selectedRestroom.lastThree.push({
                    submittedBy: data.lastThree[i].submittedBy,
                    starRating: data.lastThree[i].starRating,
                    remarks: data.lastThree[i].remarks
                });
            }

            //setting restroom location name
            $('#restroomTitle').text(selectedRestroom.name);
            for (let i = 0; i < selectedRestroom.lastThree.length; i++) {
                $(`#reviewUser${i+1}`).text(selectedRestroom.lastThree[i].submittedBy);
                $(`#reviewRating${i+1}`).text(selectedRestroom.lastThree[i].starRating);
                $(`#reviewRemarks${i+1}`).text(selectedRestroom.lastThree[i].remarks);
            }
            // TODO ugly way to ensure the other DOM elements don't conatin old data
            for (let i = selectedRestroom.lastThree.length; i < 3; i++) {
                $(`#reviewUser${i+1}`).text('');
                $(`#reviewRating${i+1}`).text('');
                $(`#reviewRemarks${i+1}`).text('');
            }
            //----------------------------------------------
            // STILL A WORK IN PROGRESS
            // Need avg star rating to erase when modal is closed.  
            // Holds the value of the first rating right now.
            //----------------------------------------------

            //
            // Initial definition of star is needed before destory "clears DOM"
            //  This most likely should occur right after the DOM is ready
            //  That way all we would need here would be the "destroy"
            //
            $("#articleRating").rateYo({
                rating: 0,
                starWidth: '35px',
                normalFill: '#d7d7d7', // light gray
                ratedFill: '#F39C12'  // yellow
            });
            $("#articleRating").rateYo("destroy");
            
            //
            // no stars shown if not rated.
            //
            if ( selectedRestroom.avgRating > 0 ) {
                // Set average star rating to rating modal
                // $("#articleRating > .rating").rateYo({
                $("#articleRating").rateYo({
                    rating: selectedRestroom.avgRating,
                    starWidth: '35px',
                    normalFill: '#d7d7d7', // light gray
                    ratedFill: '#F39C12',  // yellow
                    readOnly: true
                });
            }
                //rating: parseInt(selectedRestroom.avgRating),
        });
    });
}

//-------------------------------------------------------------------------------------------------
// user clicks on a portion of the map that does not include a pin
//
//     + if google maps knows this location then determine the use the existing name
//-------------------------------------------------------------------------------------------------
function addPinClickEvent() {
    map.addListener('click', event => {

        //
        // Only allow the user to drop a pin if they are logged in 
        // AND
        // The user selected to drop a PIN
        //
        if (authUser.loggedIn && dropPinOnMapEnabled) {
            let restroom = {
                name: "",
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
                zIndex: 1
            };

            //
            // Determine if the user clicked on a known google map "place" 
            //
            if (event.placeId) {
                service.getDetails({
                    placeId: event.placeId
                }, (place, status) => {

                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        restroom.name = place.name;
                    }
                    addRestroom(restroom);
                });
            } else {
                addRestroom(restroom);

                selectedRestroom.name = restroom.name;
                selectedRestroom.lat = restroom.lat;
                selectedRestroom.lng = restroom.lng;
                selectedRestroom.zIndex = restroom.zIndex;
                //  ADD restroom after save button clicked addSaveRestroomNameEvent
                $('#restroomNameModal').modal('show');
            }

            dropPinOnMapEnabled = false;
        }

    });
}

//-------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
function addSaveRestroomNameEvent(jq_newRestroomSaveBtn) {

    jq_newRestroomSaveBtn.on("click", function () {
        let restroom = {
            name: $('#newRestroomName').val().trim(),
            lat: selectedRestroom.lat,
            lng: selectedRestroom.lng,
            zIndex: selectedRestroom.zIndex
        };
        addRestroom(restroom);
        $('#restroomNameModal').modal('hide');
    });

}