import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';

export const UpdateUser = ({ token }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const user = useSelector((state) => state.user);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
        };

        // Filter key values, that hadn't been changed so that only new values will be canged through PUT
        let newData = Object.keys(data)
            .filter((k) => data[k] != '')
            .reduce((a, k) => ({ ...a, [k]: data[k] }), {});

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
                body: JSON.stringify(newData),
            }
        ).then((response) => {
            if (response.ok) {
                alert('Update successfull');
            } else {
                alert('Update failed');
            }
        });
    };

    return (
        <>
            <h2>Update Information</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Change Username:</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        minLength="5"
                    />
                </Form.Group>
                <Form.Group controlId="formEmail">
                    <Form.Label>Change Email:</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group controlId="formBirthday">
                    <Form.Label>Change Birthday:</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Change your birthday"
                        value={birthday}
                        onChange={(e) => {
                            setBirthday(e.target.value);
                        }}
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Change Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
};
