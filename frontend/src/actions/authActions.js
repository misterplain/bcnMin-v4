import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  REFRESH_TOKEN,
} from "../constants/authConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";
import axios from "../api/axios";
import { getUserDetails, userDetailsReset } from "./userActions";
import { axiosRefresh } from "../api/axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const data = await axios.post("/auth", { email, password });
    console.log(data);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    dispatch(getUserDetails(data.data.accessToken));
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const logout = (token) => (dispatch) => {
  localStorage.removeItem("profile");
  dispatch({ type: USER_LOGOUT });
  // dispatch({ type: USER_DETAILS_RESET });

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data = axios.post("/logout", config);

  dispatch(userDetailsReset());
};

//register
export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const data = await axios.post("/register", { username, email, password });

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    console.log(data.data.accessToken);
    dispatch(getUserDetails(data.data.accessToken));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const refresh = (token) => async (dispatch) => {
  try {
    const token = localStorage.getItem("profile");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const data = await axios.get("/refresh", config);
    console.log(data);

    dispatch({
      type: REFRESH_TOKEN,
      payload: data,
    });

    //replace old refresh token with new
    localStorage.removeItem("profile");
    localStorage.setItem("profile", data.data.refreshToken);

    //getUserDetails with new access token
    dispatch(getUserDetails(data.data.accessToken));
  } catch (error) {
    console.log(error);
    localStorage.removeItem("profile");
  }
};
