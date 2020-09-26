import React from "react"

const History = ({items, getItem, removeItem, purge}) => {

  const getColor = statusCode => {
    let backgroundColor = "#28a745"
    if (statusCode < 200 || statusCode > 299) backgroundColor = "#dc3545"
    return {backgroundColor}
  }

  const getTime = timestamp => {

    const seconds = Math.floor((new Date() - timestamp) / 1000)
    let interval = seconds / 31536000

    if (interval > 1) {
      return Math.floor(interval) + " years ago"
    }

    interval = seconds / 2592000
    if (interval > 1) {
      return Math.floor(interval) + " months ago"
    }

    interval = seconds / 86400
    if (interval > 1) {
      return Math.floor(interval) + " days ago"
    }

    interval = seconds / 3600
    if (interval > 1) {
      return Math.floor(interval) + " hours ago"
    }

    interval = seconds / 60
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago"
    }

    return Math.floor(seconds) + " seconds ago"
  }

  return <section className="border border-top-0 border-bottom-0 border-left-0 h-100 pr-4"
                  style={{minHeight: "calc(100vh - 105px)"}}>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5 className="m-0 text-uppercase">History</h5>
      <button type="button" className="btn btn-outline-danger btn-sm" onClick={purge} disabled={!items.length}>
        <i className="fa fa-trash"/>
      </button>
    </div>
    {
      items.map(item => {
        return <div key={item.id} className={`history-item toast mb-3 ${item.active ? "active" : ""}`} onClick={event => getItem(event, item.id)}>
          <div className="toast-header">
            <span className="history-item__signal d-inline-block rounded mr-2"
                  style={getColor(item.response.statusCode)}/>
            <strong className="mr-auto">{item.request.method}</strong>
            <small>{getTime(item.timestamp)}</small>
            <button type="button" className="ml-2 mb-1 close" onClick={event => removeItem(event, item.id)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="toast-body text-break">{item.request.url}</div>
        </div>
      })
    }
  </section>
}

export default History