<template>
  <div class="container" :ui='ui'>
    <Header/>
    <Head/>
    <Content/>
    <Footer/>
  </div>
</template>

<script>
  import Header from './components/Header';
  import Head from './components/Head';
  import Content from './components/Content';
  import Footer from './components/Footer';

  export default {
    name: 'App',

    data: () => {
      return {
        ui: 'ontouchstart' in window ? 'mobile' : 'desktop'
      }
    },

    components: {
      Header,
      Head,
      Content,
      Footer
    }
  }
</script>

<style>
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
    background-color: var(--default-color) !important;
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
      width: 0.25em;
      height: 0.25em;
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
    background: rgba(0, 0, 0, 0.4);
    transform: scale(0);
    position: absolute;
    animation: ripple 0.5s linear;
    pointer-events: none;
    opacity: 1;
  }
</style>
