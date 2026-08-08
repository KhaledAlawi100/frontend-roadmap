export function filterMovies(movies, searchTerm) {
  const normalizedSearchTerm = searchTerm.toLowerCase().trim();

  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(normalizedSearchTerm)|| movie.genre.toLowerCase().includes(normalizedSearchTerm)
  );
}
