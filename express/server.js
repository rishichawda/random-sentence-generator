const express = require('express')
const http = require('http')
const serverless = require("serverless-http");
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')
const routes = require('./routes')

const router = express.Router();

const PORT = process.env.PORT || 8080

const app = express()

app.set('port', PORT)

app.use(cors())
app.use(bodyParser.json({ type: '*/*' }));
app.use("/.netlify/functions/server", router);

if ('development' == app.get('env')) {
  app.use(logger())
}

routes(app)

module.exports.handler = serverless(app);

// Start server on port.
http.createServer(app).listen(PORT, function(){
  console.log('Express server listening on port ' + PORT)
})
