import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import { AiOutlineKey, AiOutlineUser } from "react-icons/ai";

const Login = () => {
    const navigate = useNavigate()
    const [korisnicko_ime, setIme] = useState('')
    const [lozinka, setLozinka] = useState('')

    const prijaviSe = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/prijaviSe", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ korisnicko_ime, lozinka }),
            })

            const parse = await response.json();
            localStorage.setItem('token', parse.token)
            localStorage.setItem('isAuth', 'true')
            navigate('/showDates');
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Container fluid className="login" >
            <Container >
                <img src={logo} style={{ width: '100px' }} onClick={() => navigate('/')} className="logo" />

                <Row className="d-flex justify-content-center align-items-center text-center red">
                    <Col md={4}>
                        <div>
                            <Form onSubmit={prijaviSe}>
                                <Form.Group className="mb-3">
                                    <InputGroup>
                                        <InputGroup.Text><AiOutlineUser /></InputGroup.Text>
                                        <FormControl id="inlineFormInputGroupUsername"
                                            type="text"
                                            placeholder="Unesite korisničko ime"
                                            name='korisnicko_ime'
                                            value={korisnicko_ime}
                                            onChange={e => setIme(e.target.value)} />
                                    </InputGroup>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <InputGroup>
                                        <InputGroup.Text><AiOutlineKey /></InputGroup.Text>
                                        <FormControl id="inlineFormInputGroupUsername"
                                            type='password'
                                            placeholder='Unesite lozinku'
                                            name='lozinka'
                                            value={lozinka}
                                            onChange={e => setLozinka(e.target.value)} />
                                    </InputGroup>
                                </Form.Group>
                                <Button className='btn' variant="outline-light" type='submit'>Prijavi se</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    )

};

export default Login;
