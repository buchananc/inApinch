//Candace's
var config = {
    apiKey: "AIzaSyA2_tnNsCgwOh6gNQIhuBPu5dzrtdctTEU",
    authDomain: "in-a-pinch-project-2.firebaseapp.com",
    databaseURL: "https://in-a-pinch-project-2.firebaseio.com",
    projectId: "in-a-pinch-project-2",
    storageBucket: "in-a-pinch-project-2.appspot.com",
    messagingSenderId: "674290992138"
};

firebase.initializeApp(config);
// Get a reference to the database service
const auth = firebase.auth();
// const usersRef = firebase.database().ref("/users");

$(document).ready(function () {
    ///////////////////////////////////////////////////////
    // Get elements
    ///////////////////////////////////////////////////////
    const userEmail = document.getElementById('userEmail'); //registered user
    const userPassword = document.getElementById('userPassword'); //registered user
    //--------------------------------------------------------
    const txtUsername = document.getElementById('txtUsername'); //new user
    const txtEmail = document.getElementById('txtEmail'); //new user
    const txtPassword = document.getElementById('txtPassword'); //new user
    //--------------------------------------------------------
    const btnLogin = document.getElementById('btnLogin');
    const btnRegister = document.getElementById('btnRegister');
    const btnLogout = document.getElementById('btnLogout');

    /////////////////////////////////////////////////////// 
    //Add login event
    ///////////////////////////////////////////////////////
    $("#btnLogin").on('click', e => {
        e.preventDefault();
        // Get email and pass
        const email = userEmail.value;
        const pass = userPassword.value;

        console.log(email, pass);

        // Sign in
        auth.signInWithEmailAndPassword(email, pass)
            .then(user => {
                console.log("I made it this far!");
                document.getElementById("user_para").innerHTML = "Welcome User: " + user.displayName;
            })
            .catch(function (error) {
                // Handle error
                var errorCode = error.code;
                var errorMessage = error.message;

                $("#exampleModal").modal();
                // alert("You look a little flushed! The email you entered is not correct. Try again!");
                console.log(errorMessage);
                // alert(errorMessage);
            });
    });

    ///////////////////////////////////////////////////////
    // Add login to signup event
    ///////////////////////////////////////////////////////
    $('#sign-up').on('click', e => {
        $('.log-section').hide();
        $('#signupDiv').show("slow");
    });


    ///////////////////////////////////////////////////////
    // Add signup event
    ///////////////////////////////////////////////////////
    $('#createUser').on('click', e => {
        // Get username, email, and pass
        const displayName = txtUsername.value.trim(); //added, not working yet
        const email = txtEmail.value;
        const pass = txtPassword.value;


        // Sign up
        auth.createUserWithEmailAndPassword(email, pass)
            .then(function (userCredential) {
                userCredential.user.updateProfile({
                    displayName: displayName
                }).then(function () {
                    console.log(userCredential);
                    //if redirecting to /map the line below can be taken out
                    document.getElementById("user_para").innerHTML = "Welcome User: " + userCredential.user.displayName;
                    ('#signupDiv').modal('hide'); ///TODO: doesnt hide modal 
                });
            })
            .catch(function (e) {
                console.log(`error from createUserWithEmailAndPassword() ${e.message}`);
            });

    });

    btnLogout.addEventListener('click', e => {
        auth.signOut();
    });


    ///////////////////////////////////////////////////////
    // Add a realtime listener
    ///////////////////////////////////////////////////////

    auth.onAuthStateChanged(function (user) {
        console.log(user);

        if (user) {

            // User is signed in.
            document.getElementById("user_div").style.display = "block";
            document.getElementById("main_div").style.display = "none";
            document.getElementById("user_para").innerHTML = "Welcome User: " + user.displayName;
            window.location.assign('/map');
        } else {

            // No user is signed in.
            console.log("not logged in");
            document.getElementById("user_div").style.display = "none";
            document.getElementById("main_div").style.display = "block";
        }
    });

    ///////////////////////////////////////////////////////
    //User click btn event to go to rating modal
    ///////////////////////////////////////////////////////

    $("#addReviewBtn").on('click', e => {
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