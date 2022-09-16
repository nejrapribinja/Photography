import { useState, useEffect } from "react";
import { Container, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from '../images/logo.png';

const DateForm = () => {
  const navigate = useNavigate()
  const [kategorije, setKategorije] = useState([])
  const [ime, setIme] = useState("")
  const [prezime, setPrezime] = useState("")
  const [email, setEmail] = useState("")
  const [broj, setBroj] = useState("")
  const [datum, setDatum] = useState("")
  const [kategorija, setKategorija] = useState("")
  const [success, setSuccess] = useState('')
  const [error, setError] = useState(null)

  const getKategorije = async () => {
    try {
      const response = await fetch("/korisnik/getKategorije")
      const jsonData = await response.json()

      setKategorije(jsonData)
      //console.log(jsonData)

    } catch (err) {
      console.log(err)
    }
  }

  const rezervisi = (e) => {
    e.preventDefault();
    fetch("/korisnik/rezervisiDatum", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ime, prezime, email, broj, datum, kategorija }),
    })
      .then(response => {
        console.log(response)
        if (!response.ok) {
          throw Error("Datum koji ste odabrali je već rezervisan!")
        }
        else {
          setError(null)
          setSuccess("Uspješno ste rezervisali datum, javit ćemo Vam se u skorijem vremenu!")
          setIme('')
          setPrezime('')
          setBroj('')
          setEmail('')
          setKategorija('')
          setDatum('')
          setTimeout(() => {
            navigate('/')
          }, 5000);
        }
        return response.text();

      })
      .catch((err) => {
        setError(err.message)
      })
  }

  useEffect(() => {
    getKategorije()
  }, [])

  return (
    <Container fluid className="form">
      <Container >
        <img src={logo} style={{ width: '100px' }} onClick={() => navigate('/')} className="logo" />
        <Row className="d-flex justify-content-center text-center">
          <h2>Rezervišite Vaš datum da zabilježimo najljepše uspomene Vašeg života.</h2>
        </Row>
        <Row className="d-flex justify-content-center text-center" style={{ paddingBottom: '20px' }}>
          {error && <div className="error">{error}</div>}
          {success && <div className="error">{success}</div>}
        </Row>
        <Form onSubmit={rezervisi}>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Ime</Form.Label>
              <Form.Control type="text"
                placeholder="Unesite ime"
                name="ime"
                required
                value={ime}
                onChange={e => setIme(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Prezime</Form.Label>
              <Form.Control type="text"
                placeholder="Unesite prezime"
                name="prezime"
                required
                value={prezime}
                onChange={e => setPrezime(e.target.value)} />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email"
                placeholder="Unesite email"
                name="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Broj telefona</Form.Label>
              <Form.Control type="text"
                placeholder="Unesite broj"
                name="broj"
                required
                value={broj}
                onChange={e => setBroj(e.target.value)} />
            </Form.Group>
          </Row>

          <Form.Group as={Col}>
            <Form.Label>Događaj</Form.Label>

            <div class="form-check">
              {kategorije.map((k) => {
                return <>
                  <input class="form-check-input" type="radio" name="dogadjaj" id={k.id} value={k.id} onChange={e => setKategorija(e.target.value)} required />
                  <label class="form-check-label" for={k.id} >
                    {k.naziv}
                  </label><br />
                </>
              })}

            </div>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Datum</Form.Label>
            <Form.Control type="date"
              placeholder="Unesite broj"
              name="datum"
              required
              value={datum}
              onChange={e => setDatum(e.target.value)} />
          </Form.Group>

          <Row className="d-flex justify-content-center text-center">
            <Button variant="primary" type="submit" >
              Rezerviši
            </Button>
          </Row>

        </Form>
      </Container>
    </Container>
  );
}

export default DateForm;