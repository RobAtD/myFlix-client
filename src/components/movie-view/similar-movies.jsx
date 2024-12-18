import { MovieCard } from '../movie-card/movie-card';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const SimilarMovies = ({ token, viewedMovie }) => {
    const user = useSelector((state)=> state.user);
    const movies = useSelector((state)=> state.movies.list);
    
    const filteredMovies = movies.filter((movie) => {
                return (
                    movie.genre.Name === viewedMovie.genre.Name &&
                    movie.id !== viewedMovie.id   
                );
            });

            const cardWith = () => {
                return Object.keys(filteredMovies).length < 1
                    ? 12
                    : Object.keys(filteredMovies).length === 2
                    ? 6
                    : 4;
            };

    return filteredMovies.map((movie) => (
        <Col className="mb-4" key={movie.id} xs={12} md={cardWith()}>
            <MovieCard user={user} token={token} movie={movie} />
        </Col>
    ));
};
