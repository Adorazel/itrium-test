import {
  SET_RESPONSE_BODY,
  SET_RESPONSE_CONTENT_TYPE,
  SET_RESPONSE_ERROR,
  SET_RESPONSE_HEADERS,
  SET_RESPONSE_STATUS_CODE
} from "../actionTypes"
import {setFetchLoading, setFetchSuccess, setFetchError} from "./fetch.action"

const setResponseError = error => {
  return {
    type: SET_RESPONSE_ERROR,
    payload: error
  }
}

const setResponseContentType = type => {
  return {
    type: SET_RESPONSE_CONTENT_TYPE,
    payload: type
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

      // Set response error
      if (response.ok) {
        dispatch(setResponseError(null))
      } else {
        dispatch(setResponseError({message: response.statusText || "Status code: " + response.status}))
      }

      // Set response status code
      dispatch(setResponseStatusCode(response.status))

      // Set response headers
      let headers = [...response.headers.entries()]
      headers = headers.map(([key, value]) => ({key, value}))
      dispatch(setResponseHeaders(headers))

      // Set response content-type
      let type = "html"
      const contentType = headers.find(({key}) => key === "content-type")
      if (contentType && contentType.value.match(/application\/json/)) {
        type= "json"
      }
      dispatch(setResponseContentType(type))

      // Get response body
      return response.text()

    })
    // Set response body
    .then(data => dispatch(setResponseBody(data)))
    // Set fetch error
    .catch(error => dispatch(setFetchError({message: error.message})))
}

export {
  fetchUrl
}