import {
  GET_COMMENTS_FAIL,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  ADD_COMMENT_FAIL,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
} from "../constants/commentsConstants";

export const commentsReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case GET_COMMENTS_REQUEST:
      return { loading: true, comments: [] };

    case GET_COMMENTS_SUCCESS:
      return { loading: false, comments: action.payload };

    case GET_COMMENTS_FAIL:
      return { loading: false, error: action.payload };

    case ADD_COMMENT_SUCCESS:
      const newComment = action.payload.newComment;
      console.log(newComment);
      //add new comment to state
      // state.comments = [...state.comments, newComment];
      // return { loading: false, comments: state.comments };
      // return { loading: false, comments: action.payload.newComment};
      // return  {comments: [newComment,  newComment] };
      // return [...state, newComment];
      // return {...state, comments: [...state.comments, newComment]};
      // return { comments: [...comments, {newComment}] };
      return {
        loading: false,
        error: null,
        comments: [...state.comments, newComment],
      };
      console.log(state);

    case ADD_COMMENT_FAIL:
      return { loading: false, error: action.payload };

    case DELETE_COMMENT_SUCCESS:
      const commentId = action.payload.id;
      console.log(action.payload.id);
      return {
        loading: false,
        error: null,
        comments: state.comments.filter((comment) => comment._id !== commentId),
      };

    case DELETE_COMMENT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
