import React from 'react'
import History from "../History"
import PanelContainer from "../../containers/PanelContainer"

const App = () => {
  return (
    <div className="App">
      <header className="navbar navbar-dark bg-dark navbar-expand-lg text-white">
        <div className="container">
          <h1>Itrium Demo</h1>
        </div>
      </header>
      <div className="container">
        <div className="py-3">
          <div className="row">
            <aside className="col-3">
              <History/>
            </aside>
            <div className="col-9">
              <PanelContainer/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
