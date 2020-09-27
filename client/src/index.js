import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import * as serviceWorker from "./serviceWorker"
import App from "./components/App"
import ErrorBoundary from "./components/ErrorBoundary"
import FetchService from "./services/fetch.service"
import {ServiceProvider, QueueProvider} from "./contexts"
import store from "./store"
import {Queue} from "./utils"

import "./index.css"


const fetchService = new FetchService()
const queue = new Queue()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <ServiceProvider value={fetchService}>
          <QueueProvider value={queue}>
            <App/>
          </QueueProvider>
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
