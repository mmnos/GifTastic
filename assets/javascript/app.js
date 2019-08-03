let apikey = "Z1Xz62VjjFsVsFqbCzfn158EvcqKEzQG";
let queryURL = "https://api.giphy.com/v1/gifs/search?";

let topics = [];

let $img = $("<img>");



$(document).ready(function(){


    $("#submit").on("click", function() {

        // get user inputs
        let $search = $("#search").val();
        let $rating = $("#ratings").val();
        let $limit = $("#limit").val();

        console.log($search, $rating, $limit);
       
        // build query params
        let queryParam = { 

            "api_key" : apikey,
            "q" : $search.trim(),
            // "rating" : $rating.trim(),
            // "limit" : $limit.trim()

        };

        console.log(queryParam);

        // log URL query parameters as a URL string
        let queryParamString = $.param(queryParam);
        // console.log(queryParamString);

        // console.log(queryParam);

        let completeURL = queryURL + queryParamString;
        // log query URL plus the query parameters
        console.log(completeURL);

        // make an AJAX to get data
        $.get({
            url: completeURL
        }).then(updatePage);

    });

    function updatePage(response) {
        console.log(response.data);
        console.log(response.data[0].id);

        let imgURL = response.data[0].images.fixed_height.url;

        $img.attr("src", imgURL),
        ("alt", "image")

        $("#buttonBox").append($img);

        // 'response' is the response data

        // response.data is the array of images

        // once you have the array of images, need to loop through the array and build the HMTL element then add it to the DOM
    }

});