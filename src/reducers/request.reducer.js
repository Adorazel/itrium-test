import {
  REQUEST_BODY,
  REQUEST_ERROR,
  REQUEST_HEADERS,
  REQUEST_METHOD,
  REQUEST_URL
} from "../actionTypes"

const initialState = {
  url: "https://jsonplaceholder.typicode.com/todos",
  method: "GET",
  headers: [{key: "Content-Type", value: "application/json"}],
  body: "",
  error: null
}

const requestReducer = (state = initialState, action) => {
  switch (action.type) {

    case REQUEST_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case REQUEST_URL:
      return {
        ...state,
        url: action.payload,
        error: null
      }

    case REQUEST_METHOD:
      return {
        ...state,
        method: action.payload,
        error: null
      }

    case REQUEST_HEADERS:
      return {
        ...state,
        headers: action.payload,
        error: null
      }

    case REQUEST_BODY:
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