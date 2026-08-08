package com.example.movie_api.config;


import com.example.movie_api.entity.Movie;
import com.example.movie_api.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final MovieRepository movieRepository;

    @Override
    public void run(String... args) {

        movieRepository.save(
                new Movie(
                        null,
                        "Inception",
                        2010,
                        8.8,
                        "Sci-Fi",
                        "A thief who steals corporate secrets through dream-sharing technology.",
                        "Christopher Nolan"
                )
        );

        movieRepository.save(
                new Movie(
                        null,
                        "Interstellar",
                        2014,
                        8.7,
                        "Sci-Fi",
                        "A team of explorers travel through a wormhole in space.",
                        "Christopher Nolan"
                )
        );

        movieRepository.save(
                new Movie(
                        null,
                        "The Dark Knight",
                        2008,
                        9.0,
                        "Action",
                        "Batman faces a criminal mastermind known as the Joker.",
                        "Christopher Nolan"
                )
        );

        movieRepository.save(
                new Movie(
                        null,
                        "The Prestige",
                        2006,
                        8.5,
                        "Drama",
                        "Two rival magicians engage in a battle to create the ultimate illusion.",
                        "Christopher Nolan"
                )
        );

        movieRepository.save(
                new Movie(
                        null,
                        "Titanic",
                        1997,
                        7.9,
                        "Drama",
                        "Two people from different social backgrounds fall in love aboard the Titanic.",
                        "James Cameron"
                )
        );

        movieRepository.save(
                new Movie(
                        null,
                        "Avatar",
                        2009,
                        7.9,
                        "Sci-Fi",
                        "A marine becomes part of a mission on the alien world of Pandora.",
                        "James Cameron"
                )
        );

        movieRepository.save(
                new Movie(
                        null,
                        "The Matrix",
                        1999,
                        8.7,
                        "Sci-Fi",
                        "A computer hacker discovers the reality behind his world.",
                        "The Wachowskis"
                )
        );

        movieRepository.save(
                new Movie(
                        null,
                        "Gladiator",
                        2000,
                        8.5,
                        "Action",
                        "A Roman general seeks revenge after being betrayed.",
                        "Ridley Scott"
                )
        );
    }
}
