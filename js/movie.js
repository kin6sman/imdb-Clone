// Titles: https://www.omdbapi.com/?s=thor&page=1&apikey=bfd6b563
// details: http://www.omdbapi.com/?i=tt3896198&apikey=bfd6b563


// This code retrieves various DOM elements needed to manipulate the search feature
const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");

// This code retrieves the array of movie IDs stored in sessionStorage
let favList = JSON.parse(sessionStorage.getItem("id"));


// This code initializes an empty array to use if sessionStorage is empty
if (sessionStorage.getItem("id") === null) {
  favList = [];
}

// This code initializes an empty array to store temporary data
let tempList = [];

 // This function loads movies from the API based on the searchTerm argumen
async function loadMovies(searchTerm) {
  const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=bfd6b563`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  // console.log(data.Search);
  if (data.Response == "True") displayMovieList(data.Search);
}

// This code adds an event listener for the window load event, which calls the reload function
window.addEventListener("load", (event) => {
  reload();
});


// This function finds movies based on the search term entered by the user
function findMovies() {
  let searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}


// This function displays a list of movies based on the data passed to it
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


// This function loads the details of the movie when the user clicks on a movie from the search results
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

// This function displays the details of the movie passed to it
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






    //This code includes functions related to adding movies to a favorite list and loading them to the favorite section.

  let string;

  // We are storing movies id for fav list
  const fav_btn = document.getElementById("fav-btn");
  
  //The fav_btn variable stores the element for the favorite button and adds an event listener to the button that pushes the movie's IMDb ID to the favList array
  fav_btn.addEventListener("click", () => {
    favList.push(details.imdbID);


    //converts the favList to a string using JSON.stringify(), and stores it in the sessionStorage
    string = JSON.stringify(favList);
    sessionStorage.setItem("id", string);

    //The reload() function is called to load the movies to the favorite section
    reload();
    console.log("favlist: " + favList);
  });
}


//The window object also adds an event listener to the click event that hides the search list if the target element's class name is not "form-control".
window.addEventListener("click", (event) => {
  if (event.target.className != "form-control") {
    searchList.classList.add("hide-search-list");
  }
});


//The off() function hides the overlay on the page.
function off() {
  document.getElementById("overlay").style.display = "none";
}



//load movies to fav section
//The reload() function retrieves the favList array from sessionStorage, parses it using JSON.parse(), and loops through each ID in the array. If the ID is not already in the tempList array, the function calls the OMDb API to get the movie data, creates a new card element for the movie, and appends it to the favorite section. The favMovieList() function is called to create the card element and add it to the favorite section.
function reload() {
  let retString = sessionStorage.getItem("id");
  let retArray = JSON.parse(retString);

  retArray.forEach(async (id) => {
    if (!tempList.includes(id)) {
      console.log(id);
      const favURL = `https://www.omdbapi.com/?i=${id}&page=1&apikey=bfd6b563`;
      const favres = await fetch(`${favURL}`);
      const favdata = await favres.json();
      console.log(favdata + "inside reload function");
      if (favdata.Response == "True") favMovieList(favdata);
    }
  });
}



let favBox = document.getElementById("favContainer");


//The favMovieList() function creates a new div element with the class "fav-card", sets the innerHTML of the element with the movie's image and title, and appends the element to the favorite section. The movie's IMDb ID is added to the tempList array.
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
