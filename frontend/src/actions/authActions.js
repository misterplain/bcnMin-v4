import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/authConstants";


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: null,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        null
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("profile");
  dispatch({ type: USER_LOGOUT });
};

//register
export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: null,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: null,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: null,
    });
  }
};
