import {SET_FETCH_LOADING, SET_FETCH_SUCCESS, SET_FETCH_FAILURE} from "../actionTypes"

const initialState = {
  error: null,
  loading: false,
}

const fetchReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_FETCH_LOADING:
      return {
        ...state,
        loading: true
      }

    case SET_FETCH_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case SET_FETCH_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    default:
      return state
  }
}

export default fetchReducer