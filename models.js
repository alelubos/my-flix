/**
 * Models module with Type definitions (and Mongoose schema definitions for MongoDB)
 * @module models
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * A movie Director
 * @typedef {Object} Director
 * @property {string} name - Director's name
 * @property {string} bio - A short bio of the Director
 * @property {string} birthYear - Year of birth of the Director
 * @property {string} [deathYear] - Year of death of the Director
 */

/**
 * A movie Genre
 * @typedef {{ name: string, description: string }} Genre
 * @property {string} name - Genre name
 * @property {string} description - Genre description
 */

/**
 * A Movie object
 * @typedef {Object} Movie - A movie object
 * @prop {string} _id - Movie unique identifier added automatically in the backend
 * @prop {string} title - Movie title
 * @prop {string} description - A short description of movie plot
 * @prop {Genre} genre - The Movie genre object
 * @prop {string} imageURL - The URL of the Movie Poster
 * @prop {Director} director - The Movie director object
 * @prop {string} releaseYear - Year released
 * @prop {string} rating - Rating value from imDB
 * @prop {boolean} featured - Indicates if the movie is featured
 */

let movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: {
    name: String,
    description: String,
  },
  imageURL: String,
  director: {
    name: String,
    bio: String,
    birthYear: String,
    deathYear: { type: String, default: '' },
  },
  releaseYear: Number,
  rating: Number,
  featured: Boolean,
});

/**
 * A User object
 * @typedef {Object} User
 * @prop {string} username - Unique user identifier
 * @prop {string} password - Password credential to Login
 * @prop {string} email - User's Email
 * @prop {date} birthday - User's birthday
 * @prop {Array<Movie._id>} favoriteMovies - List of User's favorites Movies
 */

let userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  birthday: Date,
  favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

userSchema.statics.hashSync = (plainPassword) => {
  // Synchronous version of hash() with 10 saltRounds. To better
  // secure important resources, use at least 12 saltRounds (~250ms)
  return bcrypt.hashSync(plainPassword, 10);
};

userSchema.methods.validatePassword = (plainPassword, hashedPassword) => {
  // Synchronous version of compare() -switch to async version for high volume of requests-
  // Used Arrow function (no need to accessing instance through "this")
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
