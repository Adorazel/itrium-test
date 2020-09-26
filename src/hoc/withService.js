import React from "react"
import {ServiceConsumer} from "../contexts/ServiceContex"

const withService = () => Wrapped => {
  return props => <ServiceConsumer>{service => <Wrapped {...props} service={service}/>}</ServiceConsumer>
}

export default withService