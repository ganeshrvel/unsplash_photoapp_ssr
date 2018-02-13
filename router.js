'use strict'

const url = require('url'),
  fs = require('fs')

exports.get = (req, res) => {
  req.requrl = url.parse(req.url, true)
  let path = req.requrl.pathname,
    isImage = false,
    contentType,
    charset = 'utf8',
    halt = false,
    extension = path.split('.').pop()//file extension
  
  //Deny all unauthorized file access
  if (path.includes('\/assets\/')) {
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        contentType = 'image/jpg'
        isImage = true
        break
      case 'png':
        contentType = 'image/png'
        isImage = true
        break
      case 'svg':
        contentType = 'image/svg+xml'
        isImage = true
        break
      case 'js':
        contentType = 'text/javascript'
        break
      case 'css':
        contentType = 'text/css'
        break
      default:
        halt = true
        require('./controllers/404').get(req, res)
        break
    }
    //prevent all unauthorized file access
    
    if (!halt) {
      if (isImage) {//Images doesn't require charset while buffer o/p
        charset = null
      }
      res.writeHead(200, {
        'Content-Type': contentType
      })
      fs.readFile(__dirname + path, charset, (err, data) => {
        if (err) {
          throw err
        }
        res.write(data, charset)
        res.end()
      })
    }
  }
  else {
    switch (path) {
      case '/' :
      case '/home':
      case '/home/':
        require('./controllers/home').get(req, res)
        break
      case '/unsplashAUTH':
      case '/unsplashAUTH/':
        require('./controllers/unsplashAUTH').get(req, res)
        break
      default:
        require('./controllers/404').get(req, res)
        break
    }
  }
}