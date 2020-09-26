import React, {Component} from "react"
import withService from "../hoc/withService"
import {connect} from "react-redux"
import {setRequestUrl, setRequestMethod, setRequestHeaders, setRequestBody, fetchUrl} from "../actions"
import {compose} from "../utils"
import Request from "../components/Request"

class RequestContainer extends Component {

  urlChangeHandler = ({target}) => {
    const {setRequestUrl} = this.props
    setRequestUrl(target.value)
  }

  methodChangeHandler = ({target}) => {
    const {setRequestMethod} = this.props
    setRequestMethod(target.value)
  }

  headersChangeHandler = ({target}) => {
    const {headers, setRequestHeaders} = this.props
    const newHeaders = [...headers]
    const idx = +target.name.split("_")[1]
    const key = target.name.split("_")[0]
    newHeaders[idx][key] = target.value
    setRequestHeaders(newHeaders)
  }

  bodyChangeHandler = value => {
    const {setRequestBody} = this.props
    setRequestBody(value)
  }

  sendRequestHandler = () => {
    const {url, method, headers, body ,fetchUrl} = this.props
    fetchUrl(url, method, headers, body)
  }

  keyDownHandler = event => {
    if (event.key === "Enter") this.sendRequestHandler()
  }

  clearHeaderHandler = (event, idx) => {
    event.preventDefault()
    const {headers, setRequestHeaders} = this.props
    let newHeaders = [...headers]
    if (newHeaders.length > 1) {
      newHeaders = newHeaders.filter((_, i) => i !== idx)
    } else {
      newHeaders = [{key: "", value: ""}]
    }
    setRequestHeaders(newHeaders)
  }

  addHeaderHandler = event => {
    event.preventDefault()
    const {headers, setRequestHeaders} = this.props
    const newHeaders = [...headers, {key: "", value: ""}]
    setRequestHeaders(newHeaders)
  }

  render() {
    const {reqError, resError, fetchError, loading, url, method, headers, body} = this.props
    const {urlChangeHandler, methodChangeHandler, headersChangeHandler, bodyChangeHandler, sendRequestHandler, keyDownHandler, clearHeaderHandler, addHeaderHandler} = this
    const panelProps = {
      reqError,
      resError,
      fetchError,
      loading,
      url,
      method,
      headers,
      body,
      urlChangeHandler,
      methodChangeHandler,
      headersChangeHandler,
      bodyChangeHandler,
      sendRequestHandler,
      keyDownHandler,
      clearHeaderHandler,
      addHeaderHandler
    }
    return <Request {...panelProps}/>
  }
}

const mapStateToProps = ({
                           request: {error: reqError, url, method, headers, body},
                           response: {error: resError},
                           fetch: {error: fetchError, loading}
                         }) => ({reqError, resError, fetchError, loading, url, method, headers, body})

const mapDispatchToProps = (dispatch, {service}) => {
  return {
    setRequestUrl: setRequestUrl(dispatch),
    setRequestMethod: setRequestMethod(dispatch),
    setRequestHeaders: setRequestHeaders(dispatch),
    setRequestBody: setRequestBody(dispatch),
    fetchUrl: fetchUrl(dispatch, service),
  }
}

export default compose(
  withService(),
  connect(mapStateToProps, mapDispatchToProps)
)(RequestContainer)

