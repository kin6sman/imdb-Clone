//This code is for displaying popular movies from the "themoviedb.org" API.
const API_KEY = "api_key=cddd05e984d848558d4c12d8a4cd40d8";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_PATH = "https://image.tmdb.org/t/p/original";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;


//function getMovies() that takes a URL, fetches data from that URL, converts the response to JSON format, and then calls two other functions showMovies() and Movies() passing in the fetched data as an argument.
function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
      Movies(data.results);
    });
}


//The code calls getMovies() passing in the API_URL as an argument to display popular movies
getMovies(API_URL);

const slideBox = document.querySelector("#movie-box");


//showMovies() is responsible for creating a slideshow of popular movies, by creating a div element for each movie, setting its class as "mySlides fade", and then setting its innerHTML to include an image of the movie's poster and the movie's vote average. It then appends the created div to a parent element with the ID "movie-box".
const showMovies = (data) => {
  data.forEach((item) => {
    const box = document.createElement("div");

    box.setAttribute("class", "mySlides fade");

    box.innerHTML = ` <img src="${
      IMG_PATH + item.poster_path
    }" style="width: 100%">
    <div class="text">${item.vote_average}</div>
    `;
    slideBox.appendChild(box);
  });
};

//sidebar

const movieBox = document.getElementById("popular-Movie");


//Movies() is responsible for creating a sidebar containing popular movies, by creating a div element for each movie, setting its class as "card", and then setting its innerHTML to include an image of the movie's poster, its title, overview, and vote average. It then appends the created div to a parent element with the ID "popular-Movie".
const Movies = (data) => {
  console.log(data);
  data.forEach((item) => {
    const cards = document.createElement("div");

    cards.setAttribute("class", "card");

    cards.innerHTML = `
      <img src="${IMG_PATH + item.poster_path}">
      <div class="text-container">
        <h2>${item.title}</h2>
        <br>
        <p> ${item.overview}</p>
        <br>
        </h3>Rating: ${item.vote_average}</h3>
        <br>
        <br>
        
        
      </div>
    `;

    movieBox.appendChild(cards);
  });
};

//slidebox
//This code defines a slideshow functionality that changes images every 5 seconds. It sets the starting index of the slideshow as 1, gets all the HTML elements with class "mySlides" and loops through them to set their display style as "none" except the one at the current slide index, which is set to "block".
let slideIndex = 1;
let timeoutId = null;
const slides = document.getElementsByClassName("mySlides");


showSlides();

//The currentSlide() function takes an index value to set the current slide index and display the corresponding slide. 
function currentSlide(index) {
  slideIndex = index;
  showSlides();
}

// The plusSlides() function takes a step value to navigate between the slides in the slideshow.
function plusSlides(step) {
  if (step < 0) {
    slideIndex -= 2;

    if (slideIndex < 0) {
      slideIndex = slides.length - 1;
    }
  }

  showSlides();
}


function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    // dots[i].classList.remove('active');
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  

  //The timeoutId variable is used to clear the previous timeout and prevent multiple timeout functions running at once.
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(showSlides, 5000); // Change image every 5 seconds
}
