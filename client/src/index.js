import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import * as serviceWorker from "./serviceWorker"
import {App, ErrorBoundary} from "./components"
import {FetchServiceProvider, WebsocketServiceProvider, QueueProvider} from "./contexts"
import {FetchService, WebSocketService} from "./services"
import store from "./store"
import {Queue} from "./utils"

import "./index.css"


const fetchService = new FetchService()
const webSocketService = new WebSocketService()
const queue = new Queue()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <FetchServiceProvider value={fetchService}>
          <WebsocketServiceProvider value={webSocketService}>
            <QueueProvider value={queue}>
              <App/>
            </QueueProvider>
          </WebsocketServiceProvider>
        </FetchServiceProvider>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
