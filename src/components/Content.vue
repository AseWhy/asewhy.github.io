<template>
    <div class="content" :class="{ single }">
        <NavBar/>

        <div class="content-view">
            <div class="loader" :class='{ active: loading }'>
                <div class="mask">
                    <img :src="loadsrc">
                </div>
            </div>

            <div class="content-data" v-html='content'>

            </div>
        </div>
    </div>
</template>

<script>
    import { EVD_SECTION_LOAD_OK, EVD_SECTION_LOAD_START, EVD_PAGE_LOAD_OK } from '@/data/scripts/events-types.js'
    import { LOGO } from '@/data/scripts/static.js'

    import NavBar from './NavBar';

    export default {
        name: 'v-content',

        data() {
            return {
                content: 'Pending...',
                single: false,
                loading: false,
                loadsrc: LOGO
            }
        },

        components: {
            NavBar
        },

        mounted(){
            let left = null;

            function goTo(target_d){
                console.log(target_d)

                if(target_d) {
                    const target = document.getElementById(target_d);
                    const header = document.querySelector('nav.header');

                    if(target) {
                        const rect = target.getBoundingClientRect();

                        document.body.scrollBy({ 
                            top: rect.top - header.offsetHeight,
                            behavior: 'smooth'
                        });
                    } else {
                        document.body.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                } else {
                    document.body.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }

            window.addEventListener(EVD_PAGE_LOAD_OK, e => {
                this.$set(this.$data, 'loadsrc', e.detail.logo.src);

                this.$set(this.$data, 'single', e.detail.singlepage);
            })

            window.addEventListener(EVD_SECTION_LOAD_START, e => {
                if(!e.detail.currently)
                    this.$set(this.$data, 'loading', true);
            })

            window.addEventListener(EVD_SECTION_LOAD_OK, e => {
                if(!e.detail.currently && left)
                    clearInterval(left);

                this.$set(this.$data, 'content', e.detail.content);

                if(!e.detail.currently) {
                    left = setTimeout(() => {
                        left = null;

                        this.$set(this.$data, 'loading', false);

                        goTo(e.detail.target);
                    }, 500);
                } else {
                    goTo(e.detail.target);
                }
            })
        }
    }
</script>

<style>
    @keyframes load {
        from {
            transform: rotate(0deg) scale(1);
        }

        50% {
            transform: rotate(360deg) scale(0.95);
        }

        to {
            transform: rotate(360deg) scale(1);
        }
    }
    
    .content {
        padding: 0.25rem;
        display: grid;
        grid-template-areas: 'nav content';
        grid-template-columns: max-content auto;
        position: relative;
        gap: 0.5rem;
        width: 100%;
    }

    .content.single {
        grid-template-areas: 'content';
        grid-template-columns: 100%;
    }

    .content-view {
        grid-area: content;
        position: relative;
        padding: 0.5rem;
        overflow: hidden;
        text-align: justify;
    }

    .loader {
        transition: var(--base-transition);
        position: absolute;
        height: 0;
        display: none;
        opacity: 0;
        z-index: 2;
    }

    .contentlink {
        color: skyblue;
        cursor: pointer;
    }

    .loader.active {
        opacity: 1;
        display: block;
        width: 100%;
        height: 100%;
        background-color: var(--default-color);
    }

    .loader .mask {
        height: min(100%, calc(100vh - 4rem));
        display: grid;
        width: 100%;
    }

    .loader img {
        width: 150pt;
        height: 150pt;
        margin: auto;
        animation: load 0.85s infinite;
    }

    img {
        width: 100%;
    }

    pre {
        overflow-x: scroll;
        text-align: left;
        padding: 0.5rem;
        color: var(--sub-color);
        background-color: var(--default-dirty-color);
    }

    blockquote {
        margin: 0.5rem 0;
        padding-left: 1rem;
        border-left: 0.25rem var(--default-dirty-color) solid;
    }

    pre {
        overflow-x: scroll;
        text-align: left;
        padding: 0.5rem;
        background-color: var(--default-dirty-color);
    }

    code {
        font-family: 'FiraCode', 'Courier New', Courier, monospace;
    }

    code:not([class]) {
        color: rgb(250, 60, 117);
    }

    h1, h2 {
        margin: 0 0 0.5rem 0
    }

    h3, h4, h5, h6 {
        margin: 0;
    }

    strong {
        pointer-events: none;
    }

    th {
        background-color: var(--sub-color);
        color: var(--default-color);
        text-transform: capitalize;
    }

    td, th {
        padding: 0.5rem;
        margin: 1px;
    }

    a {
        pointer-events: all;
    }

    a > strong {
        text-decoration: underline;
    }

    .container[ui='mobile'] .content {
        grid-template-areas: 
                            'nav'
                            'content';
        grid-template-columns: max-content max-content;
        grid-template-columns: 100%;
    }

    /*!
    * StackOverflow.com light style
    *
    * @stackoverflow/stacks v0.56.0
    * https://github.com/StackExchange/Stacks
    */

    .hljs {
        display: block;
        overflow-x: auto;
        padding: 0.5rem;
        color: #2f3337;
        background: #f6f6f6;
    }

    .hljs-comment {
        color: #656e77;
    }

    .hljs-keyword,
    .hljs-selector-tag,
    .hljs-meta-keyword,
    .hljs-doctag,
    .hljs-section,
    .hljs-selector-class,
    .hljs-meta,
    .hljs-selector-pseudo,
    .hljs-attr {
        color: #015692;
    }

    .hljs-attribute {
        color: #803378;
    }

    .hljs-name,
    .hljs-type,
    .hljs-number,
    .hljs-selector-id,
    .hljs-quote,
    .hljs-template-tag,
    .hljs-built_in,
    .hljs-title,
    .hljs-literal {
        color: #b75501;
    }

    .hljs-string,
    .hljs-regexp,
    .hljs-symbol,
    .hljs-variable,
    .hljs-template-variable,
    .hljs-link,
    .hljs-selector-attr,
    .hljs-meta-string {
        color: #54790d;
    }

    .hljs-bullet,
    .hljs-code {
        color: #535a60;
    }

    .hljs-deletion {
        color: #c02d2e;
    }

    .hljs-addition {
        color: #2f6f44;
    }

    .hljs-emphasis {
        font-style: italic;
    }

    .hljs-strong {
        font-weight: bold;
    }
</style>