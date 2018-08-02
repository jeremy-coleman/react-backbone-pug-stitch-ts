const express = require('express')
const logger = require('artsy-morgan')
const path = require('path')
const app = express()


app.set('views', 'templates')
app.use(express.static('public'))
app.use(logger)


// Apps
app.use(require('./src/apps/home'))
app.use(require('./src/apps/backbone'))
app.use(require('./src/apps/styled-components'))

app.listen(3000, () => {
  console.log('Listening on port 3000.')
})
