import {FETCH_LOADING, FETCH_SUCCESS, FETCH_FAILURE} from "../actionTypes"
import {
  setResponseBody,
  setResponseContentType,
  setResponseError,
  setResponseHeaders,
  setResponseStatusCode,
  addHistoryItem,
  queueUpdate
} from "./"

const setFetchLoading = dispatch => () => dispatch(FETCH_LOADING)

const setFetchSuccess = dispatch => () => dispatch(FETCH_SUCCESS)

const setFetchError = dispatch => error => {
  dispatch({
    type: FETCH_FAILURE,
    payload: error
  })
}

const fetchUrl = (fetchService, queue) => dispatch => (url, method, headers, body, historyItem) => {

  setFetchLoading(dispatch)()

  fetchService[method.toLowerCase()](url, headers, body).then(response => {

    historyItem.timestamp = Date.now()

    if (response.ok) {
      historyItem.response.error = null
      setResponseError(dispatch)(null)
    } else {
      historyItem.response.error = {message: response.statusText || "Status code: " + response.status}
      setResponseError(dispatch)(historyItem.response.error)
    }

    historyItem.response.statusCode = response.status
    setResponseStatusCode(dispatch)(response.status)

    let headers = [...response.headers.entries()]
    headers = headers.map(([key, value]) => ({key, value}))
    historyItem.response.headers = headers
    setResponseHeaders(dispatch)(headers)

    let type = "html"
    const contentType = headers.find(({key}) => key === "content-type")
    if (contentType && contentType.value.match(/application\/json/)) {
      type = "json"
    }
    historyItem.response.contentType = type
    setResponseContentType(dispatch)(type)

    return response.text()

  }).then(body => {

    historyItem.response.body = body
    setResponseBody(dispatch)(body)

    addHistoryItem(dispatch)(historyItem)

    queue.dequeue()
    queueUpdate(dispatch)(queue.print())

    setFetchSuccess(dispatch)()

  }).catch(error => {
    queue.dequeue()
    queueUpdate(dispatch)(queue.print())

    setFetchError(dispatch)({message: error.message})
  })

}

export {
  fetchUrl
}