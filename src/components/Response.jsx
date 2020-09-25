import React, {useRef} from "react"
import Editor from "./Editor";
import {tabHandler} from "../utils";

const Response = props => {

  const section = useRef()

  const {statusCode, headers, body} = props

  let color = "#28a745"
  if (statusCode > 299 || statusCode < 200) color = "#dc3545"

  if (!body) {
    return <section>
      <h5 className="m-0 mb-3 text-uppercase">Response</h5>
      <div className="text-center p-5 text-black-50">Hit Send to get a response</div>
    </section>
  }

  return <section ref={section}>
    <div className="d-flex justify-content-between align-middle">
      <h5 className="m-0 mb-3 text-uppercase">Response</h5>
      <div style={{color}} className="font-weight-bold">Status code: {statusCode}</div>
    </div>
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a className="nav-link active" href="#resp-body" onClick={event => tabHandler(event, section.current)}>Body</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#resp-headers" onClick={event => tabHandler(event, section.current)}>Headers</a>
      </li>
    </ul>
    <div className="tab-content">
      <div className="tab-pane py-3 active" id="resp-body" role="tabpanel" aria-labelledby="body-tab">
        <div className="form-group">
          <label className="font-weight-bold">JSON</label>
          <Editor value={body ? JSON.stringify(body, null, "  ") : ""}
                  onChange={() => {
                  }} readOnly={true}/>
        </div>
      </div>
      <div className="tab-pane py-3" id="resp-headers" role="tabpanel" aria-labelledby="headers-tab">
        <div>{JSON.stringify(headers)}</div>
      </div>
    </div>
  </section>
}

export default Response