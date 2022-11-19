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

  // const dispatch = useDispatch();
  // const [isFavorite, setIsFavorite] = useState(false);
  // const token = useSelector((state) => state.userLogin.authData);


  const userData = useSelector((state) => state);
  console.log(userData)

  return (
    <div>FavoritesScreen</div>
  )
}

export default FavoritesScreen