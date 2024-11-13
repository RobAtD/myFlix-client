import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const UserInfo = () => {
    const user = useSelector((state) => state.user);
    return (
        <>
            <h2>{user.Username}'s Profile Information</h2>
            <ListGroup>
                <ListGroup.Item>Name: {user.Username}</ListGroup.Item>
                <ListGroup.Item>Email: {user.Email}</ListGroup.Item>
                <ListGroup.Item>
                    Birthday:
                    {user.Birthday
                        ? new Date(user.Birthday).toISOString().slice(0, 10)
                        : 'No birthday'}
                </ListGroup.Item>
            </ListGroup>
        </>
    );
};
