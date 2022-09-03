import axios from "axios";
import {
  GET_FAVORITES_SUCCESS,
  GET_FAVORITES_FAIL,
  GET_FAVORITES_REQUEST,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAIL,
  ADD_FAVORITE_REQUEST,
  REMOVE_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_FAIL,
  REMOVE_FAVORITE_REQUEST,
} from "../constants/favoriteConstants";

export const fetchFavorites = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_FAVORITES_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/favorites", config);

    dispatch({
      type: GET_FAVORITES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FAVORITES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addFavorite = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_FAVORITE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/favorites/${id}`, config);

    dispatch({
      type: ADD_FAVORITE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_FAVORITE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeFavorite = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REMOVE_FAVORITE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/favorites/${id}`, config);

    dispatch({
      type: REMOVE_FAVORITE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REMOVE_FAVORITE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
