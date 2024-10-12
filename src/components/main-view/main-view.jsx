import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    const [movies, setMovies] = useState([]);
    const [similarMovies, setSimilarMovies] = useState([]);
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

    useEffect(() => {
        if (selectedMovie != null) {
            const filteredMovies = movies.filter((movie) => {
                return (
                    movie.genre.Name == selectedMovie.genre.Name &&
                    movie.title != selectedMovie.title
                );
            });
            setSimilarMovies(filteredMovies);
        }
    }, [selectedMovie]);

    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                    <LoginView
                        onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                        }}
                    />
                    or
                    <SignupView />
                </Col>
            ) : selectedMovie ? ( // Show selected movie
                <>
                    <Col md={5}>
                        <MovieView
                            movie={selectedMovie}
                            onBackClick={() => {
                                setSelectedMovie(null);
                            }}
                        />
                    </Col>
                    <hr />
                    <Col md={12}>
                        <h2>Similar Movies</h2>
                    </Col>
                    {similarMovies.map((movie) => (
                        <Col md={4} key={movie.id}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}
                </>
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                <>
                    <Col md={12}>
                        <Button
                            onClick={() => {
                                setUser(null);
                                setToken(null);
                                localStorage.clear();
                            }}
                            className='mb-3 mt-3'
                        >
                            Logout
                        </Button>
                    </Col>
                    {movies.map((movie) => (
                        <Col className='mb-5' key={movie.id} md={4}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}
                </>
            )}
        </Row>
    );
};
