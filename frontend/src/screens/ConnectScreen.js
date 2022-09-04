import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import {  useLocation } from "react-router-dom";

import { Container, Row, Col, Card } from "react-bootstrap";
import { fetchComments } from "../actions/commentsActions";

const ConnectScreen = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const location = useLocation();

  // const user = useSelector((state) => state.userLogin.userInfo);
  const commentsList = useSelector((state) => state.comments);
  const { loading, error, comments } = commentsList;

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  console.log(comments);

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>Comments</Col>{" "}
        {comments.map((comment) => {
          return (
            <Col xs={12} sn={12} md={6} lg={4}>
              <Card style={{ width: "80%" }}>
                <Card.Body>
                  <Card.Title>{comment.user.username} says:</Card.Title>
                  <Card.Text>{comment.comment}</Card.Text>{" "}
                  <Card.Subtitle className='mb-2 text-muted'>
                    Post on XXX{" "}
                  </Card.Subtitle>
                  <Card.Link href='#'>Edit</Card.Link>
                  <Card.Link href='#'>Delete</Card.Link>
                  <Card.Link href='#'>Reply</Card.Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      {/* <div>
        {comments.map((comment) => (
          <div>
            <h1>{comment.user.username}</h1>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div> */}
      ;
    </Container>
  );
};

export default ConnectScreen;
