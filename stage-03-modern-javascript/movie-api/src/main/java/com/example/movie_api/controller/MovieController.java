package com.example.movie_api.controller;


import com.example.movie_api.dto.MovieResponse;
import com.example.movie_api.service.MovieService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @GetMapping
    public List<MovieResponse> searchMovies(
            @RequestParam(required = false) String search
    ) {
        return movieService.searchMovies(search);
    }
}
