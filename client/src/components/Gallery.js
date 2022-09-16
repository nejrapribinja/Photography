import { Container } from "react-bootstrap";
import twelve from '../images/12.jpeg';
import thirteen from '../images/13.jpg';
import fourteen from '../images/14.jpg';
import { useNavigate } from "react-router-dom";

const Gallery = () => {
  const navigate = useNavigate()

  return (
    <Container fluid className="gallery" id="galerija">
      <Container style={{ padding: '50px' }}>
        <h1>Galerija</h1>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col">
            <div class="card text-center" onClick={() => navigate('/allImages')}>
              <img src={thirteen} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Vjenčanja</h5>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card text-center" onClick={() => navigate('/allImages')}>
              <img src={fourteen} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Rođendani</h5>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card text-center" onClick={() => navigate('/allImages')}>
              <img src={twelve} class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Fotošutinzi</h5>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Container>
  );
}

export default Gallery;