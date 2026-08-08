import appState from "./state/appState.js";
import { searchMovies } from "./api/movieApi.js";

import { renderMovieList } from "./components/movieList.js";

import {
  filterMovies,
  sortMovies,
  calculateMovieStatistics,
  findMovieById,
  isMovieInFavorites,
  addFavorite,
  removeFavorite,
} from "./services/movieService.js";

console.log("MovieFinder started!");

// ==========================
// DOM Elements
// ==========================

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("movie-results");
const searchMessage = document.querySelector(".search-message");
const clearButton = document.getElementById("clear-button");
const searchButton = document.getElementById("search-button");
const sortSelect = document.getElementById("sort-select");

const movieCount = document.getElementById("movie-count");
const averageRating = document.getElementById("average-rating");
const highestRating = document.getElementById("highest-rating");

// ==========================
// Search
// ==========================

async function handleSearch(query) {
  if (!query) {
    showSearchMessage("Please enter a movie name.");
    return;
  }

  setSearchingState(query);

  try {
    const movies = await searchMovies(appState.searchQuery);

    appState.movies = movies;
    appState.error = null;

    const { movies: processedMovies, statistics } = processMovies(
      appState.movies,
      appState.searchQuery,
      sortSelect.value,
    );

    if (processedMovies.length === 0) {
      showEmptyResults(appState.searchQuery);
      return;
    }

    showSearchMessage(
      `Found ${statistics.count} movies for "${appState.searchQuery}".`,
    );

    renderSearchResults(processedMovies, statistics);
  } catch (error) {
    handleSearchError(error);
  } finally {
    appState.isLoading = false;

    console.log("Search completed. Current appState:", appState);
  }
}

// ==========================
// Movie Processing
// ==========================

function processMovies(movies, searchQuery, sortOption) {
  const filteredMovies = filterMovies(movies, searchQuery);

  const sortedMovies = sortMovies(filteredMovies, sortOption);

  const statistics = calculateMovieStatistics(filteredMovies);

  return {
    movies: sortedMovies,
    statistics,
  };
}

// ==========================
// Rendering
// ==========================

function renderSearchResults(movies, statistics) {
  renderMovieList(movies, resultsContainer, appState.favorites);

  movieCount.textContent = statistics.count;

  averageRating.textContent = statistics.averageRating.toFixed(1);

  highestRating.textContent = statistics.highestRating.toFixed(1);
}

// ==========================
// UI State Helpers
// ==========================

function setSearchingState(query) {
  appState.searchQuery = query;
  appState.isLoading = true;
  appState.error = null;

  showSearchMessage("Searching for movies...");
}

function showSearchMessage(message) {
  searchMessage.textContent = message;
}

function resetMovieStatistics() {
  movieCount.textContent = "0";
  averageRating.textContent = "0.0";
  highestRating.textContent = "0.0";
}

function showEmptyResults(query) {
  showSearchMessage(`No movies found for "${query}".`);

  searchMessage.classList.add("error");

  resultsContainer.innerHTML = "";

  resetMovieStatistics();
}

function handleSearchError(error) {
  appState.error = error;

  showSearchMessage("An error occurred while searching for movies.");

  searchMessage.classList.add("error");

  resultsContainer.innerHTML = "";

  resetMovieStatistics();
}

function resetSearchUI() {
  searchInput.value = "";

  appState.searchQuery = "";
  appState.movies = [];
  appState.isLoading = false;
  appState.error = null;

  resultsContainer.innerHTML = "";

  showSearchMessage("Please enter a movie name.");

  searchButton.disabled = true;

  searchMessage.classList.remove("error");

  resetMovieStatistics();
}

function refreshMovieResults() {
  const { movies, searchQuery } = appState;

  const { movies: processedMovies, statistics } = processMovies(
    movies,
    searchQuery,
    sortSelect.value,
  );

  renderSearchResults(processedMovies, statistics);
}

// ==========================
// Event Handlers
// ==========================

resultsContainer.addEventListener("click", (event) => {
  const favoriteButton = event.target.closest(".favorite-button");

  if (!favoriteButton) {
    return;
  }

  const movieId = Number(favoriteButton.dataset.movieId);

  const movie = findMovieById(appState.movies, movieId);

  if (!movie) {
    return;
  }

  if (isMovieInFavorites(appState.favorites, movieId)) {
    appState.favorites = removeFavorite(appState.favorites, movieId);
  } else {
    appState.favorites = addFavorite(appState.favorites, movie);
  }

  console.log("Favorites:", appState.favorites);

  refreshMovieResults();
});


searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  searchMessage.classList.remove("error");

  const query = searchInput.value.trim();

  handleSearch(query);
});

clearButton.addEventListener("click", () => {
  resetSearchUI();
});


searchInput.addEventListener("input", () => {
  searchMessage.classList.remove("error");

  const query = searchInput.value.trim();

  searchButton.disabled = !query;

  if (!query) {
    resetSearchUI();
  } else {
    showSearchMessage("Ready to search.");
  }
});

sortSelect.addEventListener("change", refreshMovieResults);
