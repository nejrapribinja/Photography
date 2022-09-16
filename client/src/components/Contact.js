import { Container } from "react-bootstrap";
import { AiOutlineMail, AiFillInstagram } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { BsChevronDoubleUp } from "react-icons/bs";
import { ImLocation } from 'react-icons/im';

const Contact = () => {
  return (
    <Container fluid className="contact" id="kontakt">
      <Container style={{ padding: '50px' }}>
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col">
            <p>
              <a href="mailto: amir_888@live.com"><AiOutlineMail /> amir_888@live.com</a>
              <br /><a href="tel: 0603281566"><FaPhoneAlt /> 061/580-859</a>
              <br /><ImLocation /> Konjic, Sarajevo
            </p>
          </div>

          <div class="col text-center">
            <p>
              <a href="https://www.instagram.com/pribinja_photo/" target='_blank' style={{ fontSize: '30px' }}>
                <AiFillInstagram /> pribinja_photo
              </a>
            </p>
          </div>

          <div class="col text-end">
            <a href="#pocetnaStrana"><BsChevronDoubleUp style={{ fontSize: '40px' }} /></a>
          </div>
        </div>

        <div class="row d-flex justify-content-center text-center">
          © Nejra2022
        </div>
      </Container>
    </Container>
  );
}

export default Contact;