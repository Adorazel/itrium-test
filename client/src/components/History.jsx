import React, {useEffect, useState} from "react"

const History = ({items, getItem, removeItem, purge}) => {

  const state = useState(Date.now())

  useEffect(() => {
    const timer = setTimeout(() => state[1](Date.now()), 1000)
    return () => clearTimeout(timer)
  }, [state])


  const getColor = statusCode => {
    let bg = "bg-success"
    if (statusCode < 200 || statusCode > 299) bg = "bg-danger"
    return bg
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

    interval = seconds
    if (interval > 0) {
      return Math.floor(interval) + " seconds ago"
    }

    return "Sent currently"
  }

  return <section className="history border border-top-0 border-bottom-0 border-left-0 h-100 pr-md-4"
                  style={{minHeight: "calc(100vh - 105px)"}}>
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5 className="m-0 mb-1 text-uppercase">History ({items.length})</h5>
      <button type="button" className="btn btn-outline-danger btn-sm" onClick={purge} disabled={!items.length}>
        <i className="fa fa-trash"/>
      </button>
    </div>
    {
      items.map(item => {
        return <div key={item.id}
                    className={`history-item toast mb-3 ${item.active ? "active" : ""}`}
                    onClick={event => getItem(event, item.id)}>
          <div className="toast-header">
            <span className={`history-item__signal ${getColor(item.response.statusCode)} d-inline-block rounded-circle mr-2`}/>
            <strong className="mr-auto">{item.request.method}</strong>
            <small>{getTime(item.timestamp)}</small>
            <button type="button" className="ml-2 mb-1 close" onClick={event => removeItem(event, item.id)}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="toast-body text-break">
            {item.request.url}
            <div className="history-item__hint small mt-2 text-black-50">Press Enter to send</div>
          </div>
        </div>
      })
    }
  </section>
}

export default History