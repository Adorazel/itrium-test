import {FETCH_LOADING, FETCH_SUCCESS, FETCH_FAILURE} from "../actionTypes"

const initialState = {
  error: null,
  loading: false,
}

const fetchReducer = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_LOADING:
      return {
        ...state,
        loading: true
      }

    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case FETCH_FAILURE:
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