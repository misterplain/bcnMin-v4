import React, { useEffect } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogPosts } from "../actions/blogActions";
import { addFavorite, removeFavorite } from "../actions/userActions";
import { getUserDetails } from "../actions/userActions";

const FavoriteButton = ( {id} ) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("profile");
  const userData = useSelector((state) => state.userDetails.userData);
  const { favorites } = userData;
  console.log(favorites);

  const isFavorite = favorites.includes(id);
  console.log(isFavorite);

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
    dispatch(getUserDetails(token));
  };

  return (
    <Button
      variant={isFavorite ? 'outline-danger' : 'outline-success'}
      onClick={handleFavorite}
      style={{ margin: "5px" }}
    >
      {isFavorite ? "Remove Favorite" : "Add Favorite"}
    </Button>
  );
};

const InformScreen = () => {
  const dispatch = useDispatch();

  const token = localStorage.getItem("profile");

  useEffect(() => {
    dispatch(fetchBlogPosts());
    dispatch(getUserDetails(token));
  }, []);

  const userData = useSelector((state) => state.userDetails.userData);

  const blogPosts = useSelector((state) => state.blogPosts);
  const { loading, error, posts } = blogPosts;

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
                    {/* {userData?.favorites &&
                      !loading &&
                      userData.favorites.includes(post._id)(
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
                      )}
                    {userData?.favorites &&
                      !loading && !userData.favorites.includes(post._id) !== -1 && (
                      <Button
                        variant='outline-danger'
                        onClick={() => {
                          console.log("remove favorite clicked");
                          dispatch(removeFavorite(post._id));
                        }}
                        style={{ margin: "5px" }}
                      >
                        Add Favorite
                      </Button>
                    )} */}
                    {userData && !userData.loading && (
                      <FavoriteButton id={post._id} />
                    )}
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
