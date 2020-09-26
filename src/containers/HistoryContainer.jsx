import React, {Component} from "react"
import {connect} from "react-redux"
import History from "../components/History"
import {
  fetchUrl,
  setHistory,
  purgeHistory,
  removeHistoryItem,
  activateHistoryItem,
  setRequestError,
  setRequestUrl,
  setRequestMethod,
  setRequestHeaders,
  setRequestBody,
  setResponseError,
  setResponseContentType,
  setResponseStatusCode,
  setResponseHeaders,
  setResponseBody,
} from "../actions"
import {compose} from "../utils"
import withService from "../hoc/withService"


class HistoryContainer extends Component {


  getItem = (event, itemId) => {
    event && event.preventDefault()

    const {
      items, activateHistoryItem,
      setRequestError, setRequestUrl, setRequestMethod, setRequestHeaders, setRequestBody,
      setResponseError, setResponseContentType, setResponseStatusCode, setResponseHeaders, setResponseBody,
    } = this.props

    let item
    if (typeof itemId === "string") {
      item = items.find(({id}) => id === itemId)
    } else {
      item = itemId
    }

    setRequestError(item.request.error)
    setRequestUrl(item.request.url)
    setRequestMethod(item.request.method)
    setRequestHeaders(item.request.headers)
    setRequestBody(item.request.body)

    setResponseError(item.response.error)
    setResponseContentType(item.response.contentType)
    setResponseStatusCode(item.response.statusCode)
    setResponseHeaders(item.response.headers)
    setResponseBody(item.response.body)

    activateHistoryItem(item.id)
  }

  removeItem = (event, id) => {
    event.preventDefault()
    const {removeHistoryItem} = this.props
    removeHistoryItem(id)
  }

  purge = event => {
    event.preventDefault()
    const {purgeHistory} = this.props
    purgeHistory()
  }

  keyDown = (event, id) => {
    const {items, fetchUrl, loading} = this.props
    let activeItem = items.find(item => item.active === true)

    if (id) {
      activeItem = items.find(item => item.id === id)
    }

    if (event.key === "Enter" && activeItem && !loading) {
      const {url, method, headers, body} = activeItem.request
      fetchUrl(url, method, headers, body)
    }
  }

  componentDidMount() {

    document.addEventListener("keydown", this.keyDown)

    const {setHistory} = this.props
    let storage = localStorage.getItem("ITRIUM_DEMO_HISTORTY")
    if (storage) {
      storage = JSON.parse(storage)
      setHistory(storage)
      if (storage.length) {
        let activeItem = storage.find(item => item.active === true)
        if (!activeItem) activeItem = storage[0]
        this.getItem(null, activeItem)
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDown)
  }

  render() {
    const {items} = this.props
    const {getItem, removeItem, purge} = this
    const historyProps = {items, getItem, removeItem, purge}

    return <History {...historyProps}/>
  }
}

const mapStateToProps = ({history: {items}, fetch: {loading}}) => ({items, loading})

const mapDispatchToProps = (dispatch, {service}) => {
  return {
    fetchUrl: fetchUrl(dispatch, service),

    setHistory: setHistory(dispatch),
    removeHistoryItem: removeHistoryItem(dispatch),
    purgeHistory: purgeHistory(dispatch),
    activateHistoryItem: activateHistoryItem(dispatch),

    setRequestError: setRequestError(dispatch),
    setRequestUrl: setRequestUrl(dispatch),
    setRequestMethod: setRequestMethod(dispatch),
    setRequestHeaders: setRequestHeaders(dispatch),
    setRequestBody: setRequestBody(dispatch),

    setResponseError: setResponseError(dispatch),
    setResponseContentType: setResponseContentType(dispatch),
    setResponseStatusCode: setResponseStatusCode(dispatch),
    setResponseHeaders: setResponseHeaders(dispatch),
    setResponseBody: setResponseBody(dispatch),
  }
}

export default compose(
  withService(),
  connect(mapStateToProps, mapDispatchToProps)
)(HistoryContainer)