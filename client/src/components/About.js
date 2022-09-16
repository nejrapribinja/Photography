import { Container, Card, Col, Row } from "react-bootstrap";
import five from '../images/5.jpg';
import six from '../images/6.jpg';

const About = () => {
    return (
        <Container fluid className="about" id="oNama">
            <Container className="text-center" style={{ paddingBottom: "50px" }}>
                <h1>O nama</h1>

                <Row className="d-flex justify-content-center">
                    <Col md={4} className="d-flex align-items-center">
                        <p className="ponuda"> Pogledajte našu ponudu, sve usluge i pakete koje nudimo, kao i cjenovnik na sljedećem
                            <a href="https://docdro.id/55as9Er" target='_blank'> linku. </a>
                        </p>
                    </Col>

                    <Col md={4} className="d-flex justify-content-center">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={six} />
                            <Card.Body>
                                <Card.Title>Pribinja Amir</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4} className="d-flex justify-content-center">
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={five} />
                            <Card.Body>
                                <Card.Title>Pribinja Nejra</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default About;