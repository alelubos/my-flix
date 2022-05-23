// Import modules
const express = require('express'),
  morgan = require('morgan'),
  uuid = require('uuid'),
  bodyParser = require('body-parser');

const app = express();

// Hard-coded "in memory" array with 10 movies
let topMovies = [
  {
    title: 'The Best of Enemies',
    description:
      'American drama film directed and written by Robin Bissell in his feature debut. It is based on the book The Best of Enemies: Race and Redemption in the New South by Osha Gray Davidson, which focuses on the rivalry between civil rights activist Ann Atwater and Ku Klux Klan leader.',
    genre: 'Drama',
    imageURL: '',
    year: 2019,
    director: 'Robin Bissel',
  },
  {
    title: 'The Name of the Rose',
    description:
      'Historical mystery film directed by Jean-Jacques Annaud, based on the 1980 novel of the same name by Umberto Eco.',
    genre: 'Mystery',
    imageURL: '',
    year: 1986,
    director: 'Jean-Jacques Annaud',
  },
  {
    title: 'The Lord of The Rings - The Fellowship of the Ring',
    description:
      "The Fellowship of the Ring is a 2001 epic fantasy adventure film directed by Peter Jackson, based on the first volume of J. R. R. Tolkien's The Lord of the Rings. The film is the first instalment in The Lord of the Rings trilogy",
    genre: 'Epic Fantasy',
    imageURL: '',
    year: 2001,
    director: 'Peter Jackson',
  },
  {
    title: 'Dune',
    description:
      'American epic science fiction film directed by Denis Villeneuve from a screenplay by Villeneuve, Jon Spaihts, and Eric Roth. It is the first of a two-part adaptation of the 1965 novel by Frank Herbert.',
    genre: 'Science Fiction',
    imageURL: '',
    year: 2021,
    director: 'Denis Villeneuve',
  },
  {
    title: 'Arrival',
    description:
      'American science fiction drama film directed by Denis Villeneuve and adapted by Eric Heisserer, who conceived the project as a spec script based on the 1998 short story "Story of Your Life" by Ted Chiang.',
    genre: 'Science Fiction',
    imageURL: '',
    year: 1998,
    director: 'Denis Villeneuve',
  },
  {
    title: 'Edge of Tomorrow',
    description:
      'American science fiction action film starring Tom Cruise, Emily Blunt, Bill Paxton, and Brendan Gleeson. Directed by Doug Liman with a screenplay written by Christopher McQuarrie and the writing team of Jez and John-Henry Butterworth, its story is adapted from the 2004 Japanese light novel All You Need Is Kill by Hiroshi Sakurazaka.',
    genre: 'Science Fiction',
    imageURL: '',
    year: 2014,
    director: 'Doug Liman',
  },
  {
    title: '12 Years a Slave',
    description:
      'biographical drama film directed by Steve McQueen from a screenplay by John Ridley, based on the 1853 slave memoir Twelve Years a Slave by David Wilson, about a New York State-born free African-American man named Solomon Northup, who was kidnapped in Washington, D.C.',
    genre: 'Drama',
    imageURL: '',
    year: 2013,
    director: 'Steve McQueen',
  },
  {
    title: '300',
    description:
      'Epic historical action film based on the 1998 comic series of the same name by Frank Miller and Lynn Varley. Both are fictionalized retellings of the Battle of Thermopylae in the Persian Wars.',
    genre: 'Action',
    imageURL: '',
    year: 2006,
    director: 'Zack Snyder',
  },
  {
    title: 'Apocalypto',
    description:
      'Epic historical adventure film produced, co-written, and directed by Mel Gibson. The film features a cast of Native American and Indigenous Mexican actors.',
    genre: 'Adventure',
    genre: '',
    year: 2006,
    director: 'Mel Gibson',
  },
  {
    title: 'Bohemian Rapsody',
    description:
      'Biographical musical drama film directed by Bryan Singer from a screenplay by Anthony McCarten, and produced by Graham King and Queen manager Jim Beach. The film tells the story of the life of Freddie Mercury, the lead singer of the British rock band Queen, from the formation of the band in 1970 up to their 1985 Live Aid performance at the original Wembley Stadium.',
    genre: 'Musical',
    imageURL: '',
    year: 2018,
    director: 'Bryan Singer',
  },
];

// MIDDLEWARE--------------------------------------------------------------
app.use(morgan('common'));
app.use(express.static('public'));
app.use(bodyParser.json());

// ROUTING-----------------------------------------------------------------
// Welcome message at root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to myFlix API!');
});
// Retrieve list of all movies
app.get('/movies', (req, res) => {
  res.status(201).json(topMovies);
});

// Get info about movie by title
app.get('/movies/:title', (req, res) => {
  let movie = topMovies.find((movie) => movie.title === req.params.title);
  if (movie) {
    let { description, genre, director, imageURL } = movie;
    res.status(201).json({ description, genre, director, imageURL });
  } else {
    res.status(404).send(`The movie ${req.params.title} was not found.`);
  }
});

// Get data about single genre by name
app.get('/genres/:name', (req, res) => {
  res.send(`Here comes the description of the genre: ${req.params.name}`);
});

// Get data about single director by name
app.get('/directors/:name', (req, res) => {
  res
    .status(200)
    .send(
      `Here goes JSON object with data about "${req.params.name}" (Bio, yearOfBirth, yearOfDeath)`
    );
});

// Register a new user
app.post('/users', (req, res) => {
  res
    .status(200)
    .send(
      `New user "${req.body.username}" was succesfully registered. Congrats!`
    );
});

// De-register user from users
app.delete('/users/:email', (req, res) => {
  res
    .status(200)
    .send(`The Email "${req.params.email}" was succesfully de-registered.`);
});

// Update info from a user
app.put('/users/:username', (req, res) => {
  res
    .status(200)
    .send(`User's "${req.params.username}" data was updated correctly.`);
});

// Add movie to a user's favorites list
app.post('/users/:username/favorites', (req, res) => {
  res
    .status(200)
    .send(
      `The title "${req.body.title}" was added to the favorites list from "${req.params.username}"`
    );
});

// Delete movie from a user's favorites list
app.delete('/users/:username/favorites/:title', (req, res) => {
  res
    .status(200)
    .send(
      `The movie "${req.params.title}" was succesfully removed from the favorites list of "${req.params.username}"`
    );
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
