import React from "react"

const {Provider: WebsocketServiceProvider, Consumer: WebsocketServiceConsumer} = React.createContext(undefined)

export {WebsocketServiceProvider, WebsocketServiceConsumer}