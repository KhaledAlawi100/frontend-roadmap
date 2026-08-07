import appState from "./state/appState.js";
import { searchMovies } from "./api/movieApi.js";

import { renderMovieList } from "./components/movieList.js";

console.log("MovieFinder started!");

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("movie-results");
const searchMessage = document.querySelector(".search-message");
const clearButton = document.getElementById("clear-button");
const searchButton = document.getElementById("search-button");

async function handleSearch(query) {
  if (!query) {
    searchMessage.textContent = "Please enter a movie name.";
    return;
  }

  appState.searchQuery = query;
  appState.isLoading = true;
  searchMessage.textContent = "Searching for movies...";
  appState.error = null;

  const { searchQuery } = appState;
  console.log("Search query:", searchQuery);

  try {
    const movies = await searchMovies(searchQuery);
    appState.movies = movies;
    appState.error = null;
    if (movies.length === 0) {
      searchMessage.textContent = `No movies found for "${searchQuery}".`;
      searchMessage.classList.add("error");
      resultsContainer.innerHTML = "";
    } else {
      searchMessage.textContent = `Found ${movies.length} movies for "${searchQuery}".`;
      searchMessage.classList.remove("error");
      renderMovieList(movies, resultsContainer);
    }
  } catch (error) {
    appState.error = error;
    searchMessage.textContent = "An error occurred while searching for movies.";
    searchMessage.classList.add("error");
    resultsContainer.innerHTML = "";
    // renderError(error);
  } finally {
    console.log("Search completed. Current appState:", appState);
    appState.isLoading = false;
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  searchMessage.classList.remove("error");
  const query = searchInput.value.trim();

  handleSearch(query);
});

clearButton.addEventListener("click", () => {
  searchInput.value = "";
  appState.searchQuery = "";
  resultsContainer.innerHTML = "";
  searchMessage.textContent = "Please enter a movie name.";
  searchButton.disabled = true;
  searchMessage.classList.remove("error");
});

searchInput.addEventListener("input", () => {

  searchMessage.classList.remove("error");

  if (!searchInput.value.trim()) {
    searchMessage.textContent = "Please enter a movie name.";
    resultsContainer.innerHTML = "";
    searchButton.disabled = true;
  } else {
    searchMessage.textContent = "Ready to search.";
    searchButton.disabled = false;
  }
});
