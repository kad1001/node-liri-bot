// to read at set any envrionment vars with the dotenv package
require("dotenv").config();

// import the keys.js file and store in a var
var keys = require("./keys.js");

var axios = require('axios');
var moment = require('moment');

var fs = require('fs');
// access keys info
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var movieKey = keys.movies;

var thatid = keys.bands;

// take in command line arguments
var inputStr = process.argv;
var request = inputStr[2];
var getThis = inputStr[3];


// global functions 
function getSpotify() {
    spotify
    .search ({ type: 'track', query: getThis })
    .then(function(response) {
        // returns first item in response object
        var first = response.tracks.items[0];
        var artist = first.album.artists[0].name;
        var spotifyName = first.name;
        var preview = first.preview_url;
        var album = first.album.name;
        console.log("Artist: " + artist);
        console.log("Track name: " + spotifyName);
        console.log("Preview URL: " + preview);
        console.log("Album: " + album);
    })
    .catch(function(err) {
        console.log(err);
    });
}

function getOMDB() {
  // baseURL + params
        // get request 
        axios.get('http://www.omdbapi.com/', {
            params: {
                t: getThis,
                apikey: movieKey
            }
            })
            .then(function(response) {
                var r = response.data;
                var title = r.Title;
                var year = r.Year;
                var lang = r.Language;
                var plot = r.Plot;
                var stars = r.Actors;
                var ratings = r.Ratings;

            // ratings
                for (var x in ratings) {
                    console.log("Ratings: ", ratings[x]);
                }

                console.log("Title: "+ title);
                console.log("Year: " + year);
                console.log("Language: " + lang);
                console.log("Plot: " + plot);
                console.log("Starring: " + stars);
            })
            .catch(function (error) {
                console.log(error);
            })
}

function getShow() {

    axios.get("https://rest.bandsintown.com/artists/" + getThis + "/events", {
        params: {
           app_id: thatid
        }
    })
    
    .then(function(response) {
        // console.log(response.data);
        // Name of the venue
        console.log("Venue info: ", response.data[0].venue);
        // Venue location
        // Date of the Event (use moment to format this as "MM/DD/YYYY")
        var datetime =  response.data[0].datetime;
        var newDate = moment(datetime).format("MM/DD/YYYY");
        console.log("Concert date: ", newDate);

    })
    .catch(function (error) {
        console.log(error);
    })
}


// determines request
 switch (request) {
     case ("spotify-this-song"):
        getSpotify();
        break;

        // DON'T USE '< >' FOR TITLE
    case("movie-this"):
      getOMDB();
    break;

    // bandsintown api
    case("concert-this"):
        getShow();
    break;

    case("do-what-it-says"):
    // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        fs.readFile('random.txt', 'utf8', function(error, data){
            if (error) {
                return console.log(error);
            } else {
                var newData = data.split(",");
                request = newData[0];
                getThis = newData[1];

                if (request === 'spotify-this-song') {
                    getSpotify();
                } else if (request === 'concert-this') {
                    getShow();
                } else if (request === 'movie-this') {
                    getOMDB();
                } else {
                    console.log("Try again!");
                }
            }
        })
        // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
        // Edit the text in random.txt to test out the feature for movie-this and concert-this.

        break;
 }