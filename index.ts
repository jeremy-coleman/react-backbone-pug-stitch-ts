const path = require('path')
const app = require('fastify')()

import { renderLayout } from './src/@coglite/stitch'
import BackboneApp from './src/apps/backbone/components/App';
import StyledApp from './src/apps/home/components/App';
import HomeApp from './src/apps/styled-components/components/App';


const config = require('./webpack.config')
const webpack = require('webpack')
const compiler = webpack(config)



app.register(require('fastify-static'), { root: path.join(__dirname, '/public') })
app.use(require('webpack-hot-middleware')(compiler))
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  serverSideRender: true,
  stats: {
    colors: true
  }
}))

// Apps
app.get('/backbone', async (req, res, next) => {
  try {
    const layout = await renderLayout({
      layout: 'src/apps/backbone/templates/layout.pug',
      blocks: {
        head: 'src/apps/backbone/templates/meta.pug',
        body: BackboneApp
      },
      data: {
        title: 'Backbone',
        description: 'Templates can be precompiled and passed to components for mounting on client. Open console and click buttons; logging is coming from UsersView.js, a Backbone component.'
      },
      templates: {
        users: 'src/apps/backbone/templates/users.pug'
      }
    })
    res.type('text/html; charset=utf-8')
    res.send(layout)
  } catch (error) {
    console.log(error)
  }
})

// app.get('/static/styled_components.js', async (req, res)=> {
//   res.sendFile('static/styled_components.js')
// })

app.get('/styled-components', async (req, res, next) => {
  try {
    const layout = await renderLayout({
      layout: 'src/apps/styled-components/templates/layout.pug',
      config: {
        styledComponents: true
      },
      blocks: {
        head: 'src/apps/styled-components/templates/meta.pug',
        body: StyledApp
      },
      data: {
        title: 'Styled Components'
      }
    })

    res.type('text/html; charset=utf-8')
    res.send(layout)
  } catch (error) {
    next(error)
  }
})


const routes = {
  async index (req, res) {
    try {
      const layout = await renderLayout({
        layout: 'src/apps/home/templates/layout.pug',
        blocks: {
          head: 'src/apps/home/templates/meta.pug',
          body: HomeApp
        },
        data: {
          title: 'Isomorphic React/Backbone/Pug/Webpack Example',
          subtitle: 'Home'
        }
      })

      res.type('text/html; charset=utf-8')
      res.send(layout)
    } catch (error) {
      console.log(error)
    }
  }
}

app.get('/', routes.index)
app.get('/home', routes.index)


// app.use(require('./src/apps/home'))
// app.use(require('./src/apps/backbone'))
// app.use(require('./src/apps/styled-components'))

app.listen(3000, () => {
  console.log('Listening on port 3000.')
})
