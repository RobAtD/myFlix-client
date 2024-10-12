import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch('https://robs-movie-api-981dce4af120.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` },
        })
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
    }, [token]);

    // Show selected movie
    if (selectedMovie) {
        // Filters similar movies based on genre
        let similarMovies = movies.filter((movie) => {
            return (
                movie.genre.Name == selectedMovie.genre.Name &&
                movie.title != selectedMovie.title
            );
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

    if (!user) {
        return (
            <div>
                <LoginView
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }}
                />
                or
                <SignupView />
            </div>
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    } else {
        return (
            <div>
                <button
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                >
                    Logout
                </button>
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
