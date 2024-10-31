import { Container, Row, Col, Card } from 'react-bootstrap';
import { UserInfo } from './user-info';
import { UpdateUser } from './update-user';
import { DeleteUser } from './delete-user';
import { FavoriteMovies } from './favorite-movies';

export const ProfileView = ({ users, token, movies }) => {
    return (
        <Container>
            <Row>
                <Col xs={12} sm={4}>
                    <Card className="h-100">
                        <Card.Body>
                            <UserInfo user={users} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={8}>
                    <Card>
                        <Card.Body>
                            <UpdateUser user={users} token={token} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col className='gy-4'>
                    <Card>
                        <Card.Body>
                            <DeleteUser user={users} token={token} />
                        </Card.Body>
                    </Card>
                </Col>
                <Row className='gy-4'>
                        <h2>Favorite Movies</h2>
                        <FavoriteMovies user={users} token={token} movies={movies} />
                </Row>
            </Row>
        </Container>
    );
};
