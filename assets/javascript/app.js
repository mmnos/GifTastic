const apikey = "Z1Xz62VjjFsVsFqbCzfn158EvcqKEzQG";
const queryURL = "https://api.giphy.com/v1/gifs/search?";

// original array of topics
let topics = ["Iron Man", "Captain America", "Hulk", "Thor", "Elon Musk"];

// variable to hold user input
let $search = $("#search").val();

// once page loads, all javascript will run
$(document).ready(function() {

    function displayButtons() {

        // empties the div at the start to prevent duplicates
        $("#buttonBox").empty();

        // loops through the topics array and displays buttons for each topic
        for (let i = 0; i < topics.length; i++) {

            let $button = $("<button>")
                    .addClass("btn btn-design topic mr-3")
                    .attr("data-name", topics[i])
                    .text(topics[i]);
            
            $("#buttonBox").append($button);

        }

    }

    // gets necessary information to build the complete url
    // which than displays the topic on the page by calling the updatePage function
    function displayTopic() {

        // build query params
        let queryParam = { 

            "api_key" : apikey,
            "q" : $(this).attr("data-name"),
            "limit" : 10

        };

        // turns the object of query params into a string for the url
        let queryParamString = $.param(queryParam);

        // holds the complete url
        let completeURL = queryURL + queryParamString;

        // make an AJAX request to get data
        $.get({
            url: completeURL
        }).then(updatePage);

    };

    // this gets called once the ajax request in done and it displays
    // the images/ratings associated with the button
    function updatePage(response) {

        $("#gifBox").empty();

        console.log(response.data);

        for (j = 0; j <= 10; j++) {

        let imgURLStill = response.data[j].images.fixed_height_still.url;
        let imgURLGif = response.data[j].images.fixed_height.url;
        let $img = $("<img>").addClass("changeState mb-3");
        let $p = $("<p>");
        let $p2 = $("<p>");

        $img.attr("src", imgURLStill)
        .attr("data-still", imgURLStill)
        .attr("data-animate", imgURLGif)
        .attr("data-state", "still")
        .attr("alt", "image")

        $("#gifBox").append($img);
        $("#gifBox").append($p2.text((response.data[j].title)));
        $("#gifBox").append($p.text("Rating : " + (response.data[j].rating).toUpperCase()));

        }

    }

    // click event for submit button
    // it adds the users search to the array and displays the new button
    $("#submit").on("click", function() {

        event.preventDefault();
        
        // gets user input
        $search = $("#search").val();
        
        // pushed the users search to the array of topics
        topics.push($search);
        
        // calls function to display the new button
        displayButtons();
        
        $("#search").val('');

    });

    // if enter key is pressed, function runs
    $(document).on('keypress',function(e) {

        if (e.which == 13) {

        event.preventDefault();

        // gets user input
        $search = $("#search").val();

        // pushed the users search to the array of topics
        topics.push($search);

        // calls function to display the new button
        displayButtons();

        $("#search").val('');

        }

    });

    // whenever a button is clicked, it'll display the image/rating
    $(document).on("click", ".topic", displayTopic);

    // on click event to change the image state, still/animated
    $(document).on("click", ".changeState", function() {

        let state = $(this).attr(`data-state`);

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });

    // displays the original buttons from the array once the page is loaded
    displayButtons();

});