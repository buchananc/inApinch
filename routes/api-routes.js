require("dotenv").config();
var googleMapsClient = require('@google/maps').createClient({
    key: process.env.apiKey
});
module.exports = function (app) {
    app.post('/map/gasStations', function (req, res) {
        
        var lat = req.body.lat;
        var lng = req.body.lng;
        googleMapsClient.places({
            location: lat + ',' + lng,
            radius: 8500,
            type: 'gas_station',
        }, function (err, response) {
            if (!err) {
                var gasStations = (response.json.results);
            }
            res.json(gasStations)
        })
    })
    app.post('/map/restaurant', function (req, res) {
        
        var lat = req.body.lat;
        var lng = req.body.lng;

        googleMapsClient.places({
            location: lat + ',' + lng,
            radius: 8500,
            type: 'restaurant',
        }, function (err, response) {
            if (!err) {
                var restaurants = (response.json.results);
            }
            res.json(restaurants)
        })


    })
}