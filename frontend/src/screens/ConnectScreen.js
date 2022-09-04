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
        <Col xs={12}>
          <h1>Comments</h1>
        </Col>
        {userInfo ? (
          <Form onSubmit={(e) => postComment(e)}>
            <Form.Group controlId='comment'>
              <Form.Control
                as='textarea'
                placeholder='Write comment here...'
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button>Post Comment</Button>
          </Form>
        ) : (
          <h1>Log in to post something to the message board</h1>
        )}
        {comments.map((comment) => {
          return (
            <Col xs={12} key={comment._id}>
              <Card style={{ width: "90%" }}>
                <Card.Body>
                  <Card.Title>{comment.user.username} says:</Card.Title>
                  <Card.Text>{comment.comment}</Card.Text>{" "}
                  <Card.Subtitle className='mb-2 text-muted'>
                    Posted on{" "}
                    <Moment format='MM/DD/YYYY'>{comment.createdAt}</Moment>
                  </Card.Subtitle>
                  <Card.Link href='#'>Edit</Card.Link>
                  <Card.Link href='#'>Delete</Card.Link>

                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default ConnectScreen;
