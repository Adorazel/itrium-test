import {
  RESPONSE_BODY,
  RESPONSE_CONTENT_TYPE,
  RESPONSE_ERROR,
  RESPONSE_HEADERS,
  RESPONSE_STATUS_CODE
} from "../actionTypes"

const initialState = {
  statusCode: null,
  headers: null,
  body: null,
  contentType: null,
  error: null,
}

const responseReducer = (state = initialState, action) => {

  switch (action.type) {

    case RESPONSE_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case RESPONSE_CONTENT_TYPE:
      return {
        ...state,
        contentType: action.payload,
      }

    case RESPONSE_STATUS_CODE:
      return {
        ...state,
        statusCode: action.payload,
      }

    case RESPONSE_HEADERS:
      return {
        ...state,
        headers: action.payload
      }

    case RESPONSE_BODY:
      return {
        ...state,
        body: action.payload
      }

    default:
      return state
  }
}

export default responseReducer