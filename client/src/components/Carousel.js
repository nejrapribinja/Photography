
import Carousel from 'react-bootstrap/Carousel';
import one from '../images/1.jpg';
import two from '../images/9.jpg';
import three from '../images/15.jpg';
import four from '../images/10.jpg';

function CarouselFadeExample() {
  return (
    <Carousel fade id="pocetnaStrana">
      <Carousel.Item interval={1500} >
        <img
          className="d-block w-100"
          src={three}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img
          className="d-block w-100"
          src={two}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img
          className="d-block w-100"
          src={one}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img
          className="d-block w-100"
          src={four}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFadeExample;