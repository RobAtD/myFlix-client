import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user';

export const FavoriteButton = ({ token, movie }) => {
    const user = useSelector((state)=> state.user);
    const dispatch = useDispatch();
    const [buttonText, setButtonText] = useState(
        user.FavoriteMovies.includes(movie.id)
            ? 'Remove from Favorites'
            : 'Add to Favorites'
    );

    // Handle adding or removing movies to favorites
    const handleAdd = () => {
        let localMovies = [...user.FavoriteMovies];

        if (!user.FavoriteMovies.includes(movie.id)) {
            localMovies.push(movie.id);
        } else {
            const removeFavorite = localMovies.findIndex((m) => m === movie.id);
            localMovies.splice(removeFavorite, 1);
        }

        const data = {
            FavoriteMovies: localMovies,
        };

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
                dispatch(setUser({...user, FavoriteMovies: localMovies}));
                if (!localMovies.includes(movie.id)) {
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
