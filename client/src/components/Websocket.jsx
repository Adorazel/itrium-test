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
            <label htmlFor="location" className="font-weight-bold">Location</label>
            <input type="text" className="form-control" id="location"
                   value={location} onChange={locationChangeHandler} disabled={isConnected}/>
          </div>
          <div className="mb-3">
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
            <label htmlFor="message" className="font-weight-bold">Message</label>
            <input type="text" className="form-control" id="message" value={message} onChange={messageChangeHandler}/>
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
            <label className="font-weight-bold">Log</label>
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