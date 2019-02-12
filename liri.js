// to read at set any envrionment vars with the dotenv package
require("dotenv").config();

// import the keys.js file and store in a var
var keys = require("./keys.js");

// access keys info
var spotify = new spotify(keys.spotify);

console.log(this);