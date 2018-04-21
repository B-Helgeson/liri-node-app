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

// My Twitter Username
var userName = {screen_name: "Helgesh"};

// User Inputs
var     action = process.argv[2], //the first input is the functionality/action
        value = process.argv[3] //the 2nd input is the value to be acted upon

//Swith statement for the function used based on the action variable. 
function runIniti() {
    switch (action) {
        case "my-tweets": tweets(); break;
        case "spotify-this-song": spotifyit(value); break;
        case "movie-this": imdb(value); break; 
        case "do-what-it-says": doit(); break;
        default: // if a valid argument isn't passed
            console.log("Please enter a valid request (see README)")
    }
}

// Initial run of the program
runIniti();

function imdb(value){
    var movieName = value;
    function convertName() {
        var replacedName = movieName.split(' ').join('+');
        return (replacedName)
    }
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
    client.get("statuses/user_timeline", userName, function (error, tweets, response) {
        if (!error) {
            tweets.forEach(tweet => {
                console.log("-----------")
                console.log(tweet.text)
                console.log("Tweet from: " + tweet.created_at)
            })
        } else {
            console.log('Error occurred: ' + error)
        }
    })
}

// Functionality to run the random.txt file
function doit() {
    let fileAction, fileValue
    [fileAction, fileValue] = fs.readFileSync('random.txt', 'utf8').split(',')
    action = fileAction; // sets file inputs to variables intended to store command line inputs
    value = fileValue; // sets file inputs to variables intended to store command line inputs
    runIniti();
}