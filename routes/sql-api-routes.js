let db = require('../models');

module.exports = function (app) {

    app.get('/api/allRestRooms', function(req, res) {
        db.Potty.findAll({}).then( function(restRooms) {
            console.log( `DEBUG - html-routes - # of Rest Rooms = ${restRooms.length}`);
            res.json(restRooms);
        });
    });

    app.get('/api/getRestroom/:id', function(req, res) {
        db.Potty.findOne({
            where: {
                id: req.params.id
            }
        }).then( function(potty) {
            res.json(potty);
        });
    });

    app.post('/api/addRestroom', function(req, res) {
        console.log(`DEBUG - sql post - ${JSON.stringify(req.body)}`);
        db.Potty.create( req.body ).then( function(dbPost) {
            res.json(dbPost);
        });
    });

};