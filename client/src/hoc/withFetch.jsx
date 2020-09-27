import React from "react"
import {FetchServiceConsumer} from "../contexts"

const withFetch = () => Wrapped => {
  return props => <FetchServiceConsumer>{fetchService => <Wrapped {...props} fetchService={fetchService}/>}</FetchServiceConsumer>
}

export default withFetch