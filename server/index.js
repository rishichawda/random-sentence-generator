const express = require('express')
const http = require('http')

const PORT = process.env.PORT || 3000

const app = express()

app.set('port', PORT)

http.createServer(app)
  .listen(PORT, function () {
    console.log('Server listening on port ' + PORT)
})
