// archetype error-boundary
// version 0.0.1

import React, { Component } from "react"

type Props = {}
type State = {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public componentDidCatch(error: Error, info: unknown) {
    // tslint:disable-next-line:no-console
    console.error("Oh no! Error happened", { error, info })
  }

  public render() {
    if (this.state.hasError === true) {
      return <React.Fragment>Error!</React.Fragment>
    }

    return this.props.children
  }
}

export default ErrorBoundary
