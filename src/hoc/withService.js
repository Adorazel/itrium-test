import React from "react"
import {ServiceConsumer} from "../contexts/ServiceContex"

const withService = () => (Wrapped) => {
  return (props) => {
    return (
      <ServiceConsumer>{
        (service) => <Wrapped {...props} service={service}/>
      }</ServiceConsumer>
    )
  }
}

export default withService