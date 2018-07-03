let db = require("../models");
let reviews = require('./reviews.json');

console.log(`# of json records = ${reviews.length}`);
let numberOfReviews = reviews.length;

db.sequelize.sync().then(function() {
    db.Potty.findAll({}).then( function(restRooms) {
        console.log(`# of restrooms ${restRooms.length}`);
        for (let i=0; i<restRooms.length; i++) {
            //let rNumOfReviews = Math.floor(Math.random() * numberOfReviews);
            let rNumOfReviews = Math.floor(Math.random() * 2);
            let rStart = Math.floor(Math.random() * numberOfReviews);
            let count = 0;
    
            for (let j=rStart; j<numberOfReviews; j++ ) {
                if ( count < rNumOfReviews ) {
                    ++count;
                    reviews[j].PottyId = restRooms[i].id;
                    writeReview( reviews[j] );
                }
            }
    
            for (let j=0; j<count; j++ ) {
                if ( count < rNumOfReviews ) {
                    ++count;
                    reviews[j].PottyId = restRooms[i].id;
                    writeReview( reviews[j] );
                }
            }
        }
    });

    
});

console.log(`End of js`);

function writeReview( rec ) {
  db.Reviews.create( rec ).then(function() { });
};