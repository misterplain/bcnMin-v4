import React, { useEffect } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogPosts } from "../actions/blogActions";
import { addFavorite, removeFavorite } from "../actions/favoriteActions";
import { getUserDetails } from "../actions/userActions";

const InformScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogPosts = useSelector((state) => state.blogPosts);
  const { loading, error, posts } = blogPosts;

  // let userInfo = true;
  // let loading = false;
  // let error = false;

  useEffect(() => {
    dispatch(fetchBlogPosts());
    dispatch(getUserDetails());
  }, []);

  return (
    <Container fluid>
      <Row className='justify-content-center'>
        <Col sm={12} className='page-title mb-3'>
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
                key={post._id}
              >
                <Card
                  style={{
                    width: "100%",
                    border: "2px solid green",
                    padding: "1px",
                    margin: "3px",
                  }}
                  className='text-center'
                >
                  <Card.Img variant='top' src={post.img} />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.caption}</Card.Text>
                    <Button
                      variant='outline-primary'
                      href={post.src}
                      target='__blank'
                      style={{ margin: "5px" }}
                    >
                      Learn More
                    </Button>
                    {/* {userInfo && userInfo.favorites.includes(post._id) ? (
                      <Button
                        variant='outline-danger'
                        onClick={() => {
                          console.log("remove favorite clicked");
                          dispatch(removeFavorite(post._id));
                        }}
                        style={{ margin: "5px" }}
                      >
                        Delete Favorite
                      </Button>
                    ) : (
                      <Button
                        variant='outline-success'
                        onClick={() => {
                          console.log("add favorite clicked");
                          dispatch(addFavorite(post._id));
                        }}
                        style={{ margin: "5px" }}
                      >
                        Add to Favorites
                      </Button>
                    )} */}
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
