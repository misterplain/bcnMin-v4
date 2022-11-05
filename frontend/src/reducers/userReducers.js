import {
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  ADD_FAVORITE_REQUEST,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAIL,
  REMOVE_FAVORITE_FAIL,
  REMOVE_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_REQUEST,
} from "../constants/userConstants";

export const userReducer = (state = { userData: null }, action) => {
  switch (action.type) {
    //user details request
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        userData: action.payload.data,
        loading: false,
        errors: null,
      };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    //favorites
    case ADD_FAVORITE_REQUEST:
      return { loading: true };

    case ADD_FAVORITE_SUCCESS:
      let cloneState = { ...state };
      cloneState.userData.favorites = [
        ...cloneState.userData.favorites,
        action.payload.blogId,
      ];
      return cloneState;

    case ADD_FAVORITE_FAIL:
      return { loading: false, error: action.payload };

    case REMOVE_FAVORITE_REQUEST:
      return { loading: true };

    case REMOVE_FAVORITE_SUCCESS: {
      let cloneState = { ...state };
      cloneState.userData.favorites = cloneState.userData.favorites?.filter(
        (value) => value !== action.payload.blogId
      );

      return cloneState;
    }

    case REMOVE_FAVORITE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
