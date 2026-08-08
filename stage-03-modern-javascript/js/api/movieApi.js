const API_BASE_URL = "http://localhost:8080/api/movies";

export async function searchMovies(query) {
  const response = await fetch(
    `${API_BASE_URL}?search=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}
