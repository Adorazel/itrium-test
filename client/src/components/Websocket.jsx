import React, {useEffect, useRef} from "react"
import {Parser} from "html-to-react"

const Websocket = props => {

  const parser = new Parser()
  const output = useRef()

  const {
    location, message, isConnected, log,
    locationChangeHandler, messageChangeHandler,
    connectHandler, disconnectHandler, sendHandler, clearHandler
  } = props

  useEffect(() => {
    output.current.scrollTop = output.current.scrollHeight
    output.current.classList.add("smooth")
  }, [log])

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="form-group">
            <div className="d-flex mb-2">
              <h5 className="text-uppercase m-0 mr-2">Location</h5>
              {isConnected && <div><span className="badge badge-success">CONNECTED</span></div>}
            </div>
            <input type="text" className="form-control"
                   value={location} onChange={locationChangeHandler} disabled={isConnected}/>
          </div>
          <div className="mb-5">
            <button type="button" className="btn btn-primary btn-sm text-uppercase"
                    onClick={connectHandler} disabled={isConnected}>
              Connect
            </button>
            {" "}
            <button type="button" className="btn btn-outline-danger btn-sm text-uppercase"
                    onClick={disconnectHandler} disabled={!isConnected}>
              Disconnect
            </button>
          </div>
          <div className="form-group">
            <h5 className="text-uppercase m-0 mb-2">Message</h5>
            <textarea rows="5" className="form-control" value={message} onChange={messageChangeHandler}/>
          </div>
          <div className="mb-3">
            <button type="button" className="btn btn-success btn-sm text-uppercase"
                    onClick={sendHandler} disabled={!isConnected}>
              Send
            </button>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="form-group">
            <h5 className="text-uppercase m-0 mb-2">Log</h5>
            <div ref={output} className="websocket-output border rounded px-2">{parser.parse(log)}</div>
          </div>
          <div className="mb-3">
            <button type="button" className="btn btn-warning btn-sm text-uppercase" onClick={clearHandler}>
              Clear log
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Websocket