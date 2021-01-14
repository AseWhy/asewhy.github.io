import Vue from 'vue';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Theming, PageManager, ImageHandler } from './data/scripts/main'

window.PageManager = PageManager;
window.Theming = Theming;
window.ImageHandler = ImageHandler;

Object.assign(Vue.prototype, ($app => ({ $app }))({
  Theming,
  PageManager,
  ImageHandler
}));

new Vue({
  el: '#app',

  components: { 
    App
  },

  template: '<App/>'
});