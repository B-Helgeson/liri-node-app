require("dotenv").config();
require("request") //use request for IMDB API Calls

//Original
// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

//Updated
var keys = require('./keys.js'),
    // spotify = new Spotify(keys.spotify),
    // client = new Twitter(keys.twitter)

   action = process.argv[2], //the first input is the functionality/action
   value = process.argv[3] //the 2nd input is the value to be acted upon

//Swith statement for the function used based on the action variable. 
    switch (action) {
        case "my-tweets": tweets(); break;
        case "spotify-this-song": spotifyit(); break;
        case "movie-this": imdb(); break; 
        case "o-what-it-says": doit(); break;
    }

//Functionality for IMDB requests
function imdb(){

    var movieName = value;
    
    function convertName() {
        var replacedName = movieName.split(' ').join('+');
        return (replacedName)
    }
    
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + convertName() + "&y=&plot=short&apikey=trilogy";
    
    console.log(queryUrl);
    
    request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log("The movie was Released on: " + JSON.parse(body).Released);
      }
    })
}

function spotifyit() {
    console.log("spotify")
}

function tweets() {
    console.log("twitter")
}

function doit() {
    console.log("Just Do It!")
}