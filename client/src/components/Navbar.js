import React, { useState } from 'react';
import { Container, Navbar, Nav } from "react-bootstrap";
import logo from '../images/logo.png';
import { RiAdminLine } from 'react-icons/ri';

const PocetnaNav = () => {
    const [color, setColor] = useState(false)
    const changeColor = () => {
        if (window.scrollY >= 100) {
            setColor(true)
        } else {
            setColor(false)
        }
    }

    window.addEventListener('scroll', changeColor)

    return (
        <Navbar collapseOnSelect expand="lg" className='fixed-top'>
            <Container className={color ? 'navbar-bg' : 'navbar'}>
                <Navbar.Brand href="#pocetnaStrana">
                    <img src={logo} style={{ width: '100px' }} /></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">

                        <Nav.Link style={{ color: 'white' }} href="#oNama">O nama</Nav.Link>

                        <Nav.Link style={{ color: 'white' }} href="#galerija">Galerija</Nav.Link>

                        <Nav.Link style={{ color: 'white' }} href="#rezervacije">Rezerviši svoj datum</Nav.Link>

                        <Nav.Link style={{ color: 'white' }} href="#kontakt">Kontakt</Nav.Link>

                    </Nav>
                    <Nav>
                        <Nav.Link style={{ color: 'white' }} href="/login">Administrator <RiAdminLine /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default PocetnaNav;
