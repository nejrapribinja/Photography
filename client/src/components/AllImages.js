import { useEffect, useState } from "react";
import { Container, Button, ButtonGroup, Row } from "react-bootstrap";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";

const AllImages = () => {
  const [slike, setSlike] = useState([])
  const [slikeBaza, setSlikeBaza] = useState([])
  const [kategorije, setKategorije] = useState([])
  const navigate = useNavigate()

  function importAll(r) {
    let images = [];
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const filterItems = async (id) => {
    try {
      const response = await fetch(`/korisnik/getSlike/${id}`)
      const jsonData = await response.json()

      setSlikeBaza(jsonData)
      console.log(jsonData)

    } catch (err) {
      console.log(err)
    }
  };

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

  useEffect(() => {
    getKategorije();
    const images = importAll(require.context(`../images/uploadedImages`, false, /\.(png|jpe?g|svg|JPG)$/));
    setSlike(images)
    //console.log(images);
    filterItems(2);
  }, [])


  const [model, setModel] = useState(false)
  const [tempImgSrc, setTempImgSrc] = useState('')

  const getImg = (imgSrc) => {
    setTempImgSrc(imgSrc)
    setModel(true)
  }

  return (
    <Container fluid className="allimg">
      <Container >
        <img src={logo} style={{ width: '100px' }} onClick={() => navigate('/')} className="logo" />
        <Row className="d-flex justify-content-center text-center">
          <ButtonGroup aria-label="Basic example">
            {kategorije.map((kategorija) => {
              const { naziv, id } = kategorija
              return <Button onClick={() => filterItems(id)}>{naziv}</Button>
            })}
          </ButtonGroup>
        </Row>

        <Row className="d-flex justify-content-start">
          <div className={model ? "model open" : "model"}>
            <img src={tempImgSrc} />
            <MdOutlineClose onClick={() => setModel(false)} />
          </div>
          <div className="galleryimg">
            {slikeBaza.map((s) => {
              const { slika, id } = s
              return <div className="pics" onClick={() => getImg(slike[slika])}>
                <img src={slike[slika]} style={{ width: '100%' }} />
              </div>
            })}
          </div>
        </Row>
      </Container>
    </Container>
  );
}

export default AllImages;