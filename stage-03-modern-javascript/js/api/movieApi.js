export async function searchMovies(query) {
  console.log("Searching for movies with query:", query);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (query === "empty") {
        resolve([]);
      } 
      else if (query === "error") {
        reject(new Error("Simulated API error"));
      }
      else {
        const mockMovies = [
          {
            id: 1,
            title: "Inception",
            year: 2010,
          },
          {
            id: 2,
            title: "Interstellar",
            year: 2014,
          },
          {
            id: 3,
            title: "The Dark Knight",
            year: 2008,
          },
        ];

        resolve(mockMovies);
      }
    }, 1000);
  });
}
