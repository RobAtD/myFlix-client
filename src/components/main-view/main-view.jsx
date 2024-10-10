import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch('https://robs-movie-api-981dce4af120.herokuapp.com/movies')
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((doc) => {
                    return {
                        id: doc._id,
                        title: doc.Title,
                        description: doc.Description,
                        genre: doc.Genre,
                        director: doc.Director,
                        actors: doc.Actors,
                        image: doc.ImageURL,
                        releaseYear: doc.ReleaseYear,
                        featured: doc.Featured,
                    };
                });
                setMovies(moviesFromApi);
            });
    }, []);

    if (selectedMovie) {
        let similarMovies = movies.filter((movie) => {
                return movie.genre.Name == selectedMovie.genre.Name && movie.title != selectedMovie.title;
        });
        return (
            <div>
                <MovieView
                    movie={selectedMovie}
                    onBackClick={() => {
                        setSelectedMovie(null);
                    }}
                />
                <hr />
                <h2>Similar Movies</h2>
                <div>
                    {similarMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    } else {
        return (
            <div>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                ))}
            </div>
        );
    }
};
