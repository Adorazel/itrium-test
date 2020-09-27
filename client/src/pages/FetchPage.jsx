import React from "react"
import {HistoryContainer, RequestContainer, ResponseContainer} from "../containers"

const FetchPage = () => <div className="container">
  <h1 hidden>Fetch</h1>
  <div className="py-3">
    <div className="row flex-column flex-md-row-reverse align-items-stretch">
      <div className="col-12 col-md-8 col-lg-9">
        <RequestContainer/>
        <ResponseContainer/>
      </div>
      <aside className="col-12 col-md-4 col-lg-3">
        <HistoryContainer/>
      </aside>
    </div>
  </div>
</div>

export default FetchPage