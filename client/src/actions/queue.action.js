import {v4} from "uuid"
import {QUEUE_UPDATE} from "../actionTypes"
import {setRequestError} from "./request.action"


const queueUpdate = dispatch => queue => {
  dispatch({
    type: QUEUE_UPDATE,
    payload: queue
  })
}

const enqueueUrl = queue => dispatch => (url, method, headers, body) => {

  const historyItem = {
    id: v4(),
    active: true,
    request: {url, method, headers, body},
    response: {}
  }

  // Process headers
  headers = headers.map(header => Object.values(header))
  headers = Object.fromEntries(headers)
  delete headers[""]

  // Process & validate body
  historyItem.request.error = null
  setRequestError(dispatch)(null)

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

  queue.enqueue({id: v4(), url, method, headers, body, historyItem})

  queueUpdate(dispatch)(queue.print())
}

export {
  queueUpdate,
  enqueueUrl
}