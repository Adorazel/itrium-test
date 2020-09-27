import React from "react"
import {WebsocketServiceConsumer} from "../contexts"

const withWebsocket = () => Wrapped => {
  return props => <WebsocketServiceConsumer>{websocketService => <Wrapped {...props} websocketService={websocketService}/>}</WebsocketServiceConsumer>
}

export default withWebsocket