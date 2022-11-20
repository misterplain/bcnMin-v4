import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogPosts } from "../actions/blogActions";
import { addFavorite, removeFavorite } from "../actions/userActions";
import { getUserDetails } from "../actions/userActions";

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userLogin.authData);
  const { userData } = useSelector((state) => state.userDetails);
  const blogPosts = useSelector((state) => state.blogPosts);
  // const { loading, error, posts } = blogPosts;

  const userFavorites = userData.favorites;
  const allPosts = blogPosts.posts;
  console.log(userFavorites);
  console.log(allPosts);

  const filteredPosts = allPosts.filter((post) =>
    userFavorites.includes(post._id)
  );
  console.log(filteredPosts);

  return (
    <div id='favorites'>
      FavoritesScreen{" "}
      {filteredPosts &&
        filteredPosts.map((post) => {
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
                  {/* {userData && <FavoriteButton post={post} />} */}
                </Card.Body>
              </Card>
            </Col>
          );
        })}
    </div>
  );
};

export default FavoritesScreen;

{
  /* <Col key={post._id} sm={12} md={6} lg={4} xl={3}>
<Card className='my-3 p-3 rounded'>
  <Link to={`/blog/${post._id}`}>
    <Card.Img src={post.img} variant='top' />
  </Link>
  <Card.Body>
    <Link to={`/blog/${post._id}`}>
      <Card.Title as='div'>
        <strong>{post.title}</strong>
      </Card.Title>
    </Link>
    <Card.Text as='div'>
      <div className='my-3'>
        {post.caption}
      </div>
    </Card.Text>
  </Card.Body>
</Card>
</Col> */
}
