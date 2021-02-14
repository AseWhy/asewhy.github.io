<template>
    <div class="content-view">
        <div class="loader" :class='{ active: pageSection.loading }'>
            <div class="mask">
                <img :src="pageData.loadsrc">
            </div>
        </div>

        <div class="content-data" v-html='pageSection.content'>

        </div>
    </div>
</template>


<script>
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: 'content-view',

        computed: mapGetters([ 'pageSection', 'pageData' ]),

        methods:  mapActions([ 'updateContent' ]),

        updated() { this.updateContent() },

        mounted() { this.updateContent() }
    }
</script>

<style>
    @import '../../data/styles/marked.css';

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

    .content-view {
        grid-area: content;
        position: relative;
        overflow: hidden;
        text-align: justify;
        min-height: 150pt;
    }

    .loader {
        transition: var(--base-transition);
        position: absolute;
        height: 0;
        display: none;
        opacity: 0;
        z-index: 1;
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
    
    .content-data {
        z-index: -1;
        padding: 0.5rem;
    }

    .timeline-data-container {
        display: inline-block;
    }
    
    .timeline {
        text-align: left;
        border-left: 0.125rem solid;
        display: block;
        padding: 0 0.5rem;
    }

    .timeline[started] {
        padding-bottom: 0.5rem;
    }

    img {
        width: 100%;
    }

    li {
        text-align: left;
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
        font-family: 'Fira Code', 'Courier New', Courier, monospace;
        font-weight: 600;
    }

    code:not([class]) {
        color: rgb(250, 60, 117);
    }

    h1, h2 {
        margin: 0 0 0.5rem 0;
        text-align: left;
    }

    h3, h4, h5, h6 {
        margin: 0;
        text-align: left;
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
                        'content'
                        'info';
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