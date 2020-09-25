import React from "react"

const Panel = (props) => {

  const {
    url,
    method,
    headers,
    body,
    urlChangeHandler,
    methodChangeHandler,
    headersChangeHandler,
    bodyChangeHandler,
    sendRequestHandler,
    clearHeaderHandler,
    addHeaderHandler
  } = props

  const tabHandler = event => {
    event.preventDefault()

    const section = document.querySelector(".request")

    const tabs = [...section.querySelectorAll(".nav-link")]
    tabs.forEach(item => {
      item.classList.remove("active")
    })
    event.target.classList.add("active")

    const tabContents = [...section.querySelectorAll(".tab-pane")]
    tabContents.forEach(item => {
      item.classList.remove("active")
    })
    const id = "#" + event.target.href.split("#")[1]
    section.querySelector(id).classList.add("active")
  }


  return (
    <section className="request">
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <select className="custom-select rounded-left rounded-right-0" value={method}
                  onChange={methodChangeHandler}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        <input type="text" className="form-control rounded-0" value={url} onChange={urlChangeHandler}/>
        <div className="input-group-append">
          <button className="btn btn-primary rounded-right rounded-left-0" type="button"
                  onClick={sendRequestHandler}>SEND
          </button>
        </div>
        <div className="invalid-feedback">Please enter a valid url.</div>
      </div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" href="#headers" onClick={tabHandler}>Headers</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#body" onClick={tabHandler}>Body</a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane py-3 active" id="headers" role="tabpanel" aria-labelledby="headers-tab">
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
                       value={key} onChange={headersChangeHandler}/>
              </td>
              <td className="align-middle">
                <input type="text" name={`value_${idx}`} className="form-control" placeholder="value"
                       value={value} onChange={headersChangeHandler}/>
              </td>
              <td className="align-middle">
                <button type="button" className="btn btn-outline-danger btn-sm"
                        onClick={event => clearHeaderHandler(event, idx)}>
                  <i className="fa fa-trash"/>
                </button>
              </td>
            </tr>)}
            </tbody>
          </table>
          <div className="text-right">
            <button type="button" className="btn btn-success btn-sn" onClick={event => addHeaderHandler(event)}>
              ADD HEADER
            </button>
          </div>
        </div>
        <div className="tab-pane py-3" id="body" role="tabpanel" aria-labelledby="body-tab">
          <div className="form-group">
            <label htmlFor="body-textarea" className="font-weight-bold">JSON</label>
            <textarea id="body-textarea" className="form-control" rows="10" value={body} onChange={bodyChangeHandler}/>
          </div>
        </div>
      </div>
    </section>
  )
}


export default Panel

