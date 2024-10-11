import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const SignupView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
        };

        fetch(
            'https://robs-movie-api-981dce4af120.herokuapp.com/users/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        )
        .then((response)=> {
            if(response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder='Enter username'
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    minLength="5"
                    required
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    placeholder='Enter email address'
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    required
                />
            </Form.Group>
            <Form.Group controlId='formPassword'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    placeholder='Password'
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">Signup</Button>
        </Form>
    );
};
