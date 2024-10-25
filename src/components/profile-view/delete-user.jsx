import { Button } from 'react-bootstrap';

export const DeleteUser = ({ user, token }) => {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete your profile?') === true) {
            console.log('Confirmed');
            fetch(
                `https://robs-movie-api-981dce4af120.herokuapp.com/users/${encodeURIComponent(
                    user.Username
                )}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                    },
                }
            ).then((response) => {
                if (response.ok) {
                    alert('Profile successful deleted');
                    window.location.reload();
                } else {
                    alert('Failed to delete profile');
                }
            });
        } else {
            console.log('Aborted');
        }
    };

    return (
        <>
            <h2>Delete Profile</h2>
            <p>
                If you're not interested in having a profile for myFlix you can
                delete your profile pressing the button below:
            </p>
            <Button onClick={handleDelete}>Delete</Button>
        </>
    );
};
