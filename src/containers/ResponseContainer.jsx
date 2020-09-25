import React, {Component} from "react"
import {connect} from "react-redux"
import Response from "../components/Response"

class ResponseContainer extends Component {

  render() {

    const {statusCode, headers, body} = this.props

    if (!statusCode && !headers && !body) {
      return <section>
        <h5 className="m-0 mb-3 text-uppercase">Response</h5>
        <div className="text-center p-5 text-black-50">Hit Send to get a response</div>
      </section>
    }

    return (
      <Response {...this.props}/>
    )
  }
}

const mapStateToProps = ({response: {statusCode, headers, body}}) => ({statusCode, headers, body})

export default connect(mapStateToProps)(ResponseContainer)