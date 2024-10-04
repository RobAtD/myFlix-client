import PropTypes from 'prop-types';

export const MovieCard = ({movie, onMovieClick})=> {
    return (
        <div className='movie-card-container' onClick={()=> {
            onMovieClick(movie);
        }}>
            <img className='img-card' src={movie.image}/>
            <p><strong>{movie.title}</strong></p>
            <p>{movie.description}</p>
            <p>Genre: {movie.genre.Name}</p>
        </div>
    );
}

// defining all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired
        }),
        // featured: PropTypes.bool.isRequired
    })
}