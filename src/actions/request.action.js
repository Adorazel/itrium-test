import {
  REQUEST_BODY,
  REQUEST_ERROR,
  REQUEST_HEADERS,
  REQUEST_METHOD,
  REQUEST_URL
} from "../actionTypes"

const setRequestError = dispatch => error => {
  dispatch({
    type: REQUEST_ERROR,
    payload: error
  })
}

const setRequestUrl = dispatch => url => {
  dispatch({
    type: REQUEST_URL,
    payload: url
  })
}

const setRequestMethod = dispatch => method => {
  dispatch({
    type: REQUEST_METHOD,
    payload: method
  })
}

const setRequestHeaders = dispatch => headers => {
  dispatch({
    type: REQUEST_HEADERS,
    payload: headers
  })
}

const setRequestBody = dispatch => body => {
  dispatch({
    type: REQUEST_BODY,
    payload: body
  })
}

export {
  setRequestError,
  setRequestUrl,
  setRequestMethod,
  setRequestHeaders,
  setRequestBody
}
