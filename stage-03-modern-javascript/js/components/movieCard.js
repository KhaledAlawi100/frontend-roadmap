export function createMovieCard({
  id,
  title,
  year,
  rating,
  genre,
  description,
  director
}) {
  return `
        <article class="movie-card">
            <h3>${title}</h3>
            <p>${year}</p>
            <p>⭐ ${rating}</p>
            <p>Genre: ${genre}</p>
            <p>Director: ${director}</p>
            <p>${description}</p>
        </article>
    `;
}
