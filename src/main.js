import Vue from 'vue';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Theming, PageManager, ImageHandler } from './data/scripts/main'

window.PageManager = PageManager;
window.Theming = Theming;
window.ImageHandler = ImageHandler;

Object.assign(Vue.prototype, (($app, $methods) => ({ $app, $methods }))({
  Theming,
  PageManager,
  ImageHandler
}, {
  // Be added
}));

(App => {
  window.addEventListener('click', async e => {
    switch(e.target.tagName) {
      case 'A':
        e.preventDefault();
  
        if(await App.$methods.confirm('Вы уверены что хотите перейти по адресу "<span class="text-danger">' + e.target.href + '</span>"?')){
          window.location = e.target.href;
        }
      break;
      case 'BUTTON':
        e.preventDefault();
  
        // Remove any old one
        const ripple = document.querySelectorAll('.ripple');
  
        if (ripple) {
            for(let i = 0, leng = ripple.length; i < leng; i++)
                ripple[i].remove();
        }
  
        // Setup
        let buttonWidth = e.target.offsetWidth
          , buttonHeight = e.target.offsetHeight;
  
        // Make it round!
        if(buttonWidth >= buttonHeight) {
            buttonHeight = buttonWidth;
        } else {
            buttonWidth = buttonHeight;
        }
  
        // Get the center of the element
        const x = e.offsetX == undefined ? e.layerX : e.offsetX - buttonWidth / 2
            , y = e.offsetY == undefined ? e.layerY : e.offsetY - buttonHeight / 2;
  
        // Add the element
        const span = document.createElement('span');
  
        span.className = 'ripple';
  
        span.style.width = buttonWidth + 'px';
        span.style.height = buttonHeight + 'px';
  
        span.style.top = y + 'px';
        span.style.left = x + 'px';
  
        e.target.appendChild(span);
      break;
    }
  });
})(
  new Vue({
    el: '#app',
  
    components: { 
      App
    },
  
    template: '<App/>'
  })
);