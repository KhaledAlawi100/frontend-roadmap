package com.example.movie_api.service;



import com.example.movie_api.dto.MovieResponse;
import com.example.movie_api.entity.Movie;
import com.example.movie_api.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;

    public List<MovieResponse> searchMovies(String search) {

        List<Movie> movies;

        if (search == null || search.isBlank()) {
            movies = movieRepository.findAll();
        } else {
            movies = movieRepository.findByTitleContainingIgnoreCase(search);
        }

        return movies.stream()
                .map(this::toMovieResponse)
                .toList();
    }

    private MovieResponse toMovieResponse(Movie movie) {

        return new MovieResponse(
                movie.getId(),
                movie.getTitle(),
                movie.getYear(),
                movie.getRating(),
                movie.getGenre(),
                movie.getDescription(),
                movie.getDirector()
        );
    }
}
