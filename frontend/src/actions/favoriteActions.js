import axios from "axios";
import {
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAIL,
  ADD_FAVORITE_REQUEST,
  REMOVE_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_FAIL,
  REMOVE_FAVORITE_REQUEST,
} from "../constants/userConstants";

// export const fetchFavorites = () => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: GET_FAVORITES_REQUEST,
//     });

//     const {
//       userLogin: { userInfo },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     const { data } = await axios.post("/favorites", config);

//     dispatch({
//       type: GET_FAVORITES_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: GET_FAVORITES_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message,
//     });
//   }
// };

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
    

    // const { data } = await axios.post(`, config);
    const { data } = await axios({
      method: "post",
      url: `/favorites/${id}`,
      headers: config.headers,
    });
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
    console.log("add favorite request fail", error);
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
    console.log("remove favorite action accessed");

    // const { data } = await axios.delete(`/api/favorites/${id}`, config);

    const { data } = await axios({
      method: "delete",
      url: `/favorites/${id}`,
      headers: config.headers,
    });

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
    console.log("remove favorite request fail", error);
  }
};
