// Titles: https://www.omdbapi.com/?s=thor&page=1&apikey=bfd6b563
// details: http://www.omdbapi.com/?i=tt3896198&apikey=bfd6b563
const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");

let favList = JSON.parse(sessionStorage.getItem('id'));

console.log('first line' + favList);

if(sessionStorage.getItem("id")=== null){
  favList = [];
};

let tempList = [];




// load movies from API
async function loadMovies(searchTerm) {
  const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=bfd6b563`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  // console.log(data.Search);
  if (data.Response == "True") displayMovieList(data.Search);
}




window.addEventListener("load", (event) => {
  reload();
});



function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

function displayMovieList(movies) {
  searchList.innerHTML = "";
  for (let idx = 0; idx < movies.length; idx++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
    movieListItem.classList.add("search-list-item");
    if (movies[idx].Poster != "N/A") moviePoster = movies[idx].Poster;
    else moviePoster = "imagenotfound.jpg";

    movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll(".search-list-item");
  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      // console.log(movie.dataset.id);
      searchList.classList.add("hide-search-list");
      movieSearchBox.value = "";
      const result = await fetch(
        `https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=bfd6b563`
      );
      const movieDetails = await result.json();
      // console.log(movieDetails);
      displayMovieDetails(movieDetails);
    });
  });
}

function displayMovieDetails(details) {
  console.log(details);

  document.getElementById("overlay").style.display = "block";

  resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${
          details.Poster != "N/A" ? details.Poster : "image_not_found.png"
        }" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${
          details.Awards
        }</p>
        <br>
        <button id="fav-btn" class="btn"><img src="assets/FAV.png"><br>Mark as Favorite</button>
    </div>
    `;

    let string;
// We are storing movies id for fav list
  const fav_btn = document.getElementById("fav-btn");
  // tempList.push(details);
  fav_btn.addEventListener("click", () => {
    
    favList.push(details.imdbID);
      
    string = JSON.stringify(favList);
    sessionStorage.setItem('id', string);
      reload();
    console.log("favlist: " + favList);
  });
}



window.addEventListener("click", (event) => {
  if (event.target.className != "form-control") {
    searchList.classList.add("hide-search-list");
  }
});

function off() {
  document.getElementById("overlay").style.display = "none";
}

//load movies to fav section



function reload() {

  let retString = sessionStorage.getItem('id');
  let retArray= JSON.parse(retString);

  retArray.forEach(async (id) => {
    if(!tempList.includes(id)) {
      console.log(id);
    const favURL = `https://www.omdbapi.com/?i=${id}&page=1&apikey=bfd6b563`;
    const favres = await fetch(`${favURL}`);
    const favdata = await favres.json();
    console.log(favdata + 'inside reload function');
    if (favdata.Response == "True") favMovieList(favdata);
    }
  });
}

let favBox = document.getElementById("favContainer");

function favMovieList(movies) {
  let card = document.createElement("div");
  card.setAttribute("class", "fav-card");

  card.innerHTML = ` 
  <div class="img-div">
      <img src="${movies.Poster}" alt="Poster Not Found">
  </div>
  <div class="content-div border">
      <h2> ${movies.Title} </h2>
  </div>
      `;
      favBox.appendChild(card);
      
    tempList.push(movies.imdbID);

}
