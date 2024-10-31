import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AddFavorite } from './add-favorite';

export const MovieCard = ({ movie, user, token }) => {
    return (
        <Card className="h-100">
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                <Card.Img variant="top" src={movie.image} />
            </Link>
            <Card.Body className="d-flex flex-column">
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <p>Genre: {movie.genre.Name}</p>
                    <AddFavorite user={user} token={token} movie={movie}/>
            </Card.Body>
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                <Button variant="primary" className="w-100 mt-auto">
                    Open
                </Button>
            </Link>
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
