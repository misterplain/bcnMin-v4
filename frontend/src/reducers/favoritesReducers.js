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

export const favoritesReducer = (state = { favorites: [] }, action) => {
  switch (action.type) {
    case GET_FAVORITES_REQUEST:
      return { loading: true, favorites: [] };

    case GET_FAVORITES_SUCCESS:
      return { loading: false, favorites: action.payload };

    case GET_FAVORITES_FAIL:
      return { loading: false, error: action.payload };

    case ADD_FAVORITE_REQUEST:
      return { loading: true };

    case ADD_FAVORITE_SUCCESS:
      return { loading: false, success: true, favorites: action.payload };

    case ADD_FAVORITE_FAIL:
      return { loading: false, error: action.payload };

    case REMOVE_FAVORITE_REQUEST:
      return { loading: true };

    case REMOVE_FAVORITE_SUCCESS:
      return { loading: false, success: true, favorites: action.payload };

    case REMOVE_FAVORITE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
