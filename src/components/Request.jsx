import React, {useRef} from "react"
import ErrorIndicator from "./ErrorIndicator"
import Editor from "./Editor"
import {tabHandler} from "../utils"

const Request = (props) => {

  const section = useRef()

  const {
    reqError, resError, fetchError, loading, url, method, headers, body,
    urlChangeHandler, methodChangeHandler, headersChangeHandler, bodyChangeHandler, sendRequestHandler, keyDownHandler, clearHeaderHandler, addHeaderHandler
  } = props

  const error = reqError || fetchError || resError

  return <section ref={section} className="border border-left-0 border-right-0 border-top-0 mb-3 pb-2">
    <h5 className="m-0 mb-3 text-uppercase">Request</h5>
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <select className="custom-select rounded-left rounded-right-0"
                value={method} onChange={methodChangeHandler} disabled={loading}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <input type="text" className="form-control rounded-0"
             value={url} onChange={urlChangeHandler} onKeyDown={keyDownHandler}
             disabled={loading}/>
      <div className="input-group-append">
        <button className="btn btn-primary rounded-right rounded-left-0" type="button"
                onClick={sendRequestHandler} disabled={loading}>
          SEND
        </button>
      </div>
    </div>
    {error && <ErrorIndicator error={error}/>}
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <a className="nav-link active" href="#body" onClick={event => tabHandler(event, section.current)}>Body</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#headers" onClick={event => tabHandler(event, section.current)}>Headers</a>
      </li>
    </ul>
    <div className="tab-content">
      <div className="tab-pane pt-3 active" id="body" role="tabpanel" aria-labelledby="body-tab">
        <div className="form-group">
          <label className="font-weight-bold">JSON</label>
          <Editor name="response-editor" value={body} onChange={bodyChangeHandler} readOnly={loading}/>
        </div>
      </div>
      <div className="tab-pane py-3" id="headers" role="tabpanel" aria-labelledby="headers-tab">
        <table className="table mb-3">
          <thead>
          <tr>
            <th className="w-50">Key</th>
            <th className="w-50">Value</th>
            <th/>
          </tr>
          </thead>
          <tbody>
          {headers.map(({key, value}, idx) => <tr key={idx}>
            <td className="align-middle">
              <input type="text" name={`key_${idx}`} className="form-control" placeholder="key"
                     value={key} onChange={headersChangeHandler} disabled={loading}/>
            </td>
            <td className="align-middle">
              <input type="text" name={`value_${idx}`} className="form-control" placeholder="value"
                     value={value} onChange={headersChangeHandler} disabled={loading}/>
            </td>
            <td className="align-middle">
              <button type="button" className="btn btn-outline-danger btn-sm"
                      onClick={event => clearHeaderHandler(event, idx)} disabled={loading}>
                <i className="fa fa-trash"/>
              </button>
            </td>
          </tr>)}
          </tbody>
        </table>
        <div className="text-right">
          <button type="button" className="btn btn-success btn-sn"
                  onClick={event => addHeaderHandler(event)} disabled={loading}>
            ADD HEADER
          </button>
        </div>
      </div>
    </div>
  </section>

}


export default Request

