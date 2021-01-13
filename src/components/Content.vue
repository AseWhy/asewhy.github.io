<template>
    <div class="content">
        <NavBar v-if='!single'/>

        <div class="loader" :class='{ active: loading }'>
            <div class="mask">
                <img :src="loadsrc">
            </div>
        </div>

        <div class="content-view" v-html='content'>

        </div>
    </div>
</template>

<script>
    import { EVD_SECTION_LOAD_OK, EVD_SECTION_LOAD_START, EVD_PAGE_LOAD_OK } from '@/data/scripts/events-types.js'
    import NavBar from './NavBar';

    // Default logo
    import logo from '@/data/images/Bash-logo-vector-01.svg';

    export default {
        data: () => {
            return {
                content: 'Pending...',
                single: true,
                loading: false,
                loadsrc: logo
            }
        },

        components: {
            NavBar
        },
        
        methods: {
            loadPage(section, par) {
                
            }
        },

        mounted(){
            let left = null;

            window.addEventListener(EVD_PAGE_LOAD_OK, e => {
                this.$set(this.$data, 'loadsrc', e.detail.logo.src);
            })

            window.addEventListener(EVD_SECTION_LOAD_START, e => {
                this.$set(this.$data, 'loading', true);
            })

            window.addEventListener(EVD_SECTION_LOAD_OK, e => {
                if(left)
                    clearInterval(left);

                this.$set(this.$data, 'content', e.detail.content);

                left = setTimeout(() => this.$set(this.$data, 'loading', false), 500);
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
        position: relative;
        margin-top: 3.5em;
        padding: 0.25em;
    }

    .loader {
        transition: var(--base-transition);
        position: absolute;
        height: 0;
        display: none;
        opacity: 0;
    }

    .loader.active {
        opacity: 1;
        display: block;
        width: 100%;
        height: 100%;
        background-color: var(--default-color);
    }

    .loader .mask {
        height: min(100%, calc(100vh - 4em));
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
        padding: 0.5em;
        color: var(--sub-color);
        background-color: var(--default-dirty-color);
    }

    blockquote {
        margin: 0.5em 0;
        padding-left: 1em;
        border-left: 0.25em var(--default-dirty-color) solid;
    }

    pre {
        overflow-x: scroll;
        text-align: left;
        padding: 0.5em;
        background-color: var(--default-dirty-color);
    }

    code {
        font-family: 'FiraCode', 'Courier New', Courier, monospace;
    }

    code:not([class]) {
        color: rgb(250, 60, 117);
    }

    h1, h2 {
        margin: 0 0 0.5em 0
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
        padding: 0.5em;
        margin: 1px;
    }

    a {
        pointer-events: all;
    }

    a > strong {
        text-decoration: underline;
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
        padding: 0.5em;
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