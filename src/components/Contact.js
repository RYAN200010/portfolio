import React from 'react'
import { useState } from 'react'
import { Col } from 'react-bootstrap';
import { Phone } from 'react-bootstrap-icons'
import contactImg from "../assets/img/contact-img.svg";
import { Container, Row } from 'react-bootstrap';

export default function Contact() {
    const formInitialDetails = {
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        phone: "",
    }

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState("Send");
    const [status, setStatus] = useState({});

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText("Sending...");
        let response = await fetch("https://localhost:5000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDetails),
        });
        setButtonText("Send");
        let result = response.json();
        setFormDetails(formInitialDetails);
        if (result.code === 200) {
            setStatus({
                success: true,
                message: "Message sent successfully",
            });
        }
        else {
            setStatus({
                success: false,
                message: "Message failed to send",
            });
        }
    };


    return (
        <section className='contact' id='connect'>
            <Container>
                <Row className='align-items-center'>
                    <Col md={6}>
                        <img src={contactImg} alt='Contact us'></img>
                    </Col>
                    <Col md={6}>
                        <h2>Get in touch</h2>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col sm={6} className='px-1'>
                                    <input type='text' value={formDetails.firstName} placeholder='First Name' onChange={(e) => onFormUpdate('firstName', e.target.value)}></input>
                                </Col>
                                <Col sm={6} className='px-1'>
                                    <input type='text' value={formDetails.lastName} placeholder='Last Name' onChange={(e) => onFormUpdate('lastName', e.target.value)}></input>
                                </Col>
                                <Col sm={6} className='px-1'>
                                    <input type='email' value={formDetails.email} placeholder='Email' onChange={(e) => onFormUpdate('email', e.target.value)}></input>
                                </Col>
                                <Col sm={6} className='px-1'>
                                    <input type='tel' value={formDetails.phone} placeholder='Phone' onChange={(e) => onFormUpdate('phone', e.target.value)}></input>
                                </Col>
                                <Col>
                                    <textarea rows='6' value={formDetails.message} placeholder='Message' onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
                                    <button type='submit'><span>{buttonText}</span></button>
                                </Col>
                                {
                                    status.message &&
                                    <Col>
                                        <p className={status.success === false ? 'danger' : 'success'}>{status.message}</p>
                                    </Col>
                                }
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
