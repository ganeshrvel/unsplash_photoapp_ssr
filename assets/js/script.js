'use strict'

/**
 * Description: var_dump
 * console.log alias for easy debugging
 * param:arg
 */
function var_dump (arg) {
  console.log(arg)
}

(function () {
  class photoapp_main {
    constructor () {
      let isMobile = false,
        ajax_search_keyup = setTimeout(() => {
        }, 0)
    };
    
    init () {
      this._bindUI()
    };
    
    _dom () {
      //cache of the dom elements.
      return {
        isMobile: 'isMobile',
        logo_wrapper: 'logo-wrapper',
        search_bar_wrapper: 'search-bar-wrapper',
        search: 'search',
        float_right: 'float-right',
        data_render_type: 'data-render-type',
        data_render_pageno: 'data-render-pageno',
        noitemsfound: 'noitemsfound',
        items_inner_wrapper: 'items-inner-wrapper',
        pageLoadingSpinner: 'pageLoadingSpinner',
      }
    };
    
    _render_dom () {
      return {
        search_box_onclick: function () {
          let $logo_wrapper = document.getElementsByClassName(this._dom().logo_wrapper)[0],
            $search_bar_wrapper = document.getElementsByClassName(this._dom().search_bar_wrapper)[0]
          
          $search_bar_wrapper.classList.remove(this._dom().float_right)
          $logo_wrapper.classList.remove('visible')
          $logo_wrapper.classList.add('hidden')
        }.bind(this),
        search_box_onblur: function () {
          let $logo_wrapper = document.getElementsByClassName(this._dom().logo_wrapper)[0],
            $search_bar_wrapper = document.getElementsByClassName(this._dom().search_bar_wrapper)[0]
          
          $search_bar_wrapper.classList.add(this._dom().float_right)
          $logo_wrapper.classList.remove('hidden')
          $logo_wrapper.classList.add('visible')
        }.bind(this)
      }
    };
    
    //trigger event resize
    _resizeHandler () {
      window.onresize = (() => {
        //checks if this is a mobile device of not
        this._check_isMobile(this._dom().isMobile)
      })()
    };
    
    _check_isMobile (div) {
      let visibility = document.getElementById(div).offsetParent
      return this.isMobile = null === visibility
    };
    
    _search_handler () {
      //Search box click even handler
      let $search = document.getElementById(this._dom().search),
        $data_render_type = document.getElementById(this._dom().data_render_type),
        $data_render_pageno = document.getElementById(this._dom().data_render_pageno),
        lock_pageno = 0
      
      $search.onfocus = (() => {//onclick of search box
        if (this.isMobile) {
          this._render_dom().search_box_onclick()
        }
      })
      
      $search.onblur = (() => {//onblur of search box
        this._render_dom().search_box_onblur()
      })
      
      $search.onkeyup = (function (e) {
        clearTimeout(this.ajax_search_keyup)
        
        if (e.keyCode === 13) {
          make_search(true)
        }
        else {
          this.ajax_search_keyup = setTimeout(make_search, 500)
        }
      }).bind(this)
      
      $search.oninput = ((e) => {
        if ('' === $search.value) {
          make_search(true)
        }
      })
      
      document.addEventListener('scroll', (event) => {
        _infinity_check_div()
      })
      
      let _infinity_check_div = function () {
        try {
          let last_div = document.querySelector('.items-container > div:last-child'),
            last_div_offset = last_div.offsetTop + last_div.clientHeight,
            pageOffset = window.pageYOffset + window.innerHeight,
            data_render_pageno_value = $data_render_pageno.getAttribute(this._dom().data_render_pageno)
          data_render_pageno_value = parseInt(data_render_pageno_value)
          if (pageOffset > last_div_offset - 30) {
            if (lock_pageno !== data_render_pageno_value + 1) {
              make_search(true, true)
            }
          }
        }
        catch (e) {
          console.error('Errors: ' + e)
        }
      }.bind(this)
      _infinity_check_div()
      
      let make_search = function (force, append = false) {
        let search_text = $search.value,
          data_render_type_value = $data_render_type.getAttribute(this._dom().data_render_type),
          data_render_pageno_value = $data_render_pageno.getAttribute(this._dom().data_render_pageno),
          query_type = 'search',
          pageno = 1
        data_render_pageno_value = parseInt(data_render_pageno_value)
        if (!force && search_text.length !== 0 && search_text.length < 3) {
          return null
        }
        
        $data_render_type.setAttribute(this._dom().data_render_type, 'client')
        if (!append) {
          this._clear_result_page()
          lock_pageno = pageno
          $data_render_pageno.setAttribute(this._dom().data_render_pageno, lock_pageno.toString())
        }
        else {
          pageno = lock_pageno = data_render_pageno_value + 1
        }
        this.spinner_handler().show()
        
        if (search_text.length === 0) {
          query_type = 'list'
        }
        
        this.ajax_get('/unsplashAUTH/?search=' + search_text + '&pageno=' + parseInt(pageno) + '&query_type=' + query_type)
        .then((data) => {
          if ('' === data.trim()) {
            data = []
          }
          else {
            data = JSON.parse(data)
          }
          
          this._render_result_page(data, append)
        })
        .catch((err) => {
          console.error(err)
        })
      }.bind(this)
    };
    
    _render_result_page (JSONdata, append = false) {
      let $data_render_pageno = document.getElementById(this._dom().data_render_pageno),
        lock_pageno = $data_render_pageno.getAttribute(this._dom().data_render_pageno)
      lock_pageno = parseInt(lock_pageno)
      ++lock_pageno
      if (!JSONdata[0]) {
        this.spinner_handler().hide()
        if (append) {
          return null
        }
        document.getElementsByClassName(this._dom().noitemsfound)[0].classList.remove('hide')
        return null
      }
      let render_html = ejs.render(`
				<% for (var i = 0; i < photo_json_value.length; i ++) { %>
				<div class="items-wrapper">
					<div class="white items">
						<div class="item-inner-wrapper">
							<img src="<%= photo_json_value[i].urls.small %>" alt="<%= photo_json_value[i].user.name %>">
							<div class="item-name truncate text-bold"><%= photo_json_value[i].user.name %></div>
							<div class="item-description text-justify"><%= photo_json_value[i].description %></div>
							<div class="row">
								<div class="item item-likes valign-wrapper grid-xs-3">
									<% if (null !== photo_json_value[i].likes) { %>
									<i class="fa fa-heart pulse valign" aria-hidden="true"></i>
									<span class="data valign"><%= photo_json_value[i].likes %></span>
									<% } %>
								</div>
								<div class="item item-location valign-wrapper grid-xs-8">
									<% if (null !== photo_json_value[i].user.location) { %>
									<i class="fa fa-map-marker pulse valign" aria-hidden="true"></i>
									<span class="data valign truncate"><%= photo_json_value[i].user.location %></span>
									<% } %>
								</div>
							</div>
						</div>
					</div>
				</div>
				<% } %>`, {photo_json_value: JSONdata})
      this.spinner_handler().hide()
      document.getElementsByClassName(this._dom().noitemsfound)[0].classList.add('hide')
      if (append) {
        $data_render_pageno.setAttribute(this._dom().data_render_pageno, lock_pageno.toString())
        document.getElementsByClassName(this._dom().items_inner_wrapper)[0].insertAdjacentHTML('beforeend', render_html)
        return null
      }
      document.getElementsByClassName(this._dom().items_inner_wrapper)[0].innerHTML = render_html
    }
    
    _clear_result_page () {
      document.getElementsByClassName(this._dom().noitemsfound)[0].classList.add('hide')
      document.getElementsByClassName(this._dom().items_inner_wrapper)[0].innerHTML = ''
    }
    
    ajax_get (url) {
      return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest()
        req.open('GET', url)
        req.onload = () => req.status === 200 ? resolve(req.response) : reject(Error(req.statusText))
        req.onerror = (e) => reject(Error(`Network Error: ${e}`))
        req.send()
      })
    };
    
    spinner_handler () {
      return {
        show: function () {
          let _render_spinner_html = function () {
            return ` <div class="load-spinner-wrapper"><div class="row"><div class="text-center"><div class="preloader-wrapper preloader-style-adjust small active"><div class="spinner-layer spinner-blue"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-red"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-yellow"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div><div class="spinner-layer spinner-green"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div></div></div>`
          }
          document.getElementsByClassName(this._dom().pageLoadingSpinner)[0].innerHTML = _render_spinner_html()
        }.bind(this),
        hide: function () {
          document.getElementsByClassName(this._dom().pageLoadingSpinner)[0].innerHTML = ''
        }.bind(this)
      }
    };
    
    _bindUI () {
      try {
        this._resizeHandler()
        this._search_handler()
      }
      catch (e) {
        console.error('Errors: ' + e)
      }
    };
  }
  
  let mainObj = new photoapp_main()
  mainObj.init()
})()

