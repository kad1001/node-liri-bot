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


// SPOTIFY
function getSpotify() {
    spotify
        .search({
            type: 'track',
            query: getThis
        })

        .then(function (response) {

            // returns first item in response object
            var f = response.tracks.items[0];
            var artist = f.album.artists[0].name;
            var spotifyName = f.name;
            var album = f.album.name;

            // some songs don't like this
            var preview = f.preview_url;


            console.log("Artist: " + artist);
            console.log("Track name: " + spotifyName);
            console.log("Preview URL: " + preview);
            console.log("Album: " + album);

        })
        .catch(function (err) {
            console.log(err);
        });
};


// OMDB
function getOMDB() {

    // get request 
    axios.get('http://www.omdbapi.com/', {
            params: {
                t: getThis,
                apikey: movieKey
            }
        })
        .then(function (response) {
 
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

            console.log("Title: " + title);
            console.log("Year: " + year);
            console.log("Language: " + lang);
            console.log("Plot: " + plot);
            console.log("Starring: " + stars);
        })
        .catch(function (error) {
            console.log(error);
        })
};


// BANDSINTOWN
function getShow() {

    axios.get("https://rest.bandsintown.com/artists/" + getThis + "/events", {
            params: {
                app_id: thatid
            }
        })

        .then(function(response) {

            console.log(response.data[0]);

            console.log("Venue info: ", response.data[0].venue);
            var datetime = response.data[0].datetime;
            var newDate = moment(datetime).format("MM/DD/YYYY");
            console.log("Concert date: ", newDate);

        })
        .catch(function (error) {
            console.log(error);
        })
};


// determines request
switch (request) {
    //  SPOTIFY
    case ("spotify-this-song"):
        getSpotify();
        break;

        // OMDB
    case ("movie-this"):
        getOMDB();
        break;

        // BANDSINTOWN
    case ("concert-this"):
        getShow();
        break;


        // WILDCARD
    case ("do-what-it-says"):

        // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
        fs.readFile('random.txt', 'utf8', function (error, data) {

            if (error) {
                return console.log(error);
            } else {

                // split up the data in random.txt
                var newData = data.split(",");
                console.log(newData);

                // determine parameters
                // what to do
                request = newData[0];
                // what to look up
                getThis = newData[1];

                if (request === 'spotify-this-song') {
                    getSpotify();

                } 
                else if (request === 'concert-this') {
                    getShow();

                } 
                else if (request === 'movie-this') {
                    getOMDB();
                } 
                else {
                    console.log("Try again!");
                }
            }
        })
        break;
};