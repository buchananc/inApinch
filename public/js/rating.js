//This is not working yet (not creating json obj)...

$(document).ready(function () {
    //restroomId, username, rating, comments

    $(function () {
        //Star rating function
        $("#rateYo").rateYo({
            onSet: function (rating, rateYoInstance) {
                //gets user rating
                rating = Math.ceil(rating);
                $('#rating_input').val(rating); //setting up rating value to hidden field
                // alert("Rating is set to: " + rating);
                console.log("User rating: " + rating);
            }
        });

        $("#updateRatingBtn").on("click", function (event) {
            //Get user comment
            var comment = $("#commentBox").val();
            console.log("User comment: " + comment);
        });
    });
});