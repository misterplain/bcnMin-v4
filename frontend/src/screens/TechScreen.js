import React, { useState } from "react";
import { TOOLS } from "../shared/tools";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const tools = TOOLS;

console.log(tools);

const validationSchema = Yup.object({
  kilometers: Yup.string().required(
    "Required. If none, impressive, you may set to 0"
  ),
  fastFashion: Yup.string().required(
    "Required. If none, impressive, you may set to 0"
  ),
  flightHours: Yup.string().required(
    "Required. If none, impressive, you may set to 0"
  ),
  meat: Yup.string().required(
    "Required. If none, impressive, you may set to 0"
  ),
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
    },
  });

  let answerMonth = answer * 4;
  let answerYear = answer * 52;
  return (
    <Container className="justify-content-center text-center">
      <Row>
        <Col sm={12}>Tech</Col>
      </Row>
      <Row>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className='mb-3' controlId='kilometers'>
            <Form.Control
              type='text'
              placeholder='kilometers driven per week on average'
              value={formik.values.kilometers}
              onChange={formik.handleChange}
            />
            {formik.errors.kilometers && formik.touched.kilometers ? (
              <div className=''>{formik.errors.kilometers}</div>
            ) : null}
          </Form.Group>
          <Form.Group className='mb-3' controlId='fastFashion'>
            <Form.Control
              type='text'
              placeholder='fast fashion items purchased per month on average'
              value={formik.values.fastFashion}
              onChange={formik.handleChange}
            />
            {formik.errors.fastFashion && formik.touched.fastFashion ? (
              <div className=''>{formik.errors.fastFashion}</div>
            ) : null}
          </Form.Group>
          <Form.Group className='mb-3' controlId='flightHours'>
            <Form.Control
              type='text'
              placeholder='flight hours over the course of a year'
              value={formik.values.flightHours}
              onChange={formik.handleChange}
            />
            {formik.errors.flightHours && formik.touched.flightHours ? (
              <div className=''>{formik.errors.flightHours}</div>
            ) : null}
          </Form.Group>
          <Form.Group className='mb-3' controlId='meat'>
            <Form.Control
              type='text'
              placeholder='servings of meat consumed per week'
              value={formik.values.meat}
              onChange={formik.handleChange}
            />
          </Form.Group>
          {formik.errors.meat && formik.touched.meat ? (
            <div className=''>{formik.errors.meat}</div>
          ) : null}

          <Button variant='primary' type='submit'>
            Check Footprint
          </Button>
        </Form>
      </Row>
      <Row>
        <Col sm={12}> tools to help you minimize</Col>
        {tools.map((tool) => (
          <Col xs={12} sm={6}  key={tool.id}>
            <Card>
              <Card.Body>
                {tool.name}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TechScreen;
