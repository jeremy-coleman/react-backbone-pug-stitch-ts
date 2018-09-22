import App from './components/App'
var express = require('express')
import { renderLayout } from '../../../@coglite/stitch'

const app = module.exports = express()

const routes = {
  async index (req, res) {
    try {
      const layout = await renderLayout({
        basePath: __dirname,
        layout: 'templates/layout.pug',
        blocks: {
          head: 'templates/meta.pug',
          body: App
        },
        data: {
          title: 'Isomorphic React/Backbone/Pug/Webpack Example',
          subtitle: 'Home'
        }
      })

      res.send(layout)
    } catch (error) {
      console.log(error)
    }
  }
}

app.get('/', routes.index)
app.get('/home', routes.index)
