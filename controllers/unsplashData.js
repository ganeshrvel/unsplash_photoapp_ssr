'use strict'

const unsplash_js = require('unsplash-js'),
  toJson = require('unsplash-js').toJson,
  unsplashConfigData = require('../model/unsplash-config-data')

function unsplashData () {
  const unsplash = new unsplash_js.default({
    applicationId: unsplashConfigData.unsplashConfigData.applicationId,
    secret: unsplashConfigData.unsplashConfigData.secret,
    callbackUrl: unsplashConfigData.unsplashConfigData.callbackUrl,
    bearerToken: unsplashConfigData.unsplashConfigData.bearerToken
  })
  
  /**
   * Unsplash has a usage limit of 50 requests per hour;
   * Incase "invalid json response body at https://api.unsplash.com/photos/search?query=xxxxx&category=&page=xx&per_page=xx reason: Unexpected token R in JSON at position 0" error is encountered, goto model/unsplash-config-data.js and
   * swap the return objects by moving them up or to the bottom.
   * This shall restore the access to the unsplash service.
   *
   *
   * The below api methods are only for authentication. leave it commented after access gaining incase of reaunthentication was needed.
   **/
  
  /**
   const authenticationUrl = unsplash.auth.getAuthenticationUrl( [
   "public",
   "read_user",
   "read_photos",
   "read_collections"
   ] );
   console.info( authenticationUrl );
   **/
  
  /**
   unsplash.auth.userAuthentication( "265a5e496e66e5f9301392996db4307a7df29cf991de090991bf08926fd944b8" )
   .then( toJson )
   .then( json => {
      unsplash.auth.setBearerToken( json.access_token );
      console.info( json );
    } );
   **/
  
  return {
    photos: function () {
      return {
        listPhotos (start, end, order_by) {
          return new Promise((resolve, reject) => {
            console.info('\nUnsplashData.js | Photos | listPhotos')
            unsplash.photos.listPhotos(start, end, order_by)
            .then(toJson)
            .then(json => {
              resolve(json)
            })
            .catch(err => {
              console.error('UnsplashData.js | Photos | listPhotos | Error encountered: ' + err)
              resolve(err)
            })
          })
        },
        searchPhotos (query, category = undefined, page, perPage) {
          return new Promise((resolve, reject) => {
            console.info('\nUnsplashData.js | Photos | searchPhotos')
            
            unsplash.photos.searchPhotos(query, category, page, perPage)
            .then(toJson)
            .then(json => {
              resolve(json)
            })
            .catch(err => {
              console.error('UnsplashData.js | Photos | searchPhotos | Error encountered: ' + err)
              resolve(err)
            })
            
          })
        },
        getRandomPhoto (jsonObj = {featured: true, count: 10}) {
          return new Promise((resolve, reject) => {
            console.info('\nUnsplashData.js | Photos | getRandomPhoto')
            
            unsplash.photos.getRandomPhoto(jsonObj)
            .then(toJson)
            .then(json => {
              resolve(json)
            })
            .catch(err => {
              console.error('UnsplashData.js | Photos | getRandomPhoto | Error encountered: ' + err)
              resolve(err)
            })
          })
        }
      }
    },
    
    stats: function () {
      console.info('\nUnsplashData.js | Stats')
      
      unsplash.stats.total()
      .then(toJson)
      .then(json => {
        return json
      })
      .catch(err => {
        console.info('UnsplashData.js | Stats | Error encountered: ' + err)
      })
    }
  }
  
  /**
   * More methods:
   photos().listPhotos( 1, 2, "latest" ) ;
   photos().searchPhotos( "india", undefined, 1, 2 ) ;
   photos().getRandomPhoto( { featured: true, count: 2 } );
   stats();
   **/
  
}

exports.unsplashData = unsplashData()