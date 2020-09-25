import {SET_REQUEST_BODY, SET_REQUEST_HEADERS, SET_REQUEST_METHOD, SET_REQUEST_URL} from "../actionTypes"

const setRequestUrl = dispatch => url => {
  dispatch({
    type: SET_REQUEST_URL,
    payload: url
  })
}

const setRequestMethod = dispatch => method => {
  dispatch({
    type: SET_REQUEST_METHOD,
    payload: method
  })
}

const setRequestHeaders = dispatch => headers => {
  dispatch({
    type: SET_REQUEST_HEADERS,
    payload: headers
  })
}

const setRequestBody = dispatch => body => {
  dispatch({
    type: SET_REQUEST_BODY,
    payload: body
  })
}

export {
  setRequestUrl,
  setRequestMethod,
  setRequestHeaders,
  setRequestBody
}
