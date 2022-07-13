import Vue from 'vue';
import App from './App';
import store from './store';

import locale from './data/locale.json';

// Set global locale
Vue.prototype.$locale = locale;

(App => {
  const { PageManager, HookManager } = require('./data/scripts/main');

  window.addEventListener('click', async e => {
    // For all clicks
    if(e.target.hasAttribute('a-href')) {
      e.preventDefault();

      PageManager.goLink(e.target.getAttribute('a-href'));
    }
    // Handle hooks
    if(e.target.hasAttribute('a-hook')) {
      e.preventDefault();

      HookManager.dispatchHook(e.target.getAttribute('a-hook'));
    }

    switch(e.target.tagName) {
      case 'A':
        if(e.target.href != null && e.target.href != '') {
          e.preventDefault();

          if(await astecConfirm('Вы уверены что хотите перейти по адресу "<span class="text-danger">' + e.target.href + '</span>"?')){
            window.location = e.target.href;
          }
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

    store,

    components: {
      App
    },

    template: '<App/>'
  })
);
