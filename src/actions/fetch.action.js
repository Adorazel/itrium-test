import {v4} from "uuid"
import {FETCH_LOADING, FETCH_SUCCESS, FETCH_FAILURE} from "../actionTypes"
import {
  setResponseBody,
  setResponseContentType,
  setResponseError,
  setResponseHeaders,
  setResponseStatusCode,
  addHistoryItem,
  setRequestError
} from "./"

const setFetchLoading = dispatch => () => dispatch(FETCH_LOADING)

const setFetchSuccess = dispatch => () => dispatch(FETCH_SUCCESS)

const setFetchError = dispatch => error => {
  dispatch({
    type: FETCH_FAILURE,
    payload: error
  })
}

const fetchUrl = (dispatch, service) => (url, method, headers, body) => {

  const historyItem = {
    id: v4(),
    active: true,
    request: {
      url,
      method,
      headers,
      body,
    },
    response: {
    }
  }

  // Process headers
  headers = headers.map(header => Object.values(header))
  headers = Object.fromEntries(headers)
  delete headers[""]

  // Process & validate body
  historyItem.request.error = null
  setRequestError(dispatch)(historyItem.request.error)
  if (body.trim() && method !== "GET") {
    try {
      body = JSON.parse(body)
    } catch (e) {
      historyItem.request.error = {message: "Body JSON is invalid"}
      setRequestError(dispatch)(historyItem.request.error)
      return
    }
  } else {
    body = null
  }

  setFetchLoading(dispatch)()

  service[method.toLowerCase()](url, headers, body)
    .then(response => {

      setFetchSuccess(dispatch)()

      historyItem.timestamp = Date.now()

      // Set response error
      if (response.ok) {
        historyItem.response.error = null
        setResponseError(dispatch)(historyItem.response.error)
      } else {
        historyItem.response.error = {message: response.statusText || "Status code: " + response.status}
        setResponseError(dispatch)(historyItem.response.error)
      }

      // Set response status code
      historyItem.response.statusCode = response.status
      setResponseStatusCode(dispatch)(historyItem.response.statusCode)

      // Set response headers
      let headers = [...response.headers.entries()]
      headers = headers.map(([key, value]) => ({key, value}))
      historyItem.response.headers = headers
      setResponseHeaders(dispatch)(historyItem.response.headers)

      // Set response content-type
      let type = "html"
      const contentType = headers.find(({key}) => key === "content-type")
      if (contentType && contentType.value.match(/application\/json/)) {
        type = "json"
      }
      historyItem.response.contentType = type
      setResponseContentType(dispatch)(historyItem.response.contentType)

      // Get response body
      return response.text()

    })
    .then(data => {
      // Set response body
      historyItem.response.body = data
      setResponseBody(dispatch)(historyItem.response.body)

      addHistoryItem(dispatch)(historyItem)
    })
    // Set fetch error
    .catch(error => {
      setFetchError(dispatch)({message: error.message})
    })

}

export {
  fetchUrl,
  setFetchLoading,
  setFetchSuccess,
  setFetchError
}