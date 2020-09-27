import React, {Component} from "react"
import {connect} from "react-redux"
import {History} from "../components"
import {bindActionCreators, compose} from "../utils"
import {withQueue} from "../hoc"
import {
  enqueueUrl,
  setHistory, purgeHistory, removeHistoryItem, activateHistoryItem,
  setRequestError, setRequestUrl, setRequestMethod, setRequestHeaders, setRequestBody,
  setResponseError, setResponseContentType, setResponseStatusCode, setResponseHeaders, setResponseBody,
} from "../actions"


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
    const {items, enqueueUrl} = this.props
    let activeItem = items.find(item => item.active === true)

    if (id) {
      activeItem = items.find(item => item.id === id)
    }

    if (event.key === "Enter" && activeItem) {
      const {url, method, headers, body} = activeItem.request
      enqueueUrl(url, method, headers, body)
    }
  }

  componentDidMount() {
    const {setHistory, items} = this.props
    if (!items.length) {
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
    document.addEventListener("keydown", this.keyDown)
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

const mapStateToProps = ({history: {items}}) => ({items})

const mapDispatchToProps = (dispatch, {queue}) => bindActionCreators({
  enqueueUrl: enqueueUrl(queue),
  setHistory, removeHistoryItem, purgeHistory, activateHistoryItem,
  setRequestError, setRequestUrl, setRequestMethod, setRequestHeaders, setRequestBody,
  setResponseError, setResponseContentType, setResponseStatusCode, setResponseHeaders, setResponseBody,
}, dispatch)


export default compose(
  withQueue(),
  connect(mapStateToProps, mapDispatchToProps)
)(HistoryContainer)