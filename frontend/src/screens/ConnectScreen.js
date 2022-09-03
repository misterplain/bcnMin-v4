import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  fetchComments,
  addComment,
  deleteComment,
} from "../actions/commentsActions";

const ConnectScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.userLogin.userInfo);
  const commentsList = useSelector((state) => state.comments);
  const { loading, error, comments } = commentsList;

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch])

  return <div>{comments.map(comment=>(
    <div>
      <h1>{comment.user.username}</h1>
      <p>{comment.comment}</p>
    </div>
  ))}</div>;
};

export default ConnectScreen;
