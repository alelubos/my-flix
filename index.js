// Imports & initializations
const express = require('express'),
  morgan = require('morgan'),
  uuid = require('uuid'),
  bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Hard-coded "in memory" array with 10 movies
let topMovies = [
  {
    title: 'The Best of Enemies',
    description:
      'Inspired by true events. Civil rights activist Ann Atwater faces off against C.P. Ellis, Exalted Cyclops of the Ku Klux Klan, in 1971 Durham, North Carolina over the issue of school integration.',
    genre: 'Drama',
    imageURL: '',
    Released: 2019,
    Rating: 7.4,
    director: 'Robin Bissel',
  },
  {
    title: 'The Name of the Rose',
    description:
      'Historical mystery film directed by Jean-Jacques Annaud, based on the 1980 novel of the same name by Umberto Eco. An intellectually non-conformist friar investigates a series of mysterious deaths in an isolated abbey.',
    genre: 'Mystery',
    imageURL: '',
    released: 1986,
    rating: 7.7,
    director: 'Jean-Jacques Annaud',
  },
  {
    title: 'The Lord of The Rings - The Fellowship of the Ring',
    description:
      "The Fellowship of the Ring is a 2001 epic fantasy adventure film directed by Peter Jackson, based on the first volume of J. R. R. Tolkien's The Lord of the Rings. The film is the first instalment in The Lord of the Rings trilogy",
    genre: 'Adventure',
    imageURL: '',
    released: 2001,
    rating: 8.8,
    director: 'Peter Jackson',
  },
  {
    title: 'Dune',
    description:
      "Epic science fiction film. A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
    genre: 'Adventure',
    imageURL: '',
    released: 2021,
    rating: 8.1,
    director: 'Denis Villeneuve',
  },
  {
    title: 'Arrival',
    description:
      'A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.',
    genre: 'Sci-Fi',
    imageURL: '',
    released: 2016,
    rating: 7.9,
    director: 'Denis Villeneuve',
  },
  {
    title: 'Edge of Tomorrow',
    description:
      'A soldier fighting aliens gets to relive the same day over and over again, the day restarting every time he dies.',
    genre: 'Sci-Fi',
    imageURL: '',
    released: 2014,
    rating: 7.9,
    director: 'Doug Liman',
  },
  {
    title: '12 Years a Slave',
    description:
      'Biographical drama based on the 1853 slave memoir "Twelve Years a Slave" by David Wilson, about a New York State-born free African-American man named Solomon Northup, who was kidnapped in Washington, D.C.',
    genre: 'Drama',
    imageURL: '',
    released: 2013,
    rating: 8.1,
    director: 'Steve McQueen',
  },
  {
    title: '300',
    description:
      'Epic historical action film in which King Leonidas of Sparta and a force of 300 men fight the Persians at Thermopylae in 480 B.C.',
    genre: 'Action',
    imageURL: '',
    released: 2006,
    rating: 7.6,
    director: 'Zack Snyder',
  },
  {
    title: 'Apocalypto',
    description:
      'As the Mayan kingdom faces its decline, a young man is taken on a perilous journey to a world ruled by fear and oppression.',
    genre: 'Action',
    genre: '',
    released: 2006,
    rating: 7.8,
    director: 'Mel Gibson',
  },
  {
    title: 'Bohemian Rapsody',
    description:
      'The story of the legendary British rock band Queen and lead singer Freddie Mercury, leading up to their famous performance at Live Aid (1985).',
    genre: 'Drama',
    imageURL: '',
    released: 2018,
    rating: 7.9,
    director: 'Bryan Singer',
  },
];

// MIDDLEWARE--------------------------------------------------------------
app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTING ENDPOINTS-------------------------------------------------------
// Welcome message at root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to myFlix API!');
});
// Retrieve list of all movies
app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get info about movie by title
app.get('/movies/:title', (req, res) => {
  Movies.findOne({ title: req.params.title })
    .then((movie) => {
      console.log(req.params.title);
      if (movie) {
        res.status(201).json(movie);
      } else {
        res.status(404).send(`Movie "${req.params.title}" was not found...`);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error: ' + error);
    });
});

// Get data about single genre by name
app.get('/genres/:name', (req, res) => {
  Movies.findOne({ 'genre.name': req.params.name })
    .then((movie) => {
      if (!movie) {
        res
          .status(404)
          .send(
            `We currently don't have any movie of "${req.params.name}" genre.`
          );
      } else {
        res.status(200).json(movie.genre);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Get data about single director by name
app.get('/directors/:name', (req, res) => {
  Movies.findOne({ 'director.name': req.params.name })
    .then((movie) => {
      if (!movie) {
        res
          .status(404)
          .send(
            `We currently don't have any movie directed by "${req.params.name}".`
          );
      } else {
        res.status(200).json(movie.director);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Register a new user
app.post('/users', (req, res) => {
  Users.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res
          .status(400)
          .send(
            `A user with the username: "${req.body.username}", already exists!`
          );
      } else {
        Users.create({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          birthday: new Date(req.body.birthday),
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// De-register user from users
app.delete('/users/:email', (req, res) => {
  Users.findOneAndDelete({ email: req.params.email })
    .then((user) => {
      if (!user) {
        res
          .status(400)
          .send(`The user with email "${req.params.email}" was not found!`);
      } else {
        res
          .status(200)
          .send(
            `The user with email "${req.params.email}" was succesfully de-registered.`
          );
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Update info from a user
app.put('/users/:username', (req, res) => {
  Users.findOneAndUpdate(
    { username: req.params.username },
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        birthday: req.body.birthday,
      },
    },
    { new: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        res
          .status(400)
          .send(
            `There's no registered user by the username "${req.params.username}".`
          );
      } else {
        res.json(updatedUser);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Add movie to a user's favorites list
app.post('/users/:username/favorites/:movieID', (req, res) => {
  Movies.findOne({ _id: req.params.movieID })
    .then((movie) => {
      if (!movie) {
        res
          .status(404)
          .send(
            `The movie with the ID "${req.params.movieID}" is not registered in the database.`
          );
      } else {
        Users.findOneAndUpdate(
          { username: req.params.username },
          { $addToSet: { favoriteMovies: req.params.movieID } },
          { new: true, fields: { username: 1, favoriteMovies: 1 } }
        )
          .then((user) => {
            if (!user) {
              res
                .status(404)
                .send(
                  `The user with username "${req.params.username}" is not registered in the database.`
                );
            } else {
              res.status(200).json(user);
            }
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
          });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Delete movie from a user's favorites list
app.delete('/users/:username/favorites/:movieID', (req, res) => {
  Users.findOneAndUpdate(
    { username: req.params.username },
    { $pull: { favoriteMovies: req.params.movieID } },
    { new: true, fields: { username: 1, favoriteMovies: 1 } }
  )
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send(
            `The user with username "${req.params.username}" is not registered in the database.`
          );
      } else {
        res.status(200).json(user);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// ERROR HANDLING-----------------------------------------------------------
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Someting went wrong!');
});

// listen for requests------------------------------------------------------
app.listen(8080, () => {
  console.log('myFlix is listening on port 8080...');
});
