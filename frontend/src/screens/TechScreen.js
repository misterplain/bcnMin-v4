import React, { useState } from "react";
import { TOOLS } from "../shared/tools";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import { useFormik } from "formik";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const tools = TOOLS;

console.log(tools);

const validationSchema = Yup.object({
  kilometers: Yup.number().typeError("Must be a number").required("Required"),
  fastFashion: Yup.number().typeError("Must be a number").required("Required"),
  flightHours: Yup.number().typeError("Must be a number").required("Required"),
  meat: Yup.number().typeError("Must be a number").required("Required"),
});

const TechScreen = () => {
  const [answer, setAnswer] = useState(0);

  const formik = useFormik({
    initialValues: {
      kilometers: "",
      fastFashion: "",
      flightHours: "",
      meat: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setAnswer(
        values.kilometers * 1.2 +
          values.fastFashion * 100.96 +
          values.flightHours * 24 +
          values.meat * 125
      );
      console.log(values);
      resetForm();
      handleOpen();
    },
  });

  function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //modal calculations
  let answerMonth = answer * 4;
  let answerYear = answer * 52;

  return (
    <Container className='justify-content-center text-center'>
      <Row className='justify-content-center mb-3'>
        <Col sm={12} className='page-title'>
          tech
        </Col>
        <Col sm={12} md={6} className='page-subtitle '>
          check in with your water footprint to see how you can reduce your
          impact
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col xs={10} sm={10} md={8} lg={8}>
          <Form
            onSubmit={formik.handleSubmit}
            style={{ padding: "40px", border: "2px solid green" }}
          >
            <Form.Group className='mb-3' controlId='kilometers'>
              <Form.Control
                type='text'
                placeholder='kilometers driven per week on average'
                value={formik.values.kilometers}
                onChange={formik.handleChange}
                style={{ width: "93%" }}
              />
              {formik.errors.kilometers && formik.touched.kilometers ? (
                <div className='form-error-text'>
                  {formik.errors.kilometers}
                </div>
              ) : null}
            </Form.Group>
            <Form.Group className='mb-3' controlId='fastFashion'>
              <Form.Control
                type='text'
                placeholder='fast fashion items purchased per month on average'
                value={formik.values.fastFashion}
                onChange={formik.handleChange}
                style={{ width: "93%" }}
              />
              {formik.errors.fastFashion && formik.touched.fastFashion ? (
                <div className='form-error-text'>
                  {formik.errors.fastFashion}
                </div>
              ) : null}
            </Form.Group>
            <Form.Group className='mb-3' controlId='flightHours'>
              <Form.Control
                type='text'
                placeholder='flight hours over the course of a year'
                value={formik.values.flightHours}
                onChange={formik.handleChange}
                style={{ width: "93%" }}
              />
              {formik.errors.flightHours && formik.touched.flightHours ? (
                <div className='form-error-text'>
                  {formik.errors.flightHours}
                </div>
              ) : null}
            </Form.Group>
            <Form.Group className='mb-3' controlId='meat'>
              <Form.Control
                type='text'
                placeholder='servings of meat consumed per week'
                value={formik.values.meat}
                onChange={formik.handleChange}
                style={{ width: "93%" }}
              />{" "}
              {formik.errors.meat && formik.touched.meat ? (
                <div className='form-error-text'>{formik.errors.meat}</div>
              ) : null}
            </Form.Group>

            <Button variant='outline-success' type='submit'>
              check footprint
            </Button>
          </Form>
        </Col>

        <Modal show={open} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Your water footprint</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {`Your weekly water footprint is ${numberWithCommas(
              answer
            )} gallons, which is ${numberWithCommas(answerMonth)} gallons over
            the course of a month and ${numberWithCommas(
              answerYear
            )} gallons over the course of a year`}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='outline-success' onClick={handleClose}>
              try again
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
      <Row className='justify-content-center'>
        <Col sm={12} className='page-title mt-3 mb-2'>
          {" "}
          tools to help you minimize
        </Col>
        {tools.map((tool) => (
          <Col xs={12} sm={5} lg={3} xl={2} key={tool.id}>
            <a
              href={tool.src}
              target='__blank'
              style={{ textDecoration: "none" }}
            >
              <Card as='button' style={{ margin: "5px" }} className='tech-card'>
                <Card.Body>{tool.name}</Card.Body>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TechScreen;
