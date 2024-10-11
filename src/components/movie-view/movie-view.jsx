import PropTypes from 'prop-types';
import { CardBody } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <Card className='mb-5'>
            <Card.Img src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <ListGroup>
                    <ListGroup.Item>Genre: {movie.genre.Name}</ListGroup.Item>
                    <ListGroup.Item>
                        Director: {movie.director.Name}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Actors: {movie.actors.join(', ')}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Release year: {movie.releaseYear}
                    </ListGroup.Item>
                </ListGroup>

                <Button className='mt-3' onClick={onBackClick}>Back</Button>
            </Card.Body>
        </Card>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Movies: PropTypes.array.isRequired,
            Birthdate: PropTypes.string.isRequired,
            Deathdate: PropTypes.string,
        }),
        genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
        }),
        actors: PropTypes.array.isRequired,
        releaseYear: PropTypes.number.isRequired,
        featured: PropTypes.bool.isRequired,
    }),
};
