// access keys in .env using process.env

// SPOTIFY key
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

// OMDb key
exports.movies = process.env.OMDB;

// BANDS-IN-TOWN key
exports.bands = process.env.band_id;