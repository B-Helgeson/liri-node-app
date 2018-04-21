// environment config
require("dotenv").config();

// additional requirements
const   Twitter = require('twitter'),
        Spotify = require('node-spotify-api'),
        request = require('request'),
        fs = require('fs')

// API Keys 
const   keys = require('./keys.js'),
        spotify = new Spotify(keys.spotify),
        client = new Twitter(keys.twitter)

// User Inputs
const   action = process.argv[2], //the first input is the functionality/action
        value = process.argv[3] //the 2nd input is the value to be acted upon

//Swith statement for the function used based on the action variable. 
    switch (action) {
        case "my-tweets": tweets(); break;
        case "spotify-this-song": spotifyit(value); break;
        case "movie-this": imdb(value); break; 
        case "o-what-it-says": doit(); break;
        default: // if a valid argument isn't passed
            console.log("Please enter a valid request (see README)")
    }

// Functionality for IMDB requests
function imdb(value){
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

// Functionality for Spotify requests
function spotifyit(value) {
    spotify.search({ type: 'track', query: value, limit: 1 },
        function (error, data) {
            if (!error) {
                let track = data.tracks.items[0]
                if (!track) {
                    console.log('Could not find song')
                } else {
                    console.log(
                        track.name,
                        track.artists.map(artist => artist.name).join(', '),
                        track.album.name,
                        track.external_urls.preview_url || ('No preview available. Full track URL: ' + track.external_urls.spotify)
                    )
                }
            } else {
                console.log('Error occurred: ' + error)
            }
        }
    )
}

// Functionality for Get Twitter Tweets
function tweets() {
    console.log("twitter")
}

// Functionality to run the random.txt file
function doit() {
    console.log("Just Do It!")
}