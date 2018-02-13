'use strict'

let fs = require('fs')
exports.get = (req, res) => {
  fs.readFile('views/404.html', 'utf8', (err, data) => {
    res.writeHead(200, {
      'Content-Type': 'text/html', 'Content-Length': data.length
    })
    res.write(data)
    res.end()
  })
}