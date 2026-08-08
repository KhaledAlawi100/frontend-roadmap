package com.example.movie_api.dto;

public record MovieResponse(
        Long id,
        String title,
        Integer year,
        Double rating,
        String genre,
        String description,
        String director
) {
}
