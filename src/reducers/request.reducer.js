import {SET_REQUEST_ERROR, SET_REQUEST_BODY, SET_REQUEST_HEADERS, SET_REQUEST_METHOD, SET_REQUEST_URL} from "../actionTypes";

const initialState = {
  url: "https://jsonplaceholder.typicode.com/todos",
  method: "GET",
  headers: [{key: "", value: ""}],
  body: "",
  error: null
}

const requestReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_REQUEST_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case SET_REQUEST_URL:
      return {
        ...state,
        url: action.payload,
        error: null
      }

    case SET_REQUEST_METHOD:
      return {
        ...state,
        method: action.payload,
        error: null
      }

    case SET_REQUEST_HEADERS:
      return {
        ...state,
        headers: action.payload,
        error: null
      }

    case SET_REQUEST_BODY:
      return {
        ...state,
        body: action.payload,
        error: null
      }

    default:
      return state
  }
}

export default requestReducer