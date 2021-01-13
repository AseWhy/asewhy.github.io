import Vue from 'vue';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Theming, PageManager } from './data/scripts/main'

window.PageManager = PageManager;
window.Theming = Theming;

Object.assign(Vue.prototype, ($app => ({ $app }))({
  Theming,
  PageManager
}));

new Vue({
  el: '#app',

  components: { 
    App
  },

  template: '<App/>'
})
