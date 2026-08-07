import { createMovieCard } from "./movieCard.js";

export function renderMovieList(movies, container) {
  const movieCards = movies.map(createMovieCard);

  container.innerHTML = movieCards.join("");
}
