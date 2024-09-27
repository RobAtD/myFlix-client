import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: 'Star Wars Episode 1: The Phantom Menace',
            description: 'The beginning of the legendary Sci-Fy saga.',
            genre: 'Sci-Fy',
            director: 'George Lucas',
            actors: ['Ewan McGregor', 'Liam Neeson'],
            releaseYear: 1999,
            image: 'https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg',
        },
        {
            id: 2,
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            description:
                'A young hobbit, Frodo, embarks on a quest to destroy the One Ring.',
            genre: 'Fantasy',
            director: 'Peter Jackson',
            actors: ['Elijah Wood', 'Ian McKellen', 'Viggo Mortensen'],
            releaseYear: 2001,
            image: 'https://upload.wikimedia.org/wikipedia/en/f/fb/Lord_Rings_Fellowship_Ring.jpg',
        },
        {
            id: 3,
            title: 'Goodfellas',
            description:
                'The rise and fall of a mob associate and his associates in the criminal underworld.',
            genre: 'Thriller',
            director: 'Martin Scorsese',
            actors: ['Robert De Niro', 'Ray Liotta'],
            releaseYear: 1990,
            image: 'https://upload.wikimedia.org/wikipedia/en/7/7b/Goodfellas.jpg',
        },
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView
                movie={selectedMovie}
                onBackClick={() => {
                    setSelectedMovie(null);
                }}
            />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    } else {
        return (
            <div>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                    />
                ))}
            </div>
        );
    }
};
