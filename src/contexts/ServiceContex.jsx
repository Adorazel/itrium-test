import React from "react"

const {
  Provider: ServiceProvider,
  Consumer: ServiceConsumer
} = React.createContext(undefined)

export {ServiceProvider, ServiceConsumer}