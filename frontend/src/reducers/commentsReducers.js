import {
  GET_COMMENTS_FAIL,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  ADD_COMMENT_FAIL,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAIL,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
} from "../constants/commentsConstants";

export const commentsReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return { loading: true, comments: [] };

    case GET_COMMENTS_SUCCESS:
      return { loading: false, comments: action.payload };

    case GET_COMMENTS_FAIL:
      return { loading: false, error: action.payload };

    case ADD_COMMENT_REQUEST:
      return { loading: true };

    case ADD_COMMENT_SUCCESS:
      return { loading: false, success: true, comments: action.payload };

    case ADD_COMMENT_FAIL:
      return { loading: false, error: action.payload };

    case REMOVE_COMMENT_REQUEST:
      return { loading: true };

    case REMOVE_COMMENT_SUCCESS:
      return { loading: false, success: true, comments: action.payload };

    case REMOVE_COMMENT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
