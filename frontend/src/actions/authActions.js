import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/authConstants";
import axios from "../api/axios";
import { getUserDetails } from "./userActions";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const data = await axios.post("/auth", { email, password });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    console.log(data.data.accessToken);
    dispatch(getUserDetails(data.data.accessToken));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: null,
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
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: null,
    });
  }
};
