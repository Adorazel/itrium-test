import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import * as serviceWorker from "./serviceWorker"
import App from "./components/App"
import ErrorBoundary from "./components/ErrorBoundary"
import FetchService from "./services/fetch.service"
import {ServiceProvider} from "./contexts/ServiceContex"
import store from "./store"

import "./index.css"

const fetchService = new FetchService()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <ServiceProvider value={fetchService}>
          <App/>
        </ServiceProvider>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
