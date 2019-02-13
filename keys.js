// console.log('keys.js is loaded');
console.log('COMMANDS:');
console.log('concert-this');
console.log('movie-this');
console.log('do-what-it-says');
console.log('spotify-this-song');


// to pass into liri.js  -----
// access keys in .env
exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  };
  
  // OMDb key
exports.movies = process.env.OMDB;

exports.bands = process.env.band_id;