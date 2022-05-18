// Modules imports
const express = require('express'),
  morgan = require('morgan');

// Initialize express server
const app = express();

// Array with top 10 movies
let topMovies = [
  { title: 'The Best of Enemies', year: 2019, director: 'Robin Bissel' },
  {
    title: 'The Name of the Rose',
    year: 1986,
    director: 'Jean-Jacques Annaud',
  },
  {
    title: 'The Lord of The Rings - The Fellowship of the Ring',
    year: 2001,
    director: 'Peter Jackson',
  },
  {
    title: 'Dune',
    year: 2021,
    director: 'Denis Villeneuve',
  },
  {
    title: 'Arrival',
    year: 1998,
    director: 'Denis Villeneuve',
  },
  {
    title: 'Edge of Tomorrow',
    year: 2014,
    director: 'Doug Liman',
  },
  {
    title: '12 Years a Slave',
    year: 2013,
    director: 'Steve McQueen',
  },
  {
    title: '300',
    year: 2006,
    director: 'Zack Snyder',
  },
  {
    title: 'Apocalypto',
    year: 2006,
    director: 'Mel Gibson',
  },
  {
    title: 'Bohemian Rapsody',
    year: 2018,
    director: 'Bryan Singer',
  },
];

// Load Morgan middleware to log requests
app.use(morgan('common'));

// Serve static files on /public
app.use(express.static('public'));

// Routing
app.get('/', (req, res) => {
  res.send('Welcome to myFlix API!');
});
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

// Error handling
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Someting went wrong!');
});

// listen for requests
app.listen(8080, () => {
  console.log('The app is listening on port 8080...');
});
