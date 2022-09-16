import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Reservation = () => {
  const navigate = useNavigate()

  return (
    <Container fluid className="reservation" id="rezervacije">
      <Container>
        <h1 style={{ paddingTop: '150px' }}>Rezervišite Vaš datum da zabilježimo najljepše uspomene Vašeg života.</h1>
        <Button onClick={() => navigate('/dateForm')}>Rezerviši</Button>
      </Container>
    </Container>
  );
}

export default Reservation;