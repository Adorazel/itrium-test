import React, {useRef} from "react"
import Editor from "./Editor"
import {tabHandler} from "../utils"

const Response = props => {

  const section = useRef()

  const {contentType, statusCode, headers, body} = props

  let textColor = "text-success"
  if (statusCode < 200 || statusCode > 299) textColor = "text-danger"

  return <section ref={section}>
    <div className="d-flex justify-content-between align-middle">
      <h5 className="m-0 mb-3 text-uppercase">Response</h5>
      <div className={`font-weight-bold ${textColor}`}>Status code: {statusCode}</div>
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
          <Editor name="response-editor" value={body} readOnly={true} mode={contentType}/>
        </div>
      </div>
      <div className="tab-pane py-3" id="resp-headers" role="tabpanel" aria-labelledby="headers-tab">
        <table className="table mb-3">
          <thead>
          <tr>
            <th className="w-50">Key</th>
            <th className="w-50">Value</th>
          </tr>
          </thead>
          <tbody>
          {headers.map(({key, value}, idx) => <tr key={idx}>
            <td className="align-middle">{key}</td>
            <td className="align-middle">{value}</td>
          </tr>)}
          </tbody>
        </table>
      </div>
    </div>
  </section>
}

export default Response