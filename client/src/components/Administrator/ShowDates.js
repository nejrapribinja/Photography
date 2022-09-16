import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Table } from "react-bootstrap";
import AdminHome from './Home';
import { MdEventAvailable, MdEvent } from 'react-icons/md';

const ShowDates = () => {
    const [termini, setTermini] = useState([])
    const [zavrseniTermini, setZavrseniTermini] = useState([])

    const getTermini = async () => {
        try {
            const response = await fetch("/admin/getTermini", {
                headers: { 'token': localStorage.getItem("token") }
            })
            const jsonData = await response.json()

            setTermini(jsonData)
            //console.log(jsonData)

        } catch (err) {
            console.log(err)
        }
    }

    const getZavrseniTermini = async () => {
        try {
            const response = await fetch("/admin/getZavrseniTermini", {
                headers: { 'token': localStorage.getItem("token") }
            })
            const jsonData = await response.json()

            setZavrseniTermini(jsonData)
            //console.log(jsonData)

        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getTermini()
        getZavrseniTermini()
    }, [])

    return (
        <Container fluid className="login" style={{ paddingRight: '0', paddingLeft: '0', color: 'white', display: 'flex', width: '100vw' }}>
            <AdminHome />
            <Container>
                <Row className='d-flex justify-content-center text-center'>
                    <Col md={9} style={{ margin: '30px' }}>
                        <h3>Rezervisani termini <MdEvent /></h3>
                        <Table hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Ime</th>
                                    <th>Prezime</th>
                                    <th>Email</th>
                                    <th>Broj</th>
                                    <th>Datum</th>
                                    <th>Događaj</th>
                                </tr>
                            </thead>
                            <tbody>
                                {termini.map((termin) => {
                                    return (
                                        <tr key={termin.id}>
                                            <td>{termin.ime}</td>
                                            <td>{termin.prezime}</td>
                                            <td>{termin.email}</td>
                                            <td>{termin.broj}</td>
                                            <td>{termin.dat}</td>
                                            <td>{termin.naziv}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Row className='d-flex justify-content-center text-center'>
                    <Col md={9} style={{ margin: '30px' }}>
                        <h3>Završeni termini <MdEventAvailable /></h3>
                        <Table hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Ime</th>
                                    <th>Prezime</th>
                                    <th>Email</th>
                                    <th>Broj</th>
                                    <th>Datum</th>
                                    <th>Događaj</th>
                                </tr>
                            </thead>
                            <tbody>
                                {zavrseniTermini.map((termin) => {
                                    return (
                                        <tr key={termin.id}>
                                            <td>{termin.ime}</td>
                                            <td>{termin.prezime}</td>
                                            <td>{termin.email}</td>
                                            <td>{termin.broj}</td>
                                            <td>{termin.dat}</td>
                                            <td>{termin.naziv}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </Container >
    )
};

export default ShowDates;
