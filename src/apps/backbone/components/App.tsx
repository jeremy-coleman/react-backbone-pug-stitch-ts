import * as React from 'react'
import Users from './Users'

export default class App extends React.Component<any, any> {

  componentDidMount () {
    console.log('Component mounted on client-side')
  }

  render () {
    const {
      title,
      description,
      templates: {
        users
      }
    } = this.props

    return (
      <div>
        <h3>
          {title}
        </h3>
        <p>
          {description}
        </p>

        <Users
          template={users}
        />
      </div>
    )
  }
}
