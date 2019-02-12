// to read at set any envrionment vars with the dotenv package
require("dotenv").config();

// import the keys.js file and store in a var
var keys = require("./keys.js");

// access keys info
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

// node liri.js spotify-this-song '<song name here>'

// take in command line arguments
var inputStr = process.argv;

var request = inputStr[2];



// determines request
 switch (request) {
     case ("spotify-this-song"):

     var songName = process.argv[3];

    // If no song is provided then your program will default to 'under pressure' by queen

    // get song info
    spotify
    // search songNamesp
        .search ({ type: 'track', query: songName })
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

  
    
    break;

 }