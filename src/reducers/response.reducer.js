import {SET_RESPONSE_BODY, SET_RESPONSE_HEADERS, SET_RESPONSE_STATUS_CODE} from "../actionTypes";

const initialState = {
  statusCode: null,
  headers: null,
  body: null,
}

const responseReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESPONSE_STATUS_CODE:
      return {
        ...state,
        statusCode: action.payload
      }

    case SET_RESPONSE_HEADERS:
      return {
        ...state,
        headers: action.payload
      }

    case SET_RESPONSE_BODY:
      return {
        ...state,
        body: action.payload
      }

    default:
      return state
  }
}

export default responseReducer