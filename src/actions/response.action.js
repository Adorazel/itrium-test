import {SET_RESPONSE_BODY, SET_RESPONSE_ERROR, SET_RESPONSE_HEADERS, SET_RESPONSE_STATUS_CODE} from "../actionTypes"
import {setFetchLoading, setFetchSuccess, setFetchError} from "./fetch.action"

const setResponseError = error => {
  return {
    type: SET_RESPONSE_ERROR,
    payload: error
  }
}

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

      if (response.ok) {
        dispatch(setResponseError(null))
      } else {
        dispatch(setResponseError({message: response.statusText || "Status code: " + response.status}))
      }

      const headers = Object.fromEntries(response.headers.entries())
      dispatch(setResponseHeaders(headers))

      dispatch(setResponseStatusCode(response.status))

      return response.json()
    })
    .then(json => {
      dispatch(setResponseBody(json))
    })
    .catch(error => {
      dispatch(setFetchError({message: error.message}))
    })
}

export {
  fetchUrl
}