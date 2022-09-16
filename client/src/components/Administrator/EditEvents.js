import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, FormControl, InputGroup, Row, Table } from "react-bootstrap";
import AdminHome from './Home';
import { BiCategoryAlt } from "react-icons/bi";

const EditEvents = () => {
    const [kategorije, setKategorije] = useState([])
    const [naziv, setNaziv] = useState('')

    const getKategorije = async () => {
        try {
            const response = await fetch("/korisnik/getKategorije", {
                headers: { 'token': localStorage.getItem("token") }
            })
            const jsonData = await response.json()

            setKategorije(jsonData)
            //console.log(jsonData)

        } catch (err) {
            console.log(err)
        }
    }

    const dodajKategoriju = async (e) => {
        e.preventDefault();
        try {
            await fetch("/admin/dodajKategoriju", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    headers: { 'token': localStorage.getItem("token") }
                },
                body: JSON.stringify({ naziv }),
            })
            await getKategorije();
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getKategorije()
    }, [kategorije])

    return (
        <Container fluid className="login" style={{ paddingRight: '0', paddingLeft: '0', color: 'white', display: 'flex' }}>
            <AdminHome />
            <Container>
                <Row className='d-flex justify-content-center text-center'>
                    <Col md={6} style={{ margin: '30px' }}>
                        <h3>Trenutne kategorije</h3>
                        <Table hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Naziv</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kategorije.map((kategorija) => {
                                    return (
                                        <tr key={kategorija.id}>
                                            <td>{kategorija.naziv}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row className='d-flex justify-content-center text-center'>
                    <Col md={6} style={{ margin: '20px' }}>
                        <h3>Dodaj novu kategoriju</h3>
                        <Form onSubmit={dodajKategoriju}>
                            <Form.Group className="mb-3">
                                <InputGroup>
                                    <InputGroup.Text><BiCategoryAlt /></InputGroup.Text>
                                    <FormControl id="inlineFormInputGroupUsername"
                                        placeholder="Unesite naziv"
                                        name='naziv'
                                        value={naziv}
                                        onChange={e => setNaziv(e.target.value)} />
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

export default EditEvents;
