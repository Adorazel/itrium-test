import {SET_REQUEST_BODY, SET_REQUEST_HEADERS, SET_REQUEST_METHOD, SET_REQUEST_URL} from "../actionTypes";

const initialState = {
  url: "https://jsonplaceholder.typicode.com/todos",
  method: "GET",
  headers: [{key: "", value: ""}],
  body: "",
}

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REQUEST_URL:
      return {
        ...state,
        url: action.payload
      }

    case SET_REQUEST_METHOD:
      return {
        ...state,
        method: action.payload
      }

    case SET_REQUEST_HEADERS:
      return {
        ...state,
        headers: action.payload
      }

    case SET_REQUEST_BODY:
      return {
        ...state,
        body: action.payload
      }

    default:
      return state
  }
}

export default requestReducer