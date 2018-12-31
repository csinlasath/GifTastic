

/*
Create favorite section
non animated, animate when clicked
*/

$("document").ready(function() {
    var buttonsArray = ["Galaga", "Rampage", "Space Invaders", "Street Fighter", "Mortal Kombat", "Pac-man", "Donkey Kong", "Crystal Castles", "Super Mario", "Defender", "NBA Jam"];
    var currentTopic = "";

    function createButtons() {
        for (var i = 0; i < buttonsArray.length; i++) {
            var gifButton = $("<button type='button' class='btn btn-info game-button'></button>");
            gifButton.attr("id", buttonsArray[i]);
            gifButton.text(buttonsArray[i]);
            $("#masthead").append(gifButton);
        }
    }

    function loadMoreGifs() {
        $("#load-more-button").on("click", function() {
            var giphyAPIKey = "&api_key=RFgjUvZdnGSci14BZRCksEu9kKe7P8HK";
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentTopic + giphyAPIKey;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                var results = response.data;
                function addGifs() {
                    for(var i = 0; i < 10; i++) {
                        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                            var gifCard = $("<div class='card' style='width: 225px;height: 350px;'></div>");
                            var gifImage = $(gifCard).append("<img class='card-img-top' style='height: 150px;' src='" + results[i].images.fixed_height.url + "'>");
                            var gifCardBody = $(gifCard).append("<div class='card-body'><h5 class='card-title'>" + results[i].title.replace("GIF", "") + "</h5><p class='card-text'>Rating : " + results[i].rating.toUpperCase() + "</p><a href='" + results[i].images.fixed_height.url + "' class='btn btn-primary' style='width: 100%' download>Download Image</a><a class='btn btn-success favorite-gif' style='width: 100%'>Favorite This</a></div>");
                            gifCardBody.append(gifImage);
                            $("#gifs-area").append(gifCard.css("float", "left"));
                        }
                    }
                }
                $("#buttons-area").empty();
                addGifs();
            })
        });
    }

    function addLoadMoreButton() {
        var loadMoreButton = $("<button type='button' class='btn btn-info load-button'></button>");
        loadMoreButton.text("More Images");
        loadMoreButton.css("width", "100%");
        $("#buttons-area").append(loadMoreButton);
    }

    function addButtons(game) {
        if (buttonsArray.indexOf(game) === -1) {
            buttonsArray.push(game);
            var newButton = $("<button type='button' class='btn btn-info game-button user-button'></button>");
            newButton.attr("id", game);
            newButton.text(game);
            $("#masthead").append(newButton);
    
            var giphyAPIKey = "&api_key=RFgjUvZdnGSci14BZRCksEu9kKe7P8HK";
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + giphyAPIKey;
            currentTopic = game;
    
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                var results = response.data;
                $("#gifs-area").empty();
                function addGifs() {
                    for(var i = 0; i < 10; i++) {
                        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                            var resultsTitle = results[i].title.slice(0,16);
                            var gifCard = $("<div class='card' style='width: 225px;height: 350px;'></div>");
                            var gifImage = $(gifCard).append("<img class='card-img-top' style='height: 150px;' src='" + results[i].images.fixed_height.url + "'>");
                            var gifCardBody = $(gifCard).append("<div class='card-body'><h5 class='card-title'>" + resultsTitle.replace("GIF", "") + "</h5><p class='card-text'>Rating : " + results[i].rating.toUpperCase() + "</p><a href='" + results[i].images.fixed_height.url + "' class='btn btn-primary' style='width: 100%' download>Download Image</a><a class='btn btn-success favorite-gif' style='width: 100%'>Favorite This</a></div>");
                            gifCardBody.append(gifImage);
                            $("#gifs-area").prepend(gifCard.css("float", "left"));
                        }
                    }
                }
                $("#buttons-area").empty();
                addGifs();
                addLoadMoreButton();
                $(".load-button").on("click", function() {
                    var giphyAPIKey = "&api_key=RFgjUvZdnGSci14BZRCksEu9kKe7P8HK";
                    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentTopic + giphyAPIKey;
            
                    console.log(currentTopic);
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then(function(response) {
                        var results = response.data;
                            for(var i = 0; i < 10; i++) {
                                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                                    var resultsTitle = results[i].title.slice(0,16);
                                    var gifCard = $("<div class='card' style='width: 225px;height: 350px;'></div>");
                                    var gifImage = $(gifCard).append("<img class='card-img-top' style='height: 150px;' src='" + results[i].images.fixed_height.url + "'>");
                                    var gifCardBody = $(gifCard).append("<div class='card-body'><h5 class='card-title'>" + resultsTitle.replace("GIF", "") + "</h5><p class='card-text'>Rating : " + results[i].rating.toUpperCase() + "</p><a href='" + results[i].images.fixed_height.url + "' class='btn btn-primary'  style='width: 100%' download>Download Image</a><a class='btn btn-success favorite-gif' style='width: 100%'>Favorite This</a></div>");
                                    gifCardBody.append(gifImage);
                                    $("#gifs-area").append(gifCard.css("float", "left"));
                                }
                            }   
                    })
                });
            });
        }
        else {
            var giphyAPIKey = "&api_key=RFgjUvZdnGSci14BZRCksEu9kKe7P8HK";
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + giphyAPIKey;
            currentTopic = game;
    
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                var results = response.data;
                $("#gifs-area").empty();
                function addGifs() {
                    for(var i = 0; i < 10; i++) {
                        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                            var resultsTitle = results[i].title.slice(0,16);
                            var gifCard = $("<div class='card' style='width: 225px;height: 350px;'></div>");
                            var gifImage = $(gifCard).append("<img class='card-img-top' style='height: 150px;' src='" + results[i].images.fixed_height.url + "'>");
                            var gifCardBody = $(gifCard).append("<div class='card-body'><h5 class='card-title'>" + resultsTitle.replace("GIF", "") + "</h5><p class='card-text'>Rating : " + results[i].rating.toUpperCase() + "</p><a href='" + results[i].images.fixed_height.url + "' class='btn btn-primary'  style='width: 100%' download>Download Image</a><a class='btn btn-success favorite-gif' style='width: 100%'>Favorite This</a></div>");
                            gifCardBody.append(gifImage);
                            $("#gifs-area").prepend(gifCard.css("float", "left"));
                        }
                    }
                }
                $("#buttons-area").empty();
                addGifs();
                addLoadMoreButton();
                $(".load-button").on("click", function() {
                    var giphyAPIKey = "&api_key=RFgjUvZdnGSci14BZRCksEu9kKe7P8HK";
                    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentTopic + giphyAPIKey;
            
                    console.log(currentTopic);
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then(function(response) {
                        var results = response.data;
                            for(var i = 0; i < 10; i++) {
                                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                                    var resultsTitle = results[i].title.slice(0,16);
                                    var gifCard = $("<div class='card' style='width: 225px;height: 350px;'></div>");
                                    var gifImage = $(gifCard).append("<img class='card-img-top' style='height: 150px;' src='" + results[i].images.fixed_height.url + "'>");
                                    var gifCardBody = $(gifCard).append("<div class='card-body'><h5 class='card-title'>" + resultsTitle.replace("GIF", "") + "</h5><p class='card-text'>Rating : " + results[i].rating.toUpperCase() + "</p><a href='" + results[i].images.fixed_height.url + "' class='btn btn-primary'  style='width: 100%' download>Download Image</a><a class='btn btn-success favorite-gif' style='width: 100%'>Favorite This</a></div>");
                                    gifCardBody.append(gifImage);
                                    $("#gifs-area").append(gifCard.css("float", "left"));
                                }
                            }   
                    })
                });
            });
        }
    }
    createButtons();

    $(".game-button").on("click", function() {
        var giphyAPIKey = "&api_key=RFgjUvZdnGSci14BZRCksEu9kKe7P8HK";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("id") + giphyAPIKey;
        currentTopic = $(this).attr("id");
        console.log(currentTopic);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            $("#gifs-area").empty();
            function addGifs() {
                for(var i = 0; i < 10; i++) {
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        var resultsTitle = results[i].title.slice(0,16);
                        var gifCard = $("<div class='card' style='width: 225px;height: 350px;'></div>");
                        var gifImage = $(gifCard).append("<img class='card-img-top' style='height: 150px;' src='" + results[i].images.fixed_height.url + "'>");
                        var gifCardBody = $(gifCard).append("<div class='card-body'><h5 class='card-title'>" + resultsTitle.replace("GIF", "") + "</h5><p class='card-text'>Rating : " + results[i].rating.toUpperCase() + "</p><a href='" + results[i].images.fixed_height.url + "' class='btn btn-primary'  style='width: 100%' download>Download Image</a><a class='btn btn-success favorite-gif' style='width: 100%'>Favorite This</a></div>");
                        gifCardBody.append(gifImage);
                        $("#gifs-area").prepend(gifCard.css("float", "left"));
                    }
                }
            }     
            $("#buttons-area").empty();
            addGifs();
            addLoadMoreButton();
            $(".load-button").on("click", function() {
                var giphyAPIKey = "&api_key=RFgjUvZdnGSci14BZRCksEu9kKe7P8HK";
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentTopic + giphyAPIKey;
        
                console.log(currentTopic);
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response) {
                    var results = response.data;
                        for(var i = 0; i < 10; i++) {
                            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                                var resultsTitle = results[i].title.slice(0,16);
                                var gifCard = $("<div class='card' style='width: 225px;height: 350px;'></div>");
                                var gifImage = $(gifCard).append("<img class='card-img-top' style='height: 150px;' src='" + results[i].images.fixed_height.url + "'>");
                                var gifCardBody = $(gifCard).append("<div class='card-body'><h5 class='card-title'>" + resultsTitle.replace("GIF", "") + "</h5><p class='card-text'>Rating : " + results[i].rating.toUpperCase() + "</p><a href='" + results[i].images.fixed_height.url + "' class='btn btn-primary'  style='width: 100%' download>Download Image</a><a class='btn btn-success favorite-gif' style='width: 100%'>Favorite This</a></div>");
                                gifCardBody.append(gifImage);
                                $("#gifs-area").append(gifCard.css("float", "left"));
                            }
                        }   
                })
            });
            $(".user-button").on("click", function() {
                var giphyAPIKey = "&api_key=RFgjUvZdnGSci14BZRCksEu9kKe7P8HK";
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("id") + giphyAPIKey;
                currentTopic = $(this).attr("id");
                console.log(currentTopic);
        
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response) {
                    var results = response.data;
                    $("#gifs-area").empty();
                    function addGifs() {
                        for(var i = 0; i < 10; i++) {
                            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                                var resultsTitle = results[i].title.slice(0,16);
                                var gifCard = $("<div class='card' style='width: 225px;height: 350px;'></div>");
                                var gifImage = $(gifCard).append("<img class='card-img-top' style='height: 150px;' src='" + results[i].images.fixed_height.url + "'>");
                                var gifCardBody = $(gifCard).append("<div class='card-body'><h5 class='card-title'>" + resultsTitle.replace("GIF", "") + "</h5><p class='card-text'>Rating : " + results[i].rating.toUpperCase() + "</p><a href='" + results[i].images.fixed_height.url + "' class='btn btn-primary' style='width: 100%' download>Download Image</a><a class='btn btn-success favorite-gif' style='width: 100%'>Favorite This</a></div>");
                                gifCardBody.append(gifImage);
                                $("#gifs-area").prepend(gifCard.css("float", "left"));
                            }
                        }
                    }
                    $("#buttons-area").empty();
                    addGifs();
                    addLoadMoreButton();
                })
            });
        })
    });

    $("#submit-game").on("click", function(event) {
        event.preventDefault();
        addButtons($("#game-text-field").val());
    });
});

