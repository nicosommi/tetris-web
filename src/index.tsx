import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.css"
import * as serviceWorker from "./serviceWorker"

async function lock() {
  if (screen && screen.orientation && screen.orientation.lock) {
    try {
      await screen.orientation.lock("portrait")
    } catch (e) {
      // avoid no empty block, intentional swallow
    }
  }
}
lock()

ReactDOM.render(<App />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
