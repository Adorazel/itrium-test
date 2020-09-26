import React, {Component} from "react"
import ErrorIndicator from "./ErrorIndicator"

export default class ErrorBoundary extends Component {

  state = {hasError: false}

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true
    })
    console.log(error, errorInfo)
  }

  render() {
    if (this.state.hasError) return <div className="container"><div className="p-5"><ErrorIndicator/></div></div>
    return this.props.children
  }
}