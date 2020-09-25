import {SET_RESPONSE_BODY, SET_RESPONSE_HEADERS, SET_RESPONSE_STATUS_CODE} from "../actionTypes"
import {setFetchLoading, setFetchSuccess, setFetchError} from "./fetch.action"

const setResponseStatusCode = code => {
  return {
    type: SET_RESPONSE_STATUS_CODE,
    payload: code
  }
}

const setResponseHeaders = headers => {
  return {
    type: SET_RESPONSE_HEADERS,
    payload: headers
  }
}

const setResponseBody = body => {
  return {
    type: SET_RESPONSE_BODY,
    payload: body
  }
}

const fetchUrl = (dispatch, service) => (url, method, headers, body) => {
  dispatch(setFetchLoading())
  service[method.toLowerCase()](url, headers, body)
    .then(response => {
      dispatch(setFetchSuccess())
      dispatch(setResponseStatusCode(response.status))
      const headers = Object.fromEntries(response.headers.entries())
      dispatch(setResponseHeaders(headers))
      return response.json()
    })
    .then(json => {
      dispatch(setResponseBody(json))
    })
    .catch(error => {
      dispatch(setFetchError(error))
    })
}

export {
  fetchUrl
}