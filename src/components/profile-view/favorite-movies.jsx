import { MovieCard } from '../movie-card/movie-card';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const FavoriteMovies = ({ token }) => {
    const user = useSelector((state) => state.user);
    const movies = useSelector((state) => state.movies.list);

    let favoriteMovies = movies.filter((m) =>
        user.FavoriteMovies.includes(m.id)
    );

    const cardWith = () => {
        return Object.keys(favoriteMovies).length < 1
            ? 12
            : Object.keys(favoriteMovies).length === 2
            ? 6
            : 4;
    };

    return favoriteMovies.map((movie) => (
        <Col className="mb-4" key={movie.id} xs={12} md={cardWith()}>
            <MovieCard user={user} token={token} movie={movie} />
        </Col>
    ));
};
