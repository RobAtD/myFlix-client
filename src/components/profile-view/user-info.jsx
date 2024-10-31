import { ListGroup } from 'react-bootstrap';

export const UserInfo = ({ user }) => {
    return (
        <>
            <h2>{user.Username}'s Profile Information</h2>
            <ListGroup>
                <ListGroup.Item>Name: {user.Username}</ListGroup.Item>
                <ListGroup.Item>Email: {user.Email}</ListGroup.Item>
                <ListGroup.Item>Birthday: {user.Birthday}</ListGroup.Item>
            </ListGroup>
        </>
    );
};
