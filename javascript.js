const API_KEY = "YOUR_OMDB_API_KEY"; // replace with your OMDb key

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const moviesContainer = document.getElementById("movies");
const favoritesContainer = document.getElementById("favorites");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// Default movies to show initially
const defaultMovies = [
  {
    Title: "Inception",
    Year: "2010",
    imdbID: "tt1375666",
    Poster: "https://m.media-amazon.com/images/I/61gz2gcfkAL._AC_UF894,1000_QL80_.jpg",
  },
  {
    Title: "The Dark Knight",
    Year: "2008",
    imdbID: "tt0468569",
    Poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQIDBzmXfy4ibSrd6wVXqHpnQ-Kvh5LZMhow&s",
  },
  {
    Title: "Interstellar",
    Year: "2014",
    imdbID: "tt0816692",
    Poster: "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SL1500_.jpg",
  },
  {
    Title: "Avengers: Endgame",
    Year: "2019",
    imdbID: "tt4154796",
    Poster: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SL1500_.jpg",
  },
  {
    Title: "Joker",
    Year: "2019",
    imdbID: "tt7286456",
    Poster: "https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg",
  },
];

async function searchMovies() {
  const query = searchInput.value.trim();
  if (!query) return alert("Please enter a movie name.");

  moviesContainer.innerHTML = "<p>Loading...</p>";

  const response = await fetch(https://www.omdbapi.com/?apikey=${API_KEY}&s=${query});
  const data = await response.json();

  if (data.Response === "False") {
    moviesContainer.innerHTML = "<p>No movies found.</p>";
    return;
  }

  displayMovies(data.Search, moviesContainer, false);
}

function displayMovies(movies, container, isFavoriteList) {
  container.innerHTML = "";
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const poster =
      movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200";

    card.innerHTML = `
      <img src="${poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
      <button class="favorite-btn">
        ${isFavorite(movie.imdbID) ? "★ Remove" : "☆ Add Favorite"}
      </button>
    `;

    card.querySelector(".favorite-btn").addEventListener("click", () => {
      toggleFavorite(movie);
    });

    container.appendChild(card);
  });
}

function toggleFavorite(movie) {
  const exists = favorites.find((fav) => fav.imdbID === movie.imdbID);
  if (exists) {
    favorites = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
  } else {
    favorites.push(movie);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayMovies(favorites, favoritesContainer, true);

  // refresh current list (default or search)
  if (searchInput.value) searchMovies();
  else displayMovies(defaultMovies, moviesContainer, false);
}

function isFavorite(id) {
  return favorites.some((fav) => fav.imdbID === id);
}

// Load default movies and favorites on page load
window.addEventListener("DOMContentLoaded", () => {
  displayMovies(defaultMovies, moviesContainer, false);
  displayMovies(favorites, favoritesContainer, true);
});

searchBtn.addEventListener("click", searchMovies);
