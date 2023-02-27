//Tmbd

const API_KEY = 'api_key=cddd05e984d848558d4c12d8a4cd40d8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_PATH = 'https://image.tmdb.org/t/p/original';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;



function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
      showMovies(data.results);
    })
  }

  

getMovies(API_URL);

const movieBox = document.querySelector('#movie-box');
const showMovies = (data) => {
  data.forEach(item => {
    const box = document.createElement('div');
    box.setAttribute('class', 'mySlides fade');
    // box.classList.add('mySlides');
    // box.classList.add('fade');
    box.innerHTML = ` <img src="${IMG_PATH + item.poster_path}" style="width: 100%">
    <div class="text">${item.vote_average}</div>
    `;
    movieBox.appendChild(box);
  });
}







//slidebox

let slideIndex = 1;
let timeoutId = null;
const slides = document.getElementsByClassName("mySlides");
// const dots = document.getElementsByClassName("dot");

showSlides();
function currentSlide(index) {
     slideIndex = index;
     showSlides();
}
function plusSlides(step) {
  
  if(step < 0) {
      slideIndex -= 2;
      
      if(slideIndex < 0) {
        slideIndex = slides.length - 1;
      }
  }
  
  showSlides();
}
function showSlides() {
  for(let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    // dots[i].classList.remove('active');
  }
  slideIndex++;
  if(slideIndex > slides.length) {
    slideIndex = 1
  }
  slides[slideIndex - 1].style.display = "block";
  // dots[slideIndex - 1].classList.add('active');
   if(timeoutId) {
      clearTimeout(timeoutId);
   }
  timeoutId = setTimeout(showSlides, 50000); // Change image every 5 seconds
}