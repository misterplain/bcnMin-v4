import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { fetchComments } from "../actions/commentsActions";

const ConnectScreen = () => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const commentsList = useSelector((state) => state.comments);
  const { loading, error, comments } = commentsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const postComment = async (e) => {
    e.preventDefault();

    const newComment = {
      comment: comment,
      user: userInfo.name,
    };
    await axios
      .post(`http://localhost:5000/api/comments`, newComment)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    dispatch(fetchComments());
    setComment("");
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} className='page-title mb-3'>
          chat with your community
        </Col>
      </Row>
      <Row className='justify-content-center mb-4'>
        <Col sm={12} md={10} lg={8}>
          {userInfo ? (
            <Form
              onSubmit={(e) => postComment(e)}
              style={{ width: "95%" }}
              className='text-center'
            >
              <Form.Group controlId='comment'>
                <Form.Control
                  as='textarea'
                  placeholder='Write comment here...'
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button variant='outline-success' className='mt-3'>
                Post Comment
              </Button>
            </Form>
          ) : (
            <h1>Log in to post something to the message board</h1>
          )}
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col sm={12} md={10} lg={8}>
          {comments &&
            comments.map((comment) => {
              return (
                <Col key={comment._id} className="mb-2">
                  <Card style={{ width: "100%" }}>
                    <Card.Body>
                      <Card.Title>{comment.user.username} says:</Card.Title>
                      <Card.Text>
                        <h2>{comment.comment}</h2>
                      </Card.Text>{" "}
                      <Card.Subtitle className='mb-2 text-muted'>
                        <h6>Posted on: 
                          <Moment format='MM/DD/YYYY'>
                            {comment.createdAt}
                          </Moment>
                        </h6>

                      </Card.Subtitle>
                      {/* <Card.Link href='#'>Edit</Card.Link>
                      <Card.Link href='#'>Delete</Card.Link> */}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Col>
      </Row>
    </Container>
  );
};

export default ConnectScreen;
