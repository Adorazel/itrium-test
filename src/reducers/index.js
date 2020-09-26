import {combineReducers} from "redux"
import fetchReducer from "./fetch.reducer"
import requestReducer from "./request.reducer"
import responseReducer from "./response.reducer"
import historyReducer from "./history.reducer"


export default combineReducers({
  fetch: fetchReducer,
  request: requestReducer,
  response: responseReducer,
  history: historyReducer
})
