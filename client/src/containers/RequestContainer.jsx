import React, {Component} from "react"
import {withQueue} from "../hoc"
import {connect} from "react-redux"
import {Request} from "../components"
import {bindActionCreators, compose} from "../utils"
import {
  setRequestUrl,
  setRequestMethod,
  setRequestHeaders,
  setRequestBody,
  enqueueUrl,
  activateHistoryItem
} from "../actions"



class RequestContainer extends Component {

  urlChangeHandler = ({target}) => {
    const {setRequestUrl, activateHistoryItem} = this.props
    setRequestUrl(target.value)
    activateHistoryItem("")
  }

  methodChangeHandler = ({target}) => {
    const {setRequestMethod, activateHistoryItem} = this.props
    setRequestMethod(target.value)
    activateHistoryItem("")
  }

  headersChangeHandler = ({target}) => {
    const {headers, setRequestHeaders, activateHistoryItem} = this.props
    const newHeaders = [...headers]
    const idx = +target.name.split("_")[1]
    const key = target.name.split("_")[0]
    newHeaders[idx][key] = target.value
    setRequestHeaders(newHeaders)
    activateHistoryItem("")
  }

  bodyChangeHandler = value => {
    const {setRequestBody, activateHistoryItem} = this.props
    setRequestBody(value)
    activateHistoryItem("")
  }

  sendRequestHandler = () => {
    const {url, method, headers, body, enqueueUrl} = this.props
    enqueueUrl(url, method, headers, body)
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

const mapDispatchToProps = (dispatch, {queue}) => bindActionCreators({
  enqueueUrl: enqueueUrl(queue),
  setRequestUrl, setRequestMethod, setRequestHeaders, setRequestBody, activateHistoryItem
}, dispatch)

export default compose(
  withQueue(),
  connect(mapStateToProps, mapDispatchToProps)
)(RequestContainer)

