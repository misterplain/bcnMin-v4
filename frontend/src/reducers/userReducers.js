import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  ADD_FAVORITE_FAIL,
  ADD_FAVORITE_REQUEST,
  ADD_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_FAIL,
  REMOVE_FAVORITE_REQUEST,
  REMOVE_FAVORITE_SUCCESS,
} from "../constants/userConstants";

export const userReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      localStorage.removeItem("profile");
      return {
        ...state,
        authData: null,
      };

    //register
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    //user details request
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      // return { ...state, userDetails: action.data, loading: false, errors: null };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    //favorites
    // case ADD_FAVORITE_REQUEST:
    //   return { loading: true };

    // case ADD_FAVORITE_SUCCESS:
    //   let cloneState = { ...state };
    //   cloneState.userLogin.userInfo.favorites = [
    //     ...cloneState.userLogin.userInfo.favorites,
    //     action.payload.blogId,
    //   ];
    //   return cloneState;

    // case ADD_FAVORITE_FAIL:
    //   return { loading: false, error: action.payload };

    // case REMOVE_FAVORITE_REQUEST:
    //   return { loading: true };

    // case REMOVE_FAVORITE_SUCCESS: {
    //   let cloneState = { ...state };
    //   cloneState.userLogin.userInfo.favorites =
    //     cloneState.userLogin.userInfo.favorites?.filter(
    //       (value) => value !== action.payload.blogId
    //     );

    //   return cloneState;
    // }

    // case REMOVE_FAVORITE_FAIL:
    //   return { loading: false, error: action.payload };

    default:
      return state;
  }
};
