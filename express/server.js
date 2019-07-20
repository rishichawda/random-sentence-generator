const express = require('express')
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

if ('development' == app.get('env')) {
  app.use(logger());
  routes(app);
} else {
  app.use("/.netlify/functions/server", router);
  routes(router);
}


// Start server on port.
app.listen(PORT, function(){
  console.log('Express server listening on port ' + PORT)
})

module.exports.handler = serverless(app);