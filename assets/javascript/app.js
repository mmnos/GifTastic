let apikey = "Z1Xz62VjjFsVsFqbCzfn158EvcqKEzQG";
let queryURL = "https://api.giphy.com/v1/gifs/search?";

let topics = ["mango", "orange", "grape"];

let $img = $("<img>");
let $search = $("#search").val();

$(document).ready(function() {

    function displayButtons() {

        // empties the div at the start to prevent duplicates
        $("#buttonBox").empty();

        // loops through the topics array and displays buttons for each topic
        for (let i = 0; i < topics.length; i++) {

            let $button = $("<button>");
             
            $button.addClass("btn btn-primary topic");
            
            $button.attr("data-name", topics[i]);
             
            $button.text(topics[i]);
            
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
            // "rating" : $rating.trim(),
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

        let imgURL = response.data[j].images.fixed_height.url;

        let $p = $("<p>");

        $img.attr("src", imgURL),
        ("alt", "image")

        $("#gifBox").append($img);
        $("#gifBox").append($p.text(response.data[j].rating));

        }

    }

    // click event for submit button
    // it adds the users search to the array and displays the new button
    $("#submit").on("click", function() {

        event.preventDefault();

        // get user inputs
        $search = $("#search").val();

        // pushed the users search to the array of topics
        topics.push($search);

        // calls function to display the new button
        displayButtons();

    });

    // whenever a button is clicked, it'll display the image/rating
    $(document).on("click", ".topic", displayTopic);

    // displays the original buttons from the array once the page is loaded
    displayButtons();

});