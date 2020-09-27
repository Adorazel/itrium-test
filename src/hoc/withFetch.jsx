import React from "react"
import {ServiceConsumer} from "../contexts"

const withFetch = () => Wrapped => {
  return props => <ServiceConsumer>{fetchService => <Wrapped {...props} fetchService={fetchService}/>}</ServiceConsumer>
}

export default withFetch