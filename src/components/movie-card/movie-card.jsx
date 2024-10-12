import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100">
            <Card.Img
                variant="top"
                src={movie.image}
                onClick={() => {
                    onMovieClick(movie);
                }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <p>Genre: {movie.genre.Name}</p>
                <Button
                    onClick={() => {
                        onMovieClick(movie);
                    }}
                    variant="primary"
                    className="w-100 mt-auto"
                >
                    Open
                </Button>
            </Card.Body>
        </Card>
    );
};

// defining all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }),
        // featured: PropTypes.bool.isRequired
    }),
};
