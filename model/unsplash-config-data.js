let unsplashConfigData = function () {
  /*
  * Unsplash has a usage limit of 50 requests per hour;
  * Incase "invalid json response body at https://api.unsplash.com/photos/search?query=xxxxx&category=&page=xx&per_page=xx reason: Unexpected token R in JSON at position 0" error is encountered,
  * swap the return objects by moving them up or to the bottom.
  * This shall restore the access to the unsplash service.
  **/
  
  return {
    applicationId: '7c1dd790ce567d9f7627af82172654dc2a7165b82f11bf0f403f73dad878fa7e',
    secret: '3fe8c68eb28f45ebacd675defafd908cd7fcf1d94a91a0daefae0177a97d5d55',
    callbackUrl: 'http://127.0.0.1:3001/unsplashAUTH',
    bearerToken: 'e2b64ea6f6afa8adbf1368e994389708bf6486dbea9267161b9ae03212e0ef67'
  }
  
  return {
    applicationId: 'aba306d26a4d9e3f8277481d071371430f766934e9d86e2048096b943ef61207',
    secret: 'a37e53d5bc2115a4199f1999d6495206f9d2ebcf73c036540f5995a164da5e39',
    callbackUrl: 'http://127.0.0.1:3001/unsplashAUTH/',
    bearerToken: '609efd8cc5d7650759e2ae8d9a60abeaa4fb6ad6574975e61bb8e07245eb7800'
  }
  
  return {
    applicationId: '9e8a89633480b981e93d2080e2c73a510d05a96388b4263fb7a3cbc6547c0ca0',
    secret: 'e6c01a6159b649783adaf8451529b31d1a087dd6c708809b6d0d4095448cb106',
    callbackUrl: 'http://127.0.0.1:3001/unsplashAUTH/',
    bearerToken: '2e606660f15feb22e3fe2c86cf45637af4fa1a3a4cc4a24af05f3677aaf9b17f'
  }
  
  return {
    applicationId: '823716e71b0e9e444e02a132c43bc906cb2f58e5af0e10b523fd2c3ed2b163da',
    secret: '37a6796fb318cb8d61d54eb2fc656272376979e3272a4ea5b960c624e3771c12',
    callbackUrl: 'http://127.0.0.1:3001/unsplashAUTH',
    bearerToken: ''
  }
}
exports.unsplashConfigData = unsplashConfigData()