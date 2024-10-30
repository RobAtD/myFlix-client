import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

export const AddFavorite = ({ user, token, movie }) => {
    const [favoriteMovies, setFavoriteMovies] = useState(user.FavoriteMovies);
    const [buttonText, setButtonText] = useState(
        user.FavoriteMovies.includes(movie.id)
            ? 'Remove from Favorites'
            : 'Add to Favorites'
    );

    const handleAdd = () => {
        const data = {
            FavoriteMovies: favoriteMovies,
        };

        const addFavorites = () => {
            user.FavoriteMovies.push(movie.id);
            return user.FavoriteMovies;
        };

        const removeFavorites = () => {
            const removeFavorite = user.FavoriteMovies.findIndex(
                (m) => m === movie.id
            );
            user.FavoriteMovies.splice(removeFavorite, 1);
            return user.FavoriteMovies;
        };

        if (!user.FavoriteMovies.includes(movie.id)) {
            setFavoriteMovies(() => addFavorites());
            console.log(user.FavoriteMovies);
            //alert('Added to Favorites');
        } else {
            setFavoriteMovies(() => removeFavorites());
            console.log(user.FavoriteMovies);
            //alert('Removed from Favorites');
        }

        fetch(
            `https://robs-movie-api-981dce4af120.herokuapp.com/users/${encodeURIComponent(
                user.Username
            )}`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        ).then((response) => {
            if (response.ok) {
                console.log('Update successfull');
                if (!user.FavoriteMovies.includes(movie.id)) {
                    setButtonText('Add to Favorites');
                } else {
                    setButtonText('Remove from Favorites');
                }
            } else {
                console.log('Update failed');
            }
        });
    };

    return (
        <Button onClick={handleAdd} variant="primary" className="w-100 mt-auto">
            {buttonText}
        </Button>
    );
};
