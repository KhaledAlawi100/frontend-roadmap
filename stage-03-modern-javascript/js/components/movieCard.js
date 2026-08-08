export function createMovieCard(movie, isFavorite = false) {
  const { id, title, year, rating, genre, description, director } = movie;

  return `
    <article class="movie-card">
      <h3>${title}</h3>

      <p>${year}</p>

      <p>⭐ ${rating}</p>

      <p>Genre: ${genre}</p>

      <p>Director: ${director}</p>

      <p>${description}</p>

      <button
        type="button"
        class="favorite-button"
        data-movie-id="${id}"
      >
        ${isFavorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
      </button>
    </article>
  `;
}
