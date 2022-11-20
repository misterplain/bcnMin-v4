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
  const [isFavorites, setIsFavorites] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userLogin.authData);
  const userData = useSelector((state) => state.userDetails.userData);
  const blogPosts = useSelector((state) => state.blogPosts);
  const { loading, error, posts } = blogPosts;
  // const { favorites } = userData;

  useEffect(() => {
    dispatch(fetchBlogPosts());
    if (token) {
      dispatch(getUserDetails(token));
    }
    // let favorites = posts.filter((post) => post._id === userData.favorites);
    // setIsFavorites([favorites]);
  }, [dispatch]);

  //function to put setIsFavorites to true if the post is in the favorites array
  // const checkFavorites = (posts) => {
  //  let favorites = posts.filter((post)=>post._id === userData.favorites)
  //   setIsFavorites(favorites)
  // }

  const filterFavorites = () => {
    const fav = userData.favorites;
    const filteredFavorites = posts.filter((post) => {
      return fav.includes(post._id);
    });
    setIsFavorites(filteredFavorites);
  };

  console.log(posts);
  console.log(userData);
  console.log(isFavorites);

  filterFavorites();

  return (
    <div id='favorites'>
      FavoritesScreen{" "}
      {/* filter function to only show blog posts that are within the user favorites */}
      {/* {favorites.map((post) => (
        <Col key={post._id} sm={12} md={6} lg={4} xl={3}>
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
                <div className='my-3'>{post.caption}</div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))} */}
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
