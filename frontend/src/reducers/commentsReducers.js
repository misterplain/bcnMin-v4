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
