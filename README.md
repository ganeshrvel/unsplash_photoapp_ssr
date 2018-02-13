PhotoApp:
--------
Author: Ganesh Rathinavel

Requirements: node.js, modern browsers (sorry no ie support)

URL: https://github.com/ganeshrvel/unsplash_photoapp_ssr](https://github.com/ganeshrvel/unsplash_photoapp_ssr)



!!INFINITY SCROLL and SSR supported!!

> ExpressJS is not used in this project, feel free to add ExpressJS and convert the project accordingly.
> Server side rendering is programmed in vanilla Node.js while vanilla Javascript is used for client side scripting (no jquery).
> Unsplash has a usage limit of 50 requests per hour per API key
> Go to './model/unsplash-config-data.js' and replace the API keys with the keys generated from your unsplash developer account.

Note:

> Incase if you encounter the following error:  
> "invalid json response body at https://api.unsplash.com/photos/search?query=xxxxx&category=&page=xx&per_page=xx
> reason: Unexpected token R in JSON at position 0"  
> then go to "./model/unsplash-config-data.js" and swap the return objects (by moving them up or to the bottom).
>  This shall restore the access to the unsplash service.

Warning:

> The existing API keys which are configured inside './model/unsplash-config-data.js' were generated from my personal account.
> Please don't abuse the service.
> Replace them with your Unsplash API keys


----------


**For any commercial use, the existing Unsplash API keys must be removed/replaced with yours personal keys**
*Navigate to  './model/unsplash-config-data.js' change them.*

----------
Installation

    git clone https://github.com/ganeshrvel/unsplash_photoapp_ssr.git
    cd /path/unsplash_photoapp_ssr/
    npm install
    npm run start

----------
Dependencies:

    "babel-preset-env": "^1.6.0",
    "ejs": "^2.5.6",
    "node-fetch": "^1.7.1",
    "nodemon": "^1.11.0",
    "unsplash-js": "^4.6.0"
      