import {WS_ADD_LOG, WS_CONNECT, WS_DISCONNECT, WS_LOCATION, WS_MESSAGE, WS_SET_LOG} from "../actionTypes"

const initialState = {
  location: "wss://echo.websocket.org",
  message: "Rock it with HTML5 WebSocket",
  isConnected: false,
  log: ""
}

const websocketReducer = (state = initialState, action) => {
  switch (action.type) {

    case WS_LOCATION:
      return {
        ...state,
        location: action.payload
      }

    case WS_MESSAGE:
      return {
        ...state,
        message: action.payload
      }

    case WS_CONNECT:
      return {
        ...state,
        isConnected: true
      }

    case WS_DISCONNECT:
      return {
        ...state,
        isConnected: false
      }

    case WS_SET_LOG:
      return {
        ...state,
        log: action.payload
      }

    case WS_ADD_LOG:
      return {
        ...state,
        log: state.log + action.payload
      }

    default:
      return state
  }
}
export default websocketReducer
