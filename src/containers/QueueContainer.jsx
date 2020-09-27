import React, {Component} from "react"
import {withQueue, withFetch} from "../hoc"
import {bindActionCreators, compose} from "../utils"
import {connect} from "react-redux"
import Queue from "../components/Queue"
import {fetchUrl} from "../actions"

class QueueContainer extends Component {

  queueProcess() {
    const {queue, loading, fetchUrl} = this.props
    if (queue.length && !loading) {
      const {url, method, headers, body, historyItem} = queue[0]
      fetchUrl(url, method, headers, body, historyItem)
    }
  }

  componentDidMount() {
    this.queueProcess()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.queueProcess()
  }

  render() {
    const {queue} = this.props
    return <Queue queue={queue}/>
  }
}

const mapStateToProps = ({queue: {items: queue}, fetch: {loading}}) => ({queue, loading})

const mapDispatchToProps = (dispatch, {fetchService, queue}) => bindActionCreators({
  fetchUrl: fetchUrl(fetchService, queue),
}, dispatch)

export default compose(
  withQueue(),
  withFetch(),
  connect(mapStateToProps, mapDispatchToProps)
)(QueueContainer)