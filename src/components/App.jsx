import React from 'react'
import RequestContainer from "../containers/RequestContainer"
import ResponseContainer from "../containers/ResponseContainer"
import HistoryContainer from "../containers/HistoryContainer"

const App = () => <div className="App">
  <header className="navbar navbar-dark bg-dark navbar-expand-lg text-white">
    <div className="container">
      <h1>Itrium Test</h1>
    </div>
  </header>
  <div className="container">
    <div className="py-3">
      <div className="row align-items-stretch">
        <aside className="col-3">
          <HistoryContainer/>
        </aside>
        <div className="col-9">
          <RequestContainer/>
          <ResponseContainer/>
        </div>
      </div>
    </div>
  </div>
</div>

export default App
