import { MovieCard } from '../movie-card/movie-card';
import { Col } from 'react-bootstrap';

export const FavoriteMovies = ({ user, movies, token }) => {
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
