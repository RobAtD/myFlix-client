import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre.Name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director.Name}</span>
            </div>
            <div>
                <span>Actors: </span>
                <span>{movie.actors.join(', ')}</span>
            </div>
            <div>
                <span>Release year: </span>
                <span>{movie.releaseYear}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
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