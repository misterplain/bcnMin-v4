import {
  REFRESH_TOKEN,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/authConstants";

export const authReducer = (state = { accessToken: null }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      localStorage.setItem("profile", action.payload.data.refreshToken);
      return {
        loading: false,
        accessToken: action.payload.data.accessToken,
        refreshToken: action.payload.data.refreshToken,
        errors: null,
      };

    case USER_LOGIN_FAIL:
      return { loading: false, loginError: action.payload };

    case USER_LOGOUT:
      localStorage.removeItem("profile");
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
      };

    case REFRESH_TOKEN:
      return {
        ...state,
        accessToken: action.payload.data.accessToken,
        refreshToken: action.payload.data.refreshToken,
      };

    //register
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      localStorage.setItem("profile", action.payload.data.refreshToken);
      return {
        accessToken: action.payload.data.accessToken,
        refreshToken: action.payload.data.refreshToken,
        loading: false,
        errors: null,
      };

    case USER_REGISTER_FAIL:
      return { loading: false, registerError: action.payload };

    default:
      return state;
  }
};
