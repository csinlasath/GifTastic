

/*
Create favorite section
non animated, animate when clicked
*/

$("document").ready(function() {
    var buttonsArray = ["Galaga", "Rampage", "Space Invaders", "Street Fighter", "Mortal Kombat", "Pac-man", "Donkey Kong", "Crystal Castles", "Super Mario", "Defender", "NBA Jam"];
    var currentTopic = "";
    var gifsLoaded = 0;

    function createButtons() {
        for (var i = 0; i < buttonsArray.length; i++) {
            var gifButton = $("<button type='button' class='btn btn-info game-button'></button>");
            gifButton.attr("id", buttonsArray[i]);
            gifButton.text(buttonsArray[i]);
            $("#masthead").append(gifButton);
        }
    }

    function addLoadMoreButton() {
        var loadMoreButton = $("<button type='button' class='btn btn-info load-button'></button>");
        loadMoreButton.text("More Images");
        loadMoreButton.css("width", "100%");
        $("#buttons-area").append(loadMoreButton);
    }

    function addButtons(game) {
        if (buttonsArray.indexOf(game) === -1) {
            gifsLoaded = 0;
            buttonsArray.push(game);
            var newButton = $("<button type='button' class='btn btn-info game-button user-button'></button>");
            newButton.attr("id", game);
            newButton.text(game);
            $("#masthead").append(newButton);
    
            var giphyAPIKey = "&api_key=RFgjUvZdnGSci14BZRCksEu9kKe7P8HK";
            var giphyLimit = "&limit=50";
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game +  giphyLimit + giphyAPIKey;
            currentTopic = game;
    
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                var results = response.data;
                console.log(results);
                $("#gifs-area").empty();
                function addGifs() {
                    for(var i = gifsLoaded; i < (gifsLoaded + 10); i++) {
                        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                            var resultsTitle = results[i].title.slice(0,16);
                            var gifCard = $("<div id='" + results[i].id + "-" + i + "' class='card gif-container' style='width: 225px;height: 325px;'></div>");
                            var gifImage = $(gifCard).append("<img class='card-img-top gif' style='height: 150px;' src='" + results[i].images.fixed_height_still.url + "' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='still'>");
                            var gifCardBody = $(gifCard).append("<div class='card-body'><h5 class='card-title'>" + resultsTitle.replace("GIF", "") + "</h5><p class='card-text'>Rating : " + results[i].rating.toUpperCase() + "</p><a href='" + results[i].images.fixed_height.url + "' class='btn btn-primary' style='width: 100%' download='200.gif'>Download Image</a></div>");
                            gifCardBody.append(gifImage);
                            $("#gifs-area").prepend(gifCard.css("float", "left"));
                        }
                    }
                }
                $("#buttons-area").empty();
                addGifs();
                gifsLoaded += 10;
                console.log(gifsLoaded);
                addLoadMoreButton();
                $(".gif").on("click", function() {
                    var state = $(this).attr("data-state");
            
                    if (state === "still") {
                      $(this).attr("src", $(this).attr("data-animate"));
                      $(this).attr("data-state", "animate");
                    } else {
                      $(this).attr("src", $(this).attr("data-still"));
                      $(this).attr("data-state", "still");
                    }
                  });
                $(".load-button").on("click", function() {
                    var giphyAPIKey = "&api_key=RFgjUvZdnGSci14BZRCksEu9kKe7P8HK";
                    var giphyLimit = "&limit=50";
                    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentTopic + giphyLimit +  giphyAPIKey;
            
                    console.log(currentTopic);
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then(function(response) {
                        var results = response.data;
                        console.log(results);
                            for(var i = gifsLoaded; i < (gifsLoaded + 10); i++) {
                                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                                    var resultsTitle = results[i].title.slice(0,16);
                                    var gifCard = $("<div id='" + results[i].id + "-" + i + "' class='card gif-container' style='width: 225px;height: 325px;'></div>");
                                    var gifImage = $(gifCard).append("<img class='card-img-top gif' style='height: 150px;' src='" + results[i].images.fixed_height_still.url + "' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='still'>");
                                    var gifCardBody = $(gifCard).append("<div class='card-body'><h5 class='card-title'>" + resultsTitle.replace("GIF", "") + "</h5><p class='card-text'>Rating : " + results[i].rating.toUpperCase() + "</p><a href='" + results[i].images.fixed_height.url + "' class='btn btn-primary' style='width: 100%' download='200.gif'>Download Image</a></div>");
                                    gifCardBody.append(gifImage);
                                    $("#gifs-area").append(gifCard.css("float", "left"));
                                }
                            }
                            gifsLoaded += 10;
                            if (gifsLoaded >= 50) {
                                gifsLoaded = 49;
                                $(".load-button").remove();
                            }
                            console.log(gifsLoaded);
                            $(".gif").on("click", function() {
                                var state = $(this).attr("data-state");
                        
                                if (state === "still") {
                                  $(this).attr("src", $(this).attr("data-animate"));
                                  $(this).attr("data-state", "animate");
                                } else {
                                  $(this).attr("src", $(this).attr("data-still"));
                                  $(this).attr("data-state", "still");
                                }
                              });                          
                    })
                });
            });
        }
        else {
            gifsLoaded = 0;
            var giphyAPIKey = "&api_key=RFgjUvZdnGSci14BZRCksEu9kKe7P8HK";
            var giphyLimit = "&limit=50";
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + giphyLimit + giphyAPIKey;
            currentTopic = game;
    
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                var results = response.data;
                console.log(results);
                $("#gifs-area").empty();
                function addGifs() {
                    for(var i = gifsLoaded; i < (gifsLoaded + 10); i++) {
                        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                            var resultsTitle = results[i].title.slice(0,16);
                            var gifCard = $("<div id='" + results[i].id + "-" + i + "' class='card gif-container' style='width: 225px;height: 325px;'></div>");
                            var gifImage = $(gifCard).append("<img class='card-img-top gif' style='height: 150px;' src='" + results[i].images.fixed_height_still.url + "' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='still'>");
                            var gifCardBody = $(gifCard).append("<div class='card-body'><h5 class='card-title'>" + resultsTitle.replace("GIF", "") + "</h5><p class='card-text'>Rating : " + results[i].rating.toUpperCase() + "</p><a href='" + results[i].images.fixed_height.url + "' class='btn btn-primary' style='width: 100%' download='200.gif'>Download Image</a></div>");
                            gifCardBody.append(gifImage);
                            $("#gifs-area").prepend(gifCard.css("float", "left"));
                        }
                    }
                }
                $("#buttons-area").empty();
                addGifs();
                gifsLoaded += 10;
                console.log(gifsLoaded);
                addLoadMoreButton();
                $(".gif").on("click", function() {
                    var state = $(this).attr("data-state");
            
                    if (state === "still") {
                      $(this).attr("src", $(this).attr("data-animate"));
                      $(this).attr("data-state", "animate");
                    } else {
                      $(this).attr("src", $(this).attr("data-still"));
                      $(this).attr("data-state", "still");
                    }
                  });
                $(".load-button").on("click", function() {
                    var giphyAPIKey = "&api_key=RFgjUvZdnGSci14BZRCksEu9kKe7P8HK";
                    var giphyLimit = "&limit=50";
                    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentTopic + giphyLimit +  giphyAPIKey;
            
                    console.log(currentTopic);
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then(function(response) {
                        var results = response.data;
                        console.log(results);
                            for(var i = gifsLoaded; i < (gifsLoaded + 10); i++) {
                                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                                    var resultsTitle = results[i].title.slice(0,16);
                                    var gifCard = $("<div id='" + results[i].id + "-" + i + "' class='card gif-container' style='width: 225px;height: 325px;'></div>");
                                    var gifImage = $(gifCard).append("<img class='card-img-top gif' style='height: 150px;' src='" + results[i].images.fixed_height_still.url + "' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='still'>");
                                    var gifCardBody = $(gifCard).append("<div class='card-body'><h5 class='card-title'>" + resultsTitle.replace("GIF", "") + "</h5><p class='card-text'>Rating : " + results[i].rating.toUpperCase() + "</p><a href='" + results[i].images.fixed_height.url + "' class='btn btn-primary' style='width: 100%' download='200.gif'>Download Image</a></div>");
                                    gifCardBody.append(gifImage);
                                    $("#gifs-area").append(gifCard.css("float", "left"));
                                }
                            }
                            gifsLoaded += 10;
                            if (gifsLoaded >= 50) {
                                gifsLoaded = 49;
                                $(".load-button").remove();
                            }
                            console.log(gifsLoaded);
                            $(".gif").on("click", function() {
                                var state = $(this).attr("data-state");
                        
                                if (state === "still") {
                                  $(this).attr("src", $(this).attr("data-animate"));
                                  $(this).attr("data-state", "animate");
                                } else {
                                  $(this).attr("src", $(this).attr("data-still"));
                                  $(this).attr("data-state", "still");
                                }
                              });
                    })
                });
            });
        }
    }
    createButtons();

    $(".game-button").on("click", function() {
        gifsLoaded = 0;
        var giphyAPIKey = "&api_key=RFgjUvZdnGSci14BZRCksEu9kKe7P8HK";
        var giphyLimit = "&limit=50";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("id") + giphyLimit +  giphyAPIKey;
        currentTopic = $(this).attr("id");
        console.log(currentTopic);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            var results = response.data;
            console.log(results);
            $("#gifs-area").empty();
            function addGifs() {
                for(var i = gifsLoaded; i < (gifsLoaded + 10); i++) {
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        var resultsTitle = results[i].title.slice(0,16);
                        var gifCard = $("<div id='" + results[i].id + "-" + i + "' class='card gif-container' style='width: 225px;height: 325px;'></div>");
                        var gifImage = $(gifCard).append("<img class='card-img-top gif' style='height: 150px;' src='" + results[i].images.fixed_height_still.url + "' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='still'>");
                        var gifCardBody = $(gifCard).append("<div class='card-body'><h5 class='card-title'>" + resultsTitle.replace("GIF", "") + "</h5><p class='card-text'>Rating : " + results[i].rating.toUpperCase() + "</p><a href='" + results[i].images.fixed_height.url + "' class='btn btn-primary' style='width: 100%' download='200.gif'>Download Image</a></div>");
                        gifCardBody.append(gifImage);
                        $("#gifs-area").prepend(gifCard.css("float", "left"));
                    }
                }
            }     
            $("#buttons-area").empty();
            addGifs();
            gifsLoaded += 10;
            if (gifsLoaded >= 50) {
                gifsLoaded = 49;
                $(".load-button").remove();
            }
            console.log(gifsLoaded);
            addLoadMoreButton();
            $(".gif").on("click", function() {
                var state = $(this).attr("data-state");
        
                if (state === "still") {
                  $(this).attr("src", $(this).attr("data-animate"));
                  $(this).attr("data-state", "animate");
                } else {
                  $(this).attr("src", $(this).attr("data-still"));
                  $(this).attr("data-state", "still");
                }
              });
            $(".load-button").on("click", function() {
                var giphyAPIKey = "&api_key=RFgjUvZdnGSci14BZRCksEu9kKe7P8HK";
                var giphyLimit = "&limit=50";
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentTopic +  giphyLimit + giphyAPIKey;
        
                console.log(currentTopic);
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response) {
                    var results = response.data;
                    console.log(results);
                        for(var i = gifsLoaded; i < (gifsLoaded + 10); i++) {
                            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                                var resultsTitle = results[i].title.slice(0,16);
                                var gifCard = $("<div id='" + results[i].id + "-" + i + "' class='card gif-container' style='width: 225px;height: 325px;'></div>");
                                var gifImage = $(gifCard).append("<img class='card-img-top gif' style='height: 150px;' src='" + results[i].images.fixed_height_still.url + "' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='still'>");
                                var gifCardBody = $(gifCard).append("<div class='card-body'><h5 class='card-title'>" + resultsTitle.replace("GIF", "") + "</h5><p class='card-text'>Rating : " + results[i].rating.toUpperCase() + "</p><a href='" + results[i].images.fixed_height.url + "' class='btn btn-primary' style='width: 100%' download='200.gif'>Download Image</a></div>");
                                gifCardBody.append(gifImage);
                                $("#gifs-area").append(gifCard.css("float", "left"));
                            }
                        }
                        gifsLoaded += 10;
                        if (gifsLoaded >= 50) {
                            gifsLoaded = 49;
                            $(".load-button").remove();
                        }
                        console.log(gifsLoaded);
                        $(".gif").on("click", function() {
                            var state = $(this).attr("data-state");
                    
                            if (state === "still") {
                              $(this).attr("src", $(this).attr("data-animate"));
                              $(this).attr("data-state", "animate");
                            } else {
                              $(this).attr("src", $(this).attr("data-still"));
                              $(this).attr("data-state", "still");
                            }
                          });
                })
            });
            $(".user-button").on("click", function() {
                gifsLoaded = 0;
                var giphyAPIKey = "&api_key=RFgjUvZdnGSci14BZRCksEu9kKe7P8HK";
                var giphyLimit = "&limit=50";
                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("id") + giphyLimit +  giphyAPIKey;
                currentTopic = $(this).attr("id");
                console.log(currentTopic);
        
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response) {
                    var results = response.data;
                    console.log(results);
                    $("#gifs-area").empty();
                    function addGifs() {
                        for(var i = gifsLoaded; i < (gifsLoaded + 10); i++) {
                            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                                var resultsTitle = results[i].title.slice(0,16);
                                var gifCard = $("<div id='" + results[i].id + "-" + i + "' class='card gif-container' style='width: 225px;height: 325px;'></div>");
                                var gifImage = $(gifCard).append("<img class='card-img-top gif' style='height: 150px;' src='" + results[i].images.fixed_height_still.url + "' data-still='" + results[i].images.fixed_height_still.url + "' data-animate='" + results[i].images.fixed_height.url + "' data-state='still'>");
                                var gifCardBody = $(gifCard).append("<div class='card-body'><h5 class='card-title'>" + resultsTitle.replace("GIF", "") + "</h5><p class='card-text'>Rating : " + results[i].rating.toUpperCase() + "</p><a href='" + results[i].images.fixed_height.url + "' class='btn btn-primary' style='width: 100%' download='200.gif'>Download Image</a></div>");
                                gifCardBody.append(gifImage);
                                $("#gifs-area").prepend(gifCard.css("float", "left"));
                            }
                        }
                    }
                    $("#buttons-area").empty();
                    addGifs();
                    gifsLoaded += 10;
                    if (gifsLoaded >= 50) {
                        gifsLoaded = 49;
                        $(".load-button").remove();
                    }
                    console.log(gifsLoaded);
                    addLoadMoreButton();
                    $(".gif").on("click", function() {
                        var state = $(this).attr("data-state");
                
                        if (state === "still") {
                          $(this).attr("src", $(this).attr("data-animate"));
                          $(this).attr("data-state", "animate");
                        } else {
                          $(this).attr("src", $(this).attr("data-still"));
                          $(this).attr("data-state", "still");
                        }
                      });
                })
            });
        })
    });
  
    $("#submit-game").on("click", function(event) {
        event.preventDefault();
        addButtons($("#game-text-field").val());
    });
});
