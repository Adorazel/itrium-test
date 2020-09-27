import React from "react"

const {Provider: WebSocketServiceProvider, Consumer: WebSocketServiceConsumer} = React.createContext(undefined)

export {WebSocketServiceProvider, WebSocketServiceConsumer}