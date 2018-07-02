let path = require('path');

var firebase = require('firebase');
var config = {
    apiKey: 'AIzaSyA2_tnNsCgwOh6gNQIhuBPu5dzrtdctTEU',
    authDomain: 'in-a-pinch-project-2.firebaseapp.com',
    databaseURL: 'https://in-a-pinch-project-2.firebaseio.com',
    projectId: 'in-a-pinch-project-2',
    storageBucket: 'in-a-pinch-project-2.appspot.com',
    messagingSenderId: '674290992138'
};
firebase.initializeApp(config);

const auth = firebase.auth();
// const usersRef = firebase.database().ref('/users');


const email = 'testtaw1@gmail.com'
const pass = 'generic';

module.exports = function(app) {

    app.post('/api/authCreateUser', function(req, res) {
        let authUser = req.body;
        console.log( authUser );
        auth.createUserWithEmailAndPassword( authUser.email, authUser.password)
            .then( userCredential => {
                userCredential.user.updateProfile({
                    displayName: authUser.userName
                }).then( () => {
                    authUser.loggedIn = true;
                    ///////////////////////////////////////////////////////////////////////
                    // ToDo: need to add logic to add user data to db to track user's state
                    ///////////////////////////////////////////////////////////////////////
                    res.json(authUser);
                });
            })
            .catch( err => {
                console.log( 'DEBUG - Failed to create user' );
                console.log( err.message );
                authUser.loggedIn = false;
                authUser.errMessage =  err.message;
                res.json(authUser);
            });
    });

    app.post('/api/authSignIn', function(req, res) {
        let authUser = req.body;
        auth.signInWithEmailAndPassword( authUser.email, authUser.password)
        .then( userCredential => {
            console.log(`DEBUG - ${userCredential.user.displayName} !!Logged in!!!`);
            authUser.userName = userCredential.user.displayName;
            authUser.loggedIn = true;
            ///////////////////////////////////////////////////////////////////////
            // ToDo: need to add logic to add user data to db to track user's state
            ///////////////////////////////////////////////////////////////////////
            res.json(authUser);
        })
        .catch( err => {
            console.log( 'Failed to log in' );
            console.log( err.message );
            authUser.loggedIn = false;
            authUser.errMessage =  err.message;
            res.json(authUser);
        });
    });

    app.post('/api/authSignOut', function(req, res) {
        let authUser = req.body;
        authUser.email = '';
        authUser.password = '';
        authUser.userName = '';
        authUser.loggedIn = false;
        authUser.errMessage = '';
        authUser.authToken = '';
        console.log('!!Log out!!!');
        ///////////////////////////////////////////////////////////////////////
        // ToDo: need to add logic to remove user data in db 
        ///////////////////////////////////////////////////////////////////////
        res.json(authUser);
    });

    app.get('/api/getAuthUser', function(req, res) {
        console.log('DEBUG - getAuthUsers route')
        let user = {
            name: 'TestUser',
            token: 'ewoiadkfsio320ufeaidshsn'
        };
        res.json( user );
    });

};



/*---------------------------------------------------------------------------------------------
 I have not found a way for this to work for a server with mulitple clients/users

    ///////////////////////////////////////////////////////
    // Add a realtime listener
    ///////////////////////////////////////////////////////
    auth.onAuthStateChanged(function (user) {
        console.log(user);

        if (user) {
            // User is signed in.
            $('#user_div').show();
            $('#main_div').hide();
            $('#user_para').text('Welcome User: ' + user.displayName);
            window.location.assign('/map');
        } else {
            // No user is signed in.
            console.log('not logged in');
            $('#user_div').hide();
            $('#main_div').show();
        }
    });

*/
