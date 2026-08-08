export function filterMovies(movies, searchTerm) {
  const normalizedSearchTerm = searchTerm.toLowerCase().trim();

  return movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(normalizedSearchTerm) ||
      movie.genre.toLowerCase().includes(normalizedSearchTerm),
  );
}

export function sortMovies(movies, sortType) {
  const sortedMovies = [...movies];

  switch (sortType) {
    case "rating-desc":
      return sortedMovies.sort((a, b) => b.rating - a.rating);

    case "rating-asc":
      return sortedMovies.sort((a, b) => a.rating - b.rating);

    case "year-desc":
      return sortedMovies.sort((a, b) => b.year - a.year);

    case "year-asc":
      return sortedMovies.sort((a, b) => a.year - b.year);

    case "title-asc":
      return sortedMovies.sort((a, b) => a.title.localeCompare(b.title));

    default:
      return sortedMovies;
  }
}

export function calculateMovieStatistics(movies) {
  if (movies.length === 0) {
    return {
      count: 0,
      averageRating: 0,
      highestRating: 0,
    };
  }

  const totalRating = movies.reduce((total, movie) => total + movie.rating, 0);

  const highestRatedMovie = movies.reduce((highest, movie) =>
    movie.rating > highest.rating ? movie : highest,
  );

  return {
    count: movies.length,
    averageRating: totalRating / movies.length,
    highestRating: highestRatedMovie.rating,
  };
}

export function findMovieById(movies, movieId) {
  return movies.find((movie) => movie.id === movieId);
}

export function isMovieInFavorites(favorites, movieId) {
  return favorites.some((movie) => movie.id === movieId);
}

export function areMoviesHighlyRated(movies) {
  return movies.every((movie) => movie.rating >= 8);
}

export function addFavorite(favorites, movie) {
  return [...favorites, movie];
}

export function removeFavorite(favorites, movieId) {
  return favorites.filter((movie) => movie.id !== movieId);
}
