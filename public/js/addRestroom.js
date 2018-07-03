export {
    addRestroom
};
function addRestroom(restroom) {

    console.log(`DEBUG - before post ${JSON.stringify(restroom)}`);

    //
    // TODO:  add modal logic to create a restroom review
    //
    $.post('/api/addRestroom', restroom, (dbRec) => {
        console.log('DEBUG - add restroom to db');
        console.log(dbRec);
        let newRestroom = { // TODO there has to be a better way
            id: dbRec.id,
            name: dbRec.name,
            lat: parseFloat(dbRec.lat),
            lng: parseFloat(dbRec.lng),
            zIndex: parseInt(dbRec.zIndex)
        }
        console.log(newRestroom);
        // ToDo:
        // create funciton to add to array of restrooms
        addNewMarker(map, newRestroom);
    });
}