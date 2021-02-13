<template>
  <div class="container" :ui='ui'>
    <v-header/>

    <div 
      class="header-mask"
    />

    <v-modal/>
    <v-head/>
    
    <v-content/>
    <v-preview/>

    <v-footer/>
  </div>
</template>

<script>
  import Header from './components/Header';
  import Head from './components/Head';
  import Content from './components/Content';
  import Footer from './components/Footer';
  import Preview from './components/Preview';
  import Modal from './components/Modal';

  import { mapActions } from 'vuex';

  export default {
    name: 'App',

    methods: mapActions([ 'watchPage', 'watchHeader', 'watchTheme']),

    data() {
      return {
        ui: 'ontouchstart' in window || window.innerWidth < 768 ? 'mobile' : 'desktop'
      }
    },

    mounted(){
      let cw = 0,
          sw = 0,
          ws = 0;

      window.addEventListener('resize', e => {
        const header_b = document.querySelector('.header-buttons');

        if(this.ui == 'desktop') {
          sw = header_b.scrollWidth;
          cw = header_b.clientWidth;
          ws = window.innerWidth;
        }

        if(header_b) {
          if(this.ui == 'desktop') {
            if(cw < sw) {
              this.ui = 'mobile';
            }
          } else {
            if(window.innerWidth > ws) {
              this.ui = 'desktop';
            }
          }
        } else {
          if(window.innerWidth < 768) {
            this.ui = 'mobile';
          } else {
            this.ui = 'desktop';
          }
        }
      });

      // Мониторим изменения на странице
      this.watchPage();
      // Мониторим изменения в заголовке
      this.watchHeader();
      // Мониторим изменения темы
      this.watchTheme();
    },

    components: {
      'v-header': Header,
      'v-head': Head,
      'v-content': Content,
      'v-footer': Footer,
      'v-modal': Modal,
      'v-preview': Preview
    }
  }
</script>

<style>
  /* Local fonts */
  @import url(bootstrap/dist/css/bootstrap.min.css);
  @import url(simplemde/dist/simplemde.min.css);

  /* Google fonts */
  @import url(https://fonts.googleapis.com/css2?family=Fira+Code:wght@300&display=swap);

  @keyframes ripple {
    100% {
        transform: scale(2);
        opacity: 0;
    }
  }

  * {
    color: var(--sub-color)
  }

  html, body {
    overflow-x: hidden;
    background-color: var(--default-color);
    transition: var(--base-transition);
    color: var(--sub-color);
    scrollbar-width: thin;
    overflow-y: auto;
    min-height: 100%;
    min-width: 100%;
    max-width: 100%;
    height: 100%;
    width: 100%;
    margin: 0;
  }

  .header-mask {
    height: 4.5rem;
  }

  .container {
    height: auto;
  }

  .container[ui='desktop'] .mobile-element {
    display: none;
  }

  .container[ui='mobile'] .desktop-element {
    display: none;
  }

  /* webkit scrollbars */
  ::-webkit-scrollbar {
      width: 0.25rem;
      height: 0.25rem;
  }

  ::-webkit-scrollbar-track {
      background: var(--default-color);
  }

  ::-webkit-scrollbar-thumb {
      background: var(--sub-color);
  }

  @keyframes ripple {
    100% {
        transform: scale(2);
        opacity: 0;
    }
  }

  span.ripple {
    width: 0;
    height: 0;
    border-radius: 50%;
    background: var(--defult-ripple-color);
    transform: scale(0);
    position: absolute;
    animation: ripple 0.5s linear;
    pointer-events: none;
    opacity: 1;
  }

  button {
    position: relative;
    overflow: hidden;
  }

  a * {
    pointer-events: none;
  }
</style>
