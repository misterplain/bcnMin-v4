import React, { useEffect } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogPosts } from "../actions/blogActions";

const InformScreen = () => {
  const dispatch = useDispatch();

  const blogs = useSelector((state) => state.blogPosts);
  const { loading, error, posts } = blogs;

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, []);

  console.log(posts);

  return (
    <>
      <Row>
        <Col sm={12}>Title</Col>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        <Col sm={12} md={6}>
          {posts &&
            posts.map((post) => {
              return (
                <Card  style={{ width: '18rem' }}>
                  <Card.Img variant='top' src={post.img} />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.caption}</Card.Text>
                    <Button variant='primary' href={post.src} target='__blank'>
                      Learn More
                    </Button>
                  </Card.Body>
                </Card>
              );
            })}{" "}
        </Col>
      </Row>
    </>
  );
};

export default InformScreen;
