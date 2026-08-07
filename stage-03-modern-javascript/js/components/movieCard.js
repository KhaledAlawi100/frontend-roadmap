export function createMovieCard({id, title, year}) {
  return `
        <article class="movie-card">
            <h3>${title}</h3>
            <p>${year}</p>
        </article>
    `;
}
