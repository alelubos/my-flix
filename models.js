const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
