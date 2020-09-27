import {combineReducers} from "redux"
import fetchReducer from "./fetch.reducer"
import requestReducer from "./request.reducer"
import responseReducer from "./response.reducer"
import historyReducer from "./history.reducer"
import queueReducer from "./queue.reducer"
import websocketReducer from "./websocket.reducer"


export default combineReducers({
  fetch: fetchReducer,
  websocket: websocketReducer,
  request: requestReducer,
  response: responseReducer,
  history: historyReducer,
  queue: queueReducer
})
