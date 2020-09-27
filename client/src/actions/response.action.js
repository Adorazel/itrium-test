import {
  RESPONSE_BODY,
  RESPONSE_CONTENT_TYPE,
  RESPONSE_ERROR,
  RESPONSE_HEADERS,
  RESPONSE_STATUS_CODE
} from "../actionTypes"

const setResponseError = dispatch => error => {
  dispatch({
    type: RESPONSE_ERROR,
    payload: error
  })
}

const setResponseContentType = dispatch => type => {
  dispatch({
    type: RESPONSE_CONTENT_TYPE,
    payload: type
  })
}

const setResponseStatusCode = dispatch => code => {
  dispatch({
    type: RESPONSE_STATUS_CODE,
    payload: code
  })
}

const setResponseHeaders = dispatch => headers => {
  dispatch({
    type: RESPONSE_HEADERS,
    payload: headers
  })
}

const setResponseBody = dispatch => body => {
  dispatch({
    type: RESPONSE_BODY,
    payload: body
  })
}

export {
  setResponseError,
  setResponseContentType,
  setResponseStatusCode,
  setResponseHeaders,
  setResponseBody,
}