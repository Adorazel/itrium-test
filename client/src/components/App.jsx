import React, {useRef} from "react"
import {BrowserRouter as Router, NavLink, Redirect, Route, Switch} from "react-router-dom"
import {FetchPage, WebsocketPage} from "../pages"

const App = () => {

  const nav = useRef()

  const navHandler = () => {
    nav.current.classList.toggle("show")
  }

  return <div className="App">
    <Router>
      <header className="bg-dark">
        <div className="container">
          <nav className="navbar navbar-dark navbar-expand-md mx-n3 px-3">
            <NavLink to="/" className="navbar-brand font-weight-bold">Itrium Test</NavLink>
            <button className="navbar-toggler" type="button" onClick={navHandler}>
              <span className="navbar-toggler-icon"/>
            </button>
            <div ref={nav} className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <NavLink exact to="/" className="nav-link text-uppercase" onClick={navHandler}>Fetch</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="web-socket" className="nav-link text-uppercase" onClick={navHandler}>Websocket</NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <Switch>
        <Route exact path="/"><FetchPage/></Route>
        <Route exact path="/web-socket"><WebsocketPage/></Route>
        <Route><Redirect to="/"/></Route>
      </Switch>
    </Router>
  </div>
}

export default App