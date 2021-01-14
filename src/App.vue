<template>
  <div class="container" :ui='ui'>
    <v-header/>

    <div 
      class="header-mask"
    />

    <v-head/>
    <v-content/>
    <v-footer/>
  </div>
</template>

<script>
  import Header from './components/Header';
  import Head from './components/Head';
  import Content from './components/Content';
  import Footer from './components/Footer';

  window.addEventListener('click', (e) => {
    if(e.target.tagName != 'BUTTON')
        return;

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
})

  export default {
    name: 'App',

    data: () => {
      return {
        ui: 'ontouchstart' in window ? 'mobile' : 'desktop'
      }
    },

    components: {
      'v-header': Header,
      'v-head': Head,
      'v-content': Content,
      'v-footer': Footer
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
    overflow: hidden !important;
  }
</style>
