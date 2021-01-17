<template>
    <div class="content" :class="{ single: pageError.status ? true : pageData.single }">
        <nav-bar/>

        <div class="error-content" v-if="pageError.status">
            <h2> Ошибка загрузки страницы {{ pageError.code }}! </h2>

            <p class='p-error-message'>
                Сообщение обработчика: <br>
                <span class='p-error-label'> {{ pageError.message }} </span>
            </p>

            <button class='button-go-home' a-href='route:router'>На главную</button>
        </div>
        
        <div class="content-view" v-else>
            <div class="loader" :class='{ active: pageSection.loading }'>
                <div class="mask">
                    <img :src="pageData.loadsrc">
                </div>
            </div>

            <div class="content-data" v-html='pageSection.content'>

            </div>
        </div>

        <div class="last-updated" v-if="pageSection.date != null">
            Обновлено {{ pageSection.date }}
        </div>
    </div>
</template>

<script>
    import NavBar from './NavBar';

    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'v-content',

        components: {
            NavBar
        },

        computed: mapGetters([ 'pageContent', 'pageData', 'pageError', 'pageSection' ])
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

    .last-updated {
        padding: 0.5rem;
        background: var(--default-dirty-color);
        margin: 0.25rem 0;
        grid-area: date;
    }
    
    .content {
        display: grid;
        grid-template-areas: 
                'nav content'
                'date date';
        grid-template-columns: auto auto;
        position: relative;
        gap: 0.5rem;
        width: 100%;
    }
    
    .content-data {
        z-index: -1;
        padding: 0.5rem;
    }

    .content.single {
        grid-template-areas: 
                    'content'
                    'date';
        grid-template-columns: 100%;
    }

    .content-view {
        grid-area: content;
        position: relative;
        overflow: hidden;
        text-align: justify;
    }

    .loader {
        transition: var(--base-transition);
        position: absolute;
        height: 0;
        display: none;
        opacity: 0;
        z-index: 0;
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

    .p-error-label {
        display: block;
        margin: 0.25rem 0;
        padding: 0.5rem;
        border-left: 0.25rem solid var(--default-dirty-color);
    }

    .p-error-message {
        margin: 0;
    }

    .error-content {
        padding: 0.5rem;
    }

    .button-go-home {
        width: min(300pt, 100%);
        padding: 0.25rem;
        background-color: var(--default-color);
        border: none;
        text-align: left;
    }

    .button-go-home:hover {
        background-color: var(--default-dirty-color);
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
                        'date';
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