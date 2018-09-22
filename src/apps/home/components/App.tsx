import * as React from 'react'

export default class HomeApp extends React.Component<any, any> {

  componentDidMount () {
    console.log('Component mounted on client-side')
  }

  handleButtonClick () {
    console.log('clicking button')
  }

  render () {
    const { title, subtitle } = this.props

    return (
      <div>
        <h3>
          {title}
        </h3>
        <h4>
          {subtitle}
        </h4>
        <p>
          Hello from React! Please open your console and <button onClick={this.handleButtonClick.bind(this)}>click here</button>
        </p>
      </div>
    )
  }
}
