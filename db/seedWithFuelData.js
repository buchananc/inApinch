let db = require("../models");
let govData = require('./fuelStations.json');

console.log(`# of json records = ${govData.fuel_stations.length}`);

let arrayOfStations = [];

for (let i=0; i<govData.fuel_stations.length; i++) {
    if ( (govData.fuel_stations[i].access_code == 'public') 
      && (govData.fuel_stations[i].fuel_type_code == 'ELEC') 
      && (govData.fuel_stations[i].access_days_time == '24 hours daily')) {
        arrayOfStations.push({
            name: govData.fuel_stations[i].station_name,
            lat: govData.fuel_stations[i].latitude,
            lng: govData.fuel_stations[i].longitude,
            zIndex:   1
        });
    }
};
console.log(`# in array = ${arrayOfStations.length}`);

db.sequelize.sync().then(function() {
    db.Potty.bulkCreate( arrayOfStations ).then(function() {
        console.log("Done bulkCreate()!");
        db.sequelize.close().then( function() { 
            console.log("db closed"); 
        });
    });
});

console.log(`End of js`);