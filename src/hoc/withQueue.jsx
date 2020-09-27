import React from "react"
import {QueueConsumer} from "../contexts"

const withQueue = () => Wrapped => {
  return props => <QueueConsumer>{queue => <Wrapped {...props} queue={queue}/>}</QueueConsumer>
}

export default withQueue