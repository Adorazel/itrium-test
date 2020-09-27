import {fetchUrl} from "./fetch.action"
import {setHistory, addHistoryItem, removeHistoryItem, purgeHistory, activateHistoryItem} from "./history.action"
import {queueUpdate, enqueueUrl} from "./queue.action"
import {setRequestError, setRequestUrl, setRequestMethod, setRequestHeaders, setRequestBody} from "./request.action"
import {setResponseError, setResponseContentType, setResponseStatusCode, setResponseHeaders, setResponseBody} from "./response.action"

export {
  fetchUrl,

  setHistory,
  addHistoryItem,
  removeHistoryItem,
  purgeHistory,
  activateHistoryItem,

  queueUpdate,
  enqueueUrl,

  setRequestError,
  setRequestUrl,
  setRequestMethod,
  setRequestHeaders,
  setRequestBody,

  setResponseError,
  setResponseContentType,
  setResponseStatusCode,
  setResponseHeaders,
  setResponseBody,
}