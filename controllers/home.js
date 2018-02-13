'use strict'

const fs = require('fs'),
  url = require('url'),
  unsplashData = require('../controllers/unsplashData'),
  querystring = require('querystring'),
  ejs = require('ejs'),
  list_photo_start = 1,
  list_photo_count = 16

exports.get = (req, res) => {
  
  let promise = unsplashData.unsplashData.photos().listPhotos(list_photo_start, list_photo_count, 'popular')
  
  promise.then((result) => {
    console.info('Home | Promises loaded...')
    console.info('Home | Loading Webview...')
    
    fs.readFile('views/home.ejs', 'utf8', (err, data) => {
      let rendered_ejs = ejs.render(data, {
        filename: 'views/home.ejs', photo_json_value: result
      })
      res.writeHead(200, 'utf8', {
        'Content-Type': 'text/html', 'Content-Length': rendered_ejs.length
      })
      res.write(rendered_ejs)
      res.end()
    })
  })
}