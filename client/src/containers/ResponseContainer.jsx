import React, {Component} from "react"
import {connect} from "react-redux"
import {Response} from "../components"

class ResponseContainer extends Component {

  render() {

    const {contentType, statusCode, headers, body} = this.props

    if (contentType && statusCode && headers && body) {
      return <Response {...this.props}/>
    }

    return <section>
      <h5 className="m-0 mb-3 text-uppercase">Response</h5>
      <div className="text-center p-5 text-black-50">Hit Send to get a response</div>
    </section>

  }
}

const mapStateToProps = ({response: {contentType, statusCode, headers, body}}) => ({contentType, statusCode, headers, body})

export default connect(mapStateToProps)(ResponseContainer)