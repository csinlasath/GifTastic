

/*
Add 10 Gifs per page
Create favorite section
create topic section
additional meta tags
responsive
one click download

under every gif, show rating

loop and append buttons
non animated, animate when clicked

add a form for user input and add to array for topics

*/

$("document").ready(function() {
    var buttonsArray = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish"];
    var favoriteGifs = [];
    var gifTopics = [];

    function createButtons() {
        for (var i = 0; i < buttonsArray.length; i++) {
            var gifButton = $("<button type='button' class='btn btn-info animal-button'></button>");
            gifButton.attr("id", buttonsArray[i]);
            gifButton.text(buttonsArray[i]);
            $("#masthead").append(gifButton);
        }
    }

    function addButtons(animal) {
        var newButton = $("<button type='button' class='btn btn-info animal-button'></button>");
        newButton.attr("id", animal);
        newButton.text(animal);
        $("#masthead").append(newButton);
    }



    function createGifs() {
        
    }

    createButtons();

    $(".animal-button").on("click", function() {
        var giphyAPIKey = "&api_key=RFgjUvZdnGSci14BZRCksEu9kKe7P8HK&limit=10";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("id") + giphyAPIKey;
        var newURL = "";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            console.log(results);
            $("#gifs-area").empty();
            for(var i = 0; i < 10; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifCard = $("<div class='card' style='width: 225px;height: 300px;'></div>");
                    var gifImage = $(gifCard).append("<img class='card-img-top' style='height: 150px;' src='" + results[i].images.fixed_height.url + "'>");
                    var gifCardBody = $(gifCard).append("<div class='card-body'><h5 class='card-title'>" + results[i].title.replace("GIF", "") + "</h5><p class='card-text'>Rating : " + results[i].rating.toUpperCase() + "</p><a href='" + results[i].images.fixed_height.url + "' class='btn btn-primary' download>Download Image</a></div>");
                    gifCardBody.append(gifImage);
                    $("#gifs-area").prepend(gifCard.css("float", "left"));
                }
            }
        })
    });

    $("#submit-animal").on("click", function() {
        addButtons($("#animal-text-field").val());

    });

});

