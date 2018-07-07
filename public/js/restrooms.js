//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
function addRestroom(restroom) {

    //
    // TODO:  add modal logic to create a restroom review
    //
    $.post('/api/addRestroom', restroom, (dbRec) => {
        let newRestroom = { // TODO there has to be a better way
            id: dbRec.id,
            name: dbRec.name,
            lat: parseFloat(dbRec.lat),
            lng: parseFloat(dbRec.lng),
            zIndex: parseInt(dbRec.zIndex)
        }
        // ToDo:
        // create funciton to add to array of restrooms
        addNewMarker(map, newRestroom);
    });
};

//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
function getAllRestRooms() {
    $.get('/api/allRestRooms', function (restRooms) {
        setMarkers(map, restRooms);
    });
};