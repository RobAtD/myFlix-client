import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const NavigationBar = ({ onLoggedOut }) => {
    const user = useSelector((state) => state.user);

    return (
        <Navbar bg="primary" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    myFlix
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to={`/users/${encodeURIComponent(
                                        user.Username
                                    )}`}
                                >
                                    Profile
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
