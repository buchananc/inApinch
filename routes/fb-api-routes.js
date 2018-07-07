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

module.exports = function(app) {

    app.post('/api/authCreateUser', function(req, res) {
        let authUser = req.body;
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
                authUser.loggedIn = false;
                authUser.errMessage =  err.message;
                res.json(authUser);
            });
    });

    app.post('/api/authSignIn', function(req, res) {
        let authUser = req.body;
        auth.signInWithEmailAndPassword( authUser.email, authUser.password)
        .then( userCredential => {
            authUser.userName = userCredential.user.displayName;
            authUser.loggedIn = true;
            ///////////////////////////////////////////////////////////////////////
            // ToDo: need to add logic to add user data to db to track user's state
            ///////////////////////////////////////////////////////////////////////
            res.json(authUser);
        })
        .catch( err => {
            authUser.loggedIn = false;
            authUser.errMessage =  err.message;
            res.json(authUser);
        });
    });

    app.post('/api/authSignOut', function(req, res) {
        let authUser = req.body;
        authUser.email = '';
        authUser.password = '';
        authUser.userName = 'Guest';
        authUser.loggedIn = false;
        authUser.errMessage = '';
        authUser.authToken = '';
        ///////////////////////////////////////////////////////////////////////
        // ToDo: need to add logic to remove user data in db 
        ///////////////////////////////////////////////////////////////////////
        res.json(authUser);
    });

    app.get('/api/getAuthUser', function(req, res) {
        let user = {
            name: 'TestUser',
            token: 'ewoiadkfsio320ufeaidshsn'
        };
        res.json( user );
    });

};