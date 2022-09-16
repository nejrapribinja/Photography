import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, FormControl, InputGroup, Row, Table } from "react-bootstrap";
import AdminHome from './Home';
import { AiOutlineKey, AiOutlineUser } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const AddAdmin = () => {
    const [korisnicko_ime, setKorisnickoIme] = useState('')
    const [lozinka, setLozinka] = useState('')
    const [admini, setAdmini] = useState([])
    const navigate = useNavigate()

    const getAdmini = async () => {
        try {
            const response = await fetch("/admin/getAdmin", {
                headers: { 'token': localStorage.getItem("token") }
            })
            const jsonData = await response.json()

            setAdmini(jsonData)
            //console.log(jsonData)

        } catch (err) {
            console.log(err)
        }
    }

    const dodajAdmina = async (e) => {
        e.preventDefault();
        try {
            await fetch("/admin/dodajAdmina", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem("token")
                },
                body: JSON.stringify({ korisnicko_ime, lozinka }),
            })
            await getAdmini();
            setKorisnickoIme('');
            setLozinka('')
        } catch (err) {
            console.error(err.message);
        }
    }

    const obrisiAdmina = async (id) => {
        try {
            await fetch(`admin/obrisiAdmina/${id}`, {
                method: 'DELETE',
                headers: { 'token': localStorage.getItem("token") }
            })

            setAdmini(admini.filter(admin => admin.id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getAdmini()
    }, [admini])

    return (
        <Container fluid className="login" style={{ paddingRight: '0', paddingLeft: '0', color: 'white', display: 'flex', width: '100vw' }}>
            <AdminHome />
            <Container>
                <Row className='d-flex justify-content-center text-center'>
                    <Col md={6} style={{ margin: '30px' }}>
                        <h3>Trenutni administratori</h3>
                        <Table hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Naziv</th>
                                    <th>Obriši administratora</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admini.map((admin) => {
                                    return (
                                        <tr key={admin.id}>
                                            <td>{admin.korisnicko_ime}</td>
                                            <td><Button onClick={() => obrisiAdmina(admin.id)}>Obriši</Button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row className='d-flex justify-content-center text-center'>
                    <Col md={6}>
                        <h3>Dodaj novog administratora</h3>
                        <Form onSubmit={dodajAdmina}>
                            <Form.Group className="mb-3">
                                <InputGroup>
                                    <InputGroup.Text><AiOutlineUser /></InputGroup.Text>
                                    <FormControl id="inlineFormInputGroupUsername"
                                        placeholder="Unesite email"
                                        name='korisnicko_ime'
                                        value={korisnicko_ime}
                                        onChange={e => setKorisnickoIme(e.target.value)} />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <InputGroup>
                                    <InputGroup.Text><AiOutlineKey /></InputGroup.Text>
                                    <FormControl id="inlineFormInputGroupUsername"
                                        type='password'
                                        placeholder="Unesite lozinku"
                                        name='lozinka'
                                        value={lozinka}
                                        onChange={e => setLozinka(e.target.value)} />
                                </InputGroup>
                            </Form.Group>
                            <Button className='btn' variant="outline-light" type='submit'>Dodaj</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
};

export default AddAdmin;
