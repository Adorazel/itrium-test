import {WS_ADD_LOG, WS_CONNECT, WS_DISCONNECT, WS_LOCATION, WS_MESSAGE, WS_SET_LOG} from "../actionTypes"

const setLocation = dispatch => location => {
  dispatch({
    type: WS_LOCATION,
    payload: location
  })
}

const setMessage = dispatch => message => {
  dispatch({
    type: WS_MESSAGE,
    payload: message
  })
}

const writeToLog = dispatch => log => {
  dispatch({
    type: WS_ADD_LOG,
    payload: log
  })
}

const getDatetime = () => {
  const date = new Date()
  return `<small class="text-black-50 small">${date.toLocaleString()}</small><br/>`
}

const onOpen = dispatch => () => {
  dispatch(WS_CONNECT)
  writeToLog(dispatch)(
    `<p>${getDatetime()}<span class="text-success font-weight-bold">CONNECTED</span></p>`
  )
}

const onClose = dispatch => () => {
  dispatch(WS_DISCONNECT)
  writeToLog(dispatch)(
    `<p>${getDatetime()}<span class="text-success font-weight-bold">DISCONNECTED</span></p>`
  )
}

const onMessage = dispatch => event => {
  writeToLog(dispatch)(
    `<p>${getDatetime()}<span class="text-primary font-weight-bold">RESPONSE:</span> ${event.data}</p>`
  )
}

const onError = dispatch => event => {
  writeToLog(dispatch)(
    `<p>${getDatetime()}<span class="text-danger font-weight-bold">ERROR:</span> ${event.data ? event.data : "Something went wrong..."}</p>`
  )
}

const doConnect = wsService => dispatch => location => {
  wsService.connect(
    location,
    onOpen(dispatch),
    onClose(dispatch),
    onMessage(dispatch),
    onError(dispatch)
  )
}

const doDisconnect = wsService => () => () => {
  wsService.disconnect()
}

const doSend = wsService => dispatch => message => {
  writeToLog(dispatch)(
    `<p>${getDatetime()}<span class="text-info font-weight-bold">SENT:</span> ${message}</p>`
  )
  wsService.send(message)
}

const doClear = dispatch => () => {
  dispatch({
    type: WS_SET_LOG,
    payload: ""
  })
}

export {
  setLocation,
  setMessage,
  doConnect,
  doDisconnect,
  doSend,
  doClear
}