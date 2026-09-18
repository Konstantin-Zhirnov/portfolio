import React from 'react'

type Props = { name: string; children: React.ReactNode }
type State = { failed: boolean }

/**
 * One section failing must not blank the page. React unmounts everything above
 * an uncaught error, so each widget sits in its own boundary: a thrown render or
 * effect removes that widget and leaves the rest of the portfolio working.
 *
 * It also undoes the two page-wide switches a widget can leave half-flipped —
 * the hidden native cursor and the reveal guards — so a crash never costs the
 * reader their pointer or leaves blocks stuck at opacity 0.
 */
class Boundary extends React.Component<Props, State> {
  state: State = { failed: false }

  static getDerivedStateFromError(): State {
    return { failed: true }
  }

  componentDidCatch(error: Error) {
    const root = document.documentElement
    root.classList.remove('has-cursor')
    root.classList.remove('js')
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(`[${this.props.name}] failed and was taken off the page`, error)
    }
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

export { Boundary }
