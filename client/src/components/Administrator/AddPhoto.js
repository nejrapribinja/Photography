import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import AdminHome from './Home';
import ImageUploading from 'react-images-uploading';
import Swal from 'sweetalert2';

const AddPhoto = () => {
    let [images, setImages] = React.useState([]);
    const maxNumber = 10;

    const [kategorije, setKategorije] = useState([]);
    const [kategorija, setKategorija] = useState("");

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);

        setImages(imageList);
    };

    const uploadimages = () => {
        try {
            for (var a = 0; a < images.length; a++) {
                const fd = new FormData();
                //console.log(images[a])
                fd.append('image', images[a]['file']);

                fetch(`/admin/dodajSlike/${kategorija}`, {
                    method: 'POST',
                    headers: {'token': localStorage.getItem("token")},
                    body: fd
                }
                ).then(res => {
                    Swal.fire({
                        title: 'Slike su uspješno postavljene.',
                        text: "Thanks",
                        type: 'success',

                    });
                });
            }
        } catch (err) {
            console.error(err.message);
        }
    }

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
        getKategorije()
    }, [])

    return (
        <Container fluid className="login" style={{ paddingRight: '0', paddingLeft: '0', color: 'white', display: 'flex' }}>
            <AdminHome />
            <Container>
                <Row className='d-flex justify-content-center text-center' style={{ margin: '20px' }}>
                    <Col md={12}>
                        <Row className='d-flex justify-content-center' style={{ margin: '20px' }}>
                            <Col md={2}>
                                <h4>Događaj</h4>

                                <div class="form-check">
                                    {kategorije.map((k) => {
                                        return <>
                                            <input class="form-check-input" type="radio" name="kategorija" id={k.id} value={k.id} onChange={e => setKategorija(e.target.value)} required />
                                            <label class="form-check-label" for={k.id} >
                                                {k.naziv}
                                            </label><br />
                                        </>
                                    })}

                                </div>
                            </Col>
                        </Row>
                        <div>
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={onChange}
                                maxNumber={maxNumber}
                                dataURLKey="data_url"
                            >
                                {({
                                    imageList,
                                    onImageUpload,
                                    onImageRemoveAll,
                                    onImageUpdate,
                                    onImageRemove,
                                    isDragging,
                                    dragProps,
                                }) => (
                                    // write your building UI
                                    <div className="upload__image-wrapper" >
                                        <div className="mainbtndiv">
                                            <button className="btn btn-primary"
                                                style={isDragging ? { color: 'red' } : undefined}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                Click or Drop here
                                            </button>

                                            <button className="btn btn-danger" onClick={onImageRemoveAll}>Remove all images</button>
                                        </div>
                                        <Row style={{ margin: '20px' }}>
                                            <Col style={{ display: 'flex', overflow: 'hidden' }} md={12}>
                                                {imageList.map((image, index) => (
                                                    <div key={index} className="image-item mt-5 mb-5 mr-5" >
                                                        <img src={image['data_url']} style={{ width: '80px' }} />
                                                        <div className="image-item__btn-wrapper">
                                                            <button className="btn btn-primary" onClick={() => onImageUpdate(index)}>Update</button>
                                                            <button className="btn btn-danger" onClick={() => onImageRemove(index)}>Remove</button>
                                                        </div>
                                                    </div>
                                                ))}</Col>
                                        </Row>
                                    </div>
                                )}
                            </ImageUploading>
                        </div>
                        <button className="btn btn-primary" onClick={() => uploadimages()}>Submit Images</button>

                    </Col>
                </Row>
            </Container>


        </Container >
    )


};

export default AddPhoto;
