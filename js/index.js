//Tmbd

const API_KEY = 'api_key=cddd05e984d848558d4c12d8a4cd40d8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;

getMovies(API_URL);

function getMovies(url) {
  fetch(url).then(res => res.json()).then(data => {
    showMovies(data.results);
  })
}

function showMovies(data) {
  data.forEach(movie => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
  });
}