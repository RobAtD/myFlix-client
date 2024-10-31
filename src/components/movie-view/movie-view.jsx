import PropTypes from 'prop-types';
import {useParams} from 'react-router';
import {Card, ListGroup, Button, Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { SimilarMovies } from './similar-movies';

export const MovieView = ({ user, movies, token }) => {
    const {movieID} = useParams();

    const movie = movies.find((m)=> m.id === movieID);
    const similarMovies = movies.find((s)=> s.genre.Name === movie.genre.Name);
    
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card className="mb-5">
                        <Card.Img src={movie.image} />
                        <Card.Body>
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text>{movie.description}</Card.Text>
                            <ListGroup>
                                <ListGroup.Item>
                                    Genre: {movie.genre.Name}
                                </ListGroup.Item>
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
                            <Link to="/">
                                <Button className="mt-3">Back</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Row>
                    <SimilarMovies
                        movies={movies}
                        user={user}
                        token={token}
                        similarMovies={similarMovies}
                    />
                </Row>
            </Row>
        </Container>
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
