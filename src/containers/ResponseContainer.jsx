import React, {Component} from "react"
import {connect} from "react-redux"
import Response from "../components/Response"

class ResponseContainer extends Component {
  render() {
    return (
      <Response {...this.props}/>
    )
  }
}

const mapStateToProps = ({response: {statusCode, headers, body}}) => ({statusCode, headers, body})

export default connect(mapStateToProps)(ResponseContainer)