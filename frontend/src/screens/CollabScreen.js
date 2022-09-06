import React, { useState } from "react";
import { COLLAB } from "../shared/collab";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const collab = COLLAB;

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Your name should have more than 3 characters")
    .required("Required"),
  phoneNum: Yup.string()
    .min(
      9,
      "Phone number should have more than 3 characters, please include country code"
    )
    .required("Required"),
  email: Yup.string().min(3, "Too short").required("Required"),
  message: Yup.string()
    .min(2, "You can do better than that")
    .required("Required"),
});

const CollabScreen = () => {
  const [contact, setContact] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNum: "",
      email: "",
      message: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setContact({
        name: values.name,
        phoneNum: values.phoneNum,
        email: values.email,
        message: values.message,
      });
      console.log(values);
      resetForm();
    },
  });
  return (
    <Container className='justify-content-center text-center'>
      <Row>
        <Col sm={12} className='page-title mb-3'>
          Collab
        </Col>
      </Row>
      <Row className='justify-content-center mb-3'>
        <Col xs={10} sm={10} md={8} lg={8}>
          {" "}
          <Form
            onSubmit={formik.handleSubmit}
            style={{ padding: "40px", border: "2px solid green" }}
          >
            <Form.Group className='mb-3' controlId='name'>
              <Form.Control
                type='text'
                placeholder='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                style={{ width: "93%" }}
              />
              {formik.errors.name && formik.touched.name ? (
                <div className='form-error-text'>{formik.errors.name}</div>
              ) : null}
            </Form.Group>
            <Form.Group className='mb-3' controlId='phoneNum'>
              <Form.Control
                type='text'
                placeholder='phoneNum'
                value={formik.values.phoneNum}
                onChange={formik.handleChange}
                style={{ width: "93%" }}
              />
              {formik.errors.phoneNum && formik.touched.phoneNum ? (
                <div className='form-error-text'>{formik.errors.phoneNum}</div>
              ) : null}
            </Form.Group>
            <Form.Group className='mb-3' controlId='email'>
              <Form.Control
                type='text'
                placeholder='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                style={{ width: "93%" }}
              />
              {formik.errors.email && formik.touched.email ? (
                <div className='form-error-text'>{formik.errors.email}</div>
              ) : null}
            </Form.Group>
            <Form.Group className='mb-3' controlId='message'>
              <Form.Control
                as='textarea'
                rows={4}
                placeholder='message'
                value={formik.values.message}
                onChange={formik.handleChange}
                style={{ width: "93%" }}
              />{" "}
              {formik.errors.message && formik.touched.message ? (
                <div className='form-error-text'>{formik.errors.message}</div>
              ) : null}
            </Form.Group>

            <Button variant='primary' type='submit'>
              Send
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col xs={12} className="page-title mt-3 mb-3">
          a big thank you to all of our collaborators
        </Col>
        {collab.map((collab) => (
          <Col xs={12} sm={5} md={3} key={collab.id}>
            <a
              href={collab.src}
              target='__blank'
              style={{ textDecoration: "none", color: 'black' }}
            >
              <Card style={{ margin: "5px" }} className='tech-card'>
                <Card.Body>
                  {collab.name}
                </Card.Body>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CollabScreen;
