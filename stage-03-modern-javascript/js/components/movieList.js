import { createMovieCard } from "./movieCard.js";
import { isMovieInFavorites } from "../services/movieService.js";

export function renderMovieList(movies, container, favorites = []) {
  container.innerHTML = "";

  movies.forEach((movie) => {
    const isFavorite = isMovieInFavorites(favorites, movie.id);

    container.innerHTML += createMovieCard(movie, isFavorite);
  });
  
}
