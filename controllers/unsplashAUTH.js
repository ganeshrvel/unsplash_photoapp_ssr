'use strict'

let fs = require('fs'),
  _unsplash = require('../controllers/unsplashData'),
  url = require('url'),
  querystring = require('querystring')

exports.get = function (req, res) {
  let url_parts = url.parse(req.url),
    search_text = querystring.parse(url_parts.query).search,
    pageno = querystring.parse(url_parts.query).pageno > 0 ? querystring.parse(url_parts.query).pageno : 1,
    query_type = querystring.parse(url_parts.query).query_type,
    count = 16
  
  let promise = _unsplash.unsplashData.photos().searchPhotos(search_text, undefined, parseInt(pageno), count)
  if (query_type === 'list') {
    promise = _unsplash.unsplashData.photos().getRandomPhoto({featured: true, count: count})
  }
  
  promise.then((result) => {
    console.info('unsplashDataAUTH Page | Promises loaded...')
    console.info('unsplashDataAUTH Page | Loading Webview...')
    let stringified_json = JSON.stringify(result)
    
    res.writeHead(200, 'utf8', {
      'Content-Type': 'text/html'
    })
    res.write(stringified_json)
    res.end()
  })
}
