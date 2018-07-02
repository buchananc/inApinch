//-----------------------------------------------------------------------------------------------------
// Global variable for the client user's info
//-----------------------------------------------------------------------------------------------------
let authUser = {
  email: '',
  password: '',
  userName: '',
  loggedIn: false,
  errMessage: '',
  authToken: ''
};

$(document).ready(function () {
    ///////////////////////////////////////////////////////
    // Get elements
    ///////////////////////////////////////////////////////
    const userEmail = $('#userEmail');                            //registered user
    const userPassword = $('#userPassword');                      //registered user
    //--------------------------------------------------------
    const txtUsername = $('#txtUsername');                        //new user
    const txtEmail = $('#txtEmail');                              //new user
    const txtPassword = $('#txtPassword');                        //new user
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
                $('#user_div').show();
                $('#main_div').hide();
                $('#user_para').text('Welcome User: ' + authUser.userName);
            }
            else {
                $('#exampleModal').modal();
                console.log( authUser.errMessage );
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
                $('#user_para').text('Welcome User: ' + authUser.logedIn);
                $('#signupDiv').modal('hide'); 
                $('#user_div').hide();
                $('#main_div').hide();
            }
            else {
                $('#exampleModal').modal();
                console.log( authUser.errMessage );
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
    //User click btn event to go to rating modal
    ///////////////////////////////////////////////////////
    $('#addReviewBtn').on('click', e => {
        $('#ratingModal').modal('show');
        $('#review-modal').modal('hide');
        $('#locationModal').modal('hide');
    });


    ///////////////////////////////////////////////////////
    // Rating Modal Event
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
        //uncomment restroomId and locationRating once they are connected to db
        // var restroomId = $('#ratingModal #locationName').val().trim();
        // var userUsername = $('#ratingModal #ratingUsername').val().trim();

        var locationRating = $('#ratingModal #rating_input');
        var comments = $('#ratingModal #commentBox');
        //prints to DOM
        // $('#result').html(comments + " " + locationRating + " " + userUsername + " " + restroomId);
        console.log(locationRating + " " + comments);
    });

});