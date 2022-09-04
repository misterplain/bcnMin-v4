import React, { useEffect } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogPosts } from "../actions/blogActions";
import { addFavorite } from "../actions/favoriteActions";


const InformScreen = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userLogin.userInfo);
  const blogPosts = useSelector((state) => state.blogPosts);
  const { loading, error, posts } = blogPosts;

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, []);

  console.log(posts);

  return (
    <Container fluid>
      <Row className='justify-content-center'>
        <Col sm={12} className='text-center'>
          local news and conservation info
        </Col>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        {posts &&
          posts.map((post) => {
            return (
              <Col
                xs={{ span: 10, offset: 0 }}
                sm={{ span: 5, offset: 0 }}
                md={5}
                lg={3}
                className='justify-content-center'
              >
                <Card style={{ width: "100%" }} className='text-center'>
                  <Card.Img variant='top' src={post.img} />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.caption}</Card.Text>
                    <Button variant='primary' href={post.src} target='__blank'>
                      Learn More
                    </Button>
                    {user && (
                      <Button
                        variant='primary'
                        onClick={() => {
                          dispatch(addFavorite(post._id));
                        }}
                      >
                        Add to Favorites
                      </Button>
                    )}
                  </Card.Body>
                </Card>{" "}
              </Col>
            );
          })}{" "}
      </Row>
    </Container>
  );
};

export default InformScreen;
