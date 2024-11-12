import { useState, useEffect } from 'react';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { ProfileView } from '../profile-view/profile-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../../redux/reducers/movies';
import { setUser } from '../../redux/reducers/user';
import { MoviesList } from '../movies-list/movies-list';

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    const movies = useSelector((state) => state.movies.list);
    const user = useSelector((state) => state.user);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (token && storedUser) {
            dispatch(setUser(storedUser));
            fetchMovies(token);
        } else return;
    }, [token, dispatch]);

    const fetchMovies = (token) => {
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
                dispatch(setMovies(moviesFromApi));
            });
    };

    return (
        <BrowserRouter>
            <NavigationBar
                onLoggedOut={() => {
                    dispatch(setUser(null));
                    setToken(null);
                    localStorage.clear();
                }}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView
                                            onLoggedIn={(token) => {
                                                setToken(token);
                                            }}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieID"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <MovieView token={token} user={user} />
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/users/:Username"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <ProfileView
                                        users={user}
                                        movies={movies}
                                        token={token}
                                    />
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" />
                                ) : (
                                    <MoviesList user={user} token={token} />
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
