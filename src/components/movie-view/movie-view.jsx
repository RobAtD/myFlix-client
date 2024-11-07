import PropTypes from 'prop-types';
import {useParams} from 'react-router';
import {Card, ListGroup, Button, Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { SimilarMovies } from './similar-movies';

export const MovieView = ({ user, movies, token }) => {
    const {movieID} = useParams();

    const viewedMovie = movies.find((m)=> m.id === movieID);
    
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card className="mb-5">
                        <Card.Img src={viewedMovie.image} />
                        <Card.Body>
                            <Card.Title>{viewedMovie.title}</Card.Title>
                            <Card.Text>{viewedMovie.description}</Card.Text>
                            <ListGroup>
                                <ListGroup.Item>
                                    Genre: {viewedMovie.genre.Name}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Director: {viewedMovie.director.Name}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Actors: {viewedMovie.actors.join(', ')}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Release year: {viewedMovie.releaseYear}
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
                        viewedMovie={viewedMovie}
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
