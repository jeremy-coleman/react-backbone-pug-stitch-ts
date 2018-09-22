import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ServerStyleSheet } from 'styled-components'
import { renderToString } from 'react-dom/server'
import { uniqueId } from 'lodash'



interface IStitchConfig {
  modules: any,
  moduleName: any,
  props: any,
  modes: 'client' | 'server',
  serialize: (component: any) => void,
  mountId: any,
  sheet: any,
  html: any,
  css: any,
  markup: any
}

const modes = {
  CLIENT: "client",
  SERVER: "server"
}

export function componentRenderer(config) {
  const {
    modules,
    mode = modes.SERVER,
    serialize = component => component
  } = config

  const components = Object.keys(modules).reduce((moduleMap, moduleName) => {
    const Component = modules[moduleName]

    return {
      ...moduleMap,

      [moduleName]: (props: any = {}) => {
        if (mode === modes.SERVER) {
          const mountId = props.mountId || uniqueId('stitch-component-')
          const sheet = new ServerStyleSheet()
          const html = renderToString(
            sheet.collectStyles(<Component {...props} />)
          )
          const css = sheet.getStyleTags()
          const markup = `
            <div id="${mountId}">
              ${css}
              ${html}
            </div>
          `.trim()

          serialize({ mountId, moduleName, props })
          return markup

          // Client
        } else if (mode === modes.CLIENT) {
          setTimeout(() => {
            ReactDOM.hydrate(
              <Component {...props} />,
              document.getElementById(props.mountId)
            )
          }, 0)
        }
      }
    }
  }, {})

  return {
    components,
    mountOnClient: ({ moduleName, ...component }) => {
      components[moduleName]({
        mountId: component.mountId,
        ...component.props
      })
    }
  }
}
