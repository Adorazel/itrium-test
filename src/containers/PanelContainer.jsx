import React, {Component} from "react"
import withService from "../hoc/withService"
import {connect} from "react-redux"
import {setRequestError, setRequestUrl, setRequestMethod, setRequestHeaders, setRequestBody, fetchUrl} from "../actions"
import {compose} from "../utils"
import Panel from "../components/Panel/Panel"

class PanelContainer extends Component {

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

  bodyChangeHandler = ({target}) => {
    const {setRequestBody} = this.props
    setRequestBody(target.value)
  }

  sendRequestHandler = () => {
    const {url, method, fetchUrl, setRequestError} = this.props
    let {headers, body} = this.props

    headers = headers.map(header => Object.values(header))
    headers = Object.fromEntries(headers)
    delete headers[""]

    if (body.trim() && method !== "GET") {
      try {
        body = JSON.parse(body)
      } catch (e) {
        setRequestError({message: "Body JSON is invalid"})
        return
      }
    } else {
      body = null
    }

    fetchUrl(url, method, headers, body)
  }

  clearHeaderHandler = (event, idx) => {
    event.preventDefault()
    const {headers, setRequestHeaders} = this.props
    let newHeaders = [...headers]
    if (newHeaders.length > 1) {
      newHeaders = newHeaders.filter((item, i) => i !== idx)
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
    const {urlChangeHandler, methodChangeHandler, headersChangeHandler, bodyChangeHandler, sendRequestHandler, clearHeaderHandler, addHeaderHandler} = this
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
      clearHeaderHandler,
      addHeaderHandler
    }
    return <Panel {...panelProps}/>
  }
}

const mapStateToProps = ({request: {error: reqError, url, method, headers, body}, response: {error: resError}, fetch: {error: fetchError, loading}}) => ({
  reqError,
  resError,
  fetchError,
  loading,
  url,
  method,
  headers,
  body
})

const mapDispatchToProps = (dispatch, {service}) => {
  return {
    setRequestError: setRequestError(dispatch),
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
)(PanelContainer)

