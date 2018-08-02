import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/App'

const bootstrapData = (window as any).__BOOTSTRAP__

ReactDOM.render(
  <App {...bootstrapData} />, document.getElementById('react-root')
)

/*
if ((module as any).hot) {
  (module as any).hot.accept()
}
*/