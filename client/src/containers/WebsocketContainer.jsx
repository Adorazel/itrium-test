import React, {Component} from "react"
import {connect} from "react-redux"
import {Websocket} from "../components"
import {withWebsocket} from "../hoc"
import {doConnect, doDisconnect, doSend, doClear, setMessage, setLocation} from "../actions"
import {bindActionCreators, compose} from "../utils"


class WebsocketContainer extends Component {

  locationChangeHandler = ({target}) => {
    const {setLocation} = this.props
    setLocation(target.value)
  }

  messageChangeHandler = ({target}) => {
    const {setMessage} = this.props
    setMessage(target.value)
  }

  connectHandler = event => {
    event.preventDefault()
    const {location, doConnect} = this.props
    doConnect(location)
  }

  disconnectHandler = event => {
    event.preventDefault()
    const {doDisconnect} = this.props
    doDisconnect()
  }

  sendHandler = event => {
    event.preventDefault()
    const {message, doSend} = this.props
    doSend(message)
  }

  clearHandler = event => {
    event.preventDefault()
    const {doClear} = this.props
    doClear()
  }

  render() {
    const {location, message, isConnected, log} = this.props
    const {
      locationChangeHandler, messageChangeHandler,
      connectHandler, disconnectHandler, sendHandler, clearHandler
    } = this
    const websocketProps = {
      location, message, isConnected, log,
      locationChangeHandler, messageChangeHandler,
      connectHandler, disconnectHandler, sendHandler, clearHandler
    }
    return <Websocket {...websocketProps}/>
  }
}

const mapStateToProps = ({websocket: {location, message, isConnected, log}}) => ({location, message, isConnected, log})

const mapDispatchToProps = (dispatch, {websocketService}) => bindActionCreators({
  doConnect: doConnect(websocketService),
  doDisconnect: doDisconnect(websocketService),
  doSend: doSend(websocketService),
  doClear,
  setLocation,
  setMessage,
}, dispatch)

export default compose(
  withWebsocket(),
  connect(mapStateToProps, mapDispatchToProps)
)(WebsocketContainer)
