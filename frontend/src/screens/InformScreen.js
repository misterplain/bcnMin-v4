import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { BsHeart, BsHeartFill } from "react-icons/bs";
//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogPosts } from "../actions/blogActions";
import { addFavorite, removeFavorite } from "../actions/userActions";
import { getUserDetails } from "../actions/userActions";

const FavoriteButton = ({ post }) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, loginError, accessToken } = userLogin;
  const userData = useSelector((state) => state.userDetails.userData);

  useEffect(() => {
    if (userData) {
      if (userData.favorites.includes(post._id)) {
        setIsFavorite(true);
      }
    }
  }, [setIsFavorite, userData, post]);

  return (
    <Button
      variant='outline-light'
      onClick={
        isFavorite
          ? () => {
              dispatch(removeFavorite(post._id));
              setIsFavorite(false);
            }
          : () => {
              dispatch(addFavorite(post._id));
              setIsFavorite(true);
            }
      }
      style={{ margin: "5px" }}
    >
      {isFavorite ? (
        <BsHeartFill style={{ color: "green", fontSize: "1.5rem" }} />
      ) : (
        <BsHeart style={{ color: "green", fontSize: "1.5rem" }} />
      )}
    </Button>
  );
};

const InformScreen = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { accessToken } = userLogin;
  const userData = useSelector((state) => state.userDetails.userData);
  const blogPosts = useSelector((state) => state.blogPosts);
  const { loading, error, posts } = blogPosts;

  useEffect(() => {
    dispatch(fetchBlogPosts());
    if (accessToken) {
      dispatch(getUserDetails(accessToken));
    }
  }, [dispatch]);

  return (
    <Container fluid id='inform'>
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
                  key={post._id}
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
                    {accessToken && <FavoriteButton post={post} />}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
      </Row>
    </Container>
  );
};

export default InformScreen;

