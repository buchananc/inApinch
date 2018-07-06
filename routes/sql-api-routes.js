let db = require('../models');

module.exports = function (app) {

    app.get('/api/allRestrooms', function(req, res) {
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

    app.get('/api/getRestroomSummary/:id', function(req, res) {

        db.Potty.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Reviews]
        }).then( function(potty) {

            console.log(JSON.stringify(potty));

            let summaryOfPotty = {
                id: potty.id,
                name: potty.name,
                lat: potty.lat,
                lat: potty.lat,
                zIndex: potty.zIndex,
                avgRating: -1,
                lastThree: []
            }
            let totalNumOfReviews = potty.Reviews.length;
            summaryOfPotty.avgRating = potty.Reviews.reduce( (sum, review) => sum + review.starRating, 0) / totalNumOfReviews;

            //  TODO:  need to add logic to find the real last 3 reviews
            let numOfRevToInclude=3;
            if ( totalNumOfReviews < numOfRevToInclude ) numOfRevToInclude = totalNumOfReviews;
            for( j=0; j<numOfRevToInclude; j++ ) {
                index = totalNumOfReviews - 1 - j;   // hack last reviews in reverse order
                summaryOfPotty.lastThree.push({
                    submittedBy: potty.Reviews[index].submittedBy,
                    starRating: potty.Reviews[index].starRating,
                    remarks: potty.Reviews[index].remarks
                });
            }

            res.json(summaryOfPotty);
        });
    });


    app.post('/api/addRestroom', function(req, res) {
        console.log(`DEBUG - sql post - ${JSON.stringify(req.body)}`);
        db.Potty.create( req.body ).then( function(dbPost) {
            res.json(dbPost);
        });
    });

    app.post('/api/addReview', function (req, res) {
        console.log(`recieved review ${JSON.stringify(req.body)}`);
        db.Reviews.create(req.body).then(function (dbPost) {
            res.json(dbPost);
        });
    });

    app.post('/api/newRestroom', function(req, res){
        db.Potty.create(req.body).then( function(dbPost) {
            res.json(dbPost);
        });
    })

};