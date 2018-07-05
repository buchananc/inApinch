let db = require("../models");
let reviews = require('./reviews.json');

console.log(`# of json records = ${reviews.length}`);
let numberOfReviews = reviews.length;

let arrayOfReviews = [];

db.sequelize.sync().then(function() {
    db.Potty.findAll({}).then( function(restRooms) {
        console.log(`# of restrooms ${restRooms.length}`);
        console.log(`${JSON.stringify(restRooms[0])}`);
        console.log(`${JSON.stringify(restRooms[restRooms.length-1])}`);

        numOfRestroomsToReview = restRooms.length;
        for (let i=0; i<numOfRestroomsToReview; i++) {
            //let rNumOfReviews = Math.floor(Math.random() * numberOfReviews);
            let rNumOfReviews = Math.floor(Math.random() * numberOfReviews);
            let rStart = Math.floor(Math.random() * numberOfReviews);
            let count = 0;
    
            for (let j=rStart; j<numberOfReviews; j++ ) {
                if ( count < rNumOfReviews ) {
                    ++count;
                    reviews[j].PottyId = restRooms[i].id;
                    arrayOfReviews.push( {
                        remarks: reviews[j].remarks,
                        starRating: reviews[j].starRating,
                        submittedBy: reviews[j].submittedBy,
                        PottyId: restRooms[i].id
                     } );
                }
            }
    
            for (let j=0; j<count; j++ ) {
                if ( count < rNumOfReviews ) {
                    ++count;
                    reviews[j].PottyId = restRooms[i].id;
                    arrayOfReviews.push( {
                        remarks: reviews[j].remarks,
                        starRating: reviews[j].starRating,
                        submittedBy: reviews[j].submittedBy,
                        PottyId: restRooms[i].id
                     } );
                }
            }
        }

        let numberOfTotalReviews = arrayOfReviews.length;

console.log(`# in array = ${numOfRestroomsToReview}`);
console.log(`# of Reviews = ${numberOfTotalReviews}`);
console.log(`${JSON.stringify(arrayOfReviews[0])}`);
console.log(`${JSON.stringify(arrayOfReviews[1])}`);
console.log(`${JSON.stringify(arrayOfReviews[numberOfTotalReviews-2])}`);
console.log(`${JSON.stringify(arrayOfReviews[numberOfTotalReviews-1])}`);
        
        db.Reviews.bulkCreate( arrayOfReviews ).then(function() {
            console.log("Done bulkCreate()!");
            db.sequelize.close().then( function() { 
                console.log("db closed"); 
            });
        });

    });

    
});

console.log(`End of js`);

//async function writeReview( rec ) {
//  await db.Reviews.create( rec ).then(function() { });
//};