const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const logger = require('morgan')
const routes = require('./routes')

const PORT = process.env.PORT || 3000

const app = express()

app.set('port', PORT)

app.use(bodyParser())

if ('development' == app.get('env')) {
  app.use(logger())
}

routes(app)

// Start server on port.
http.createServer(app).listen(PORT, function(){
  console.log('Express server listening on port ' + PORT)
})
