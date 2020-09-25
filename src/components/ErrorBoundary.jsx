import React, {Component} from "react"
import ErrorIndicator from "./ErrorIndicator"

export default class ErrorBoundary extends Component {

  state = {
    hasError: false,
    error: null,
    errorInfo: null
  }

  componentDidCatch(error, errorInfo) {
    this.state.setState({
      hasError: true,
      error,
      errorInfo
    })
  }

  render() {
    if (this.state.hasError) return <ErrorIndicator/>
    return this.props.children
  }
}