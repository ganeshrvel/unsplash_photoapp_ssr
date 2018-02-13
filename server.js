'use strict'

require('babel-register')
global.fetch = require('node-fetch')
const http = require('http'),
  port = 3001,
  ip = '127.0.0.1'

let server = http.createServer((req, res) => {
  require('./router').get(req, res)
})
server.listen(port, (err) => {
  if (err) {
    return console.error('Server Error! Debug Message: ', err)
  }
  
  console.info(`Server running at http://${ip}:${port}/`)
})
