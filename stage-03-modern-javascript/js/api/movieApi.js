const mockMovies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    genre: "Sci-Fi",
    description:
      "A thief who steals corporate secrets through dream-sharing technology.",
      director: "Christopher Nolan",
  },
  {
    id: 2,
    title: "Interstellar",
    year: 2014,
    rating: 8.7,
    genre: "Sci-Fi",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    director: "Christopher Nolan",
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    rating: 9.0,
    genre: "Action",
    description:
      "Batman faces a criminal mastermind who plunges Gotham into chaos.",
    director: "Christopher Nolan",
  },
  {
    id: 4,
    title: "The Matrix",
    year: 1999,
    rating: 8.7,
    genre: "Sci-Fi",
    description:
      "A computer hacker learns about the true nature of his reality and his role in the war against its controllers.",
    director: "The Wachowskis",
  },
  {
    id: 5,
    title: "The Shawshank Redemption",
    year: 1994,
    rating: 9.3,
    genre: "Drama",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    director: "Frank Darabont",
  },
];

export async function searchMovies(query) {
  console.log("Searching for movies with query:", query);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (query === "empty") {
        resolve([]);
      } else if (query === "error") {
        reject(new Error("Simulated API error"));
      } else {
        resolve(mockMovies);
      }
    }, 1000);
  });
}
