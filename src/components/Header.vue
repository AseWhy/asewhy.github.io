<template>
    <div class="header">
        <div class="head-mask container">
            <span class="mobile-element left-menu">
                ☰
            </span>

            <div class="theme-switch auto-switch" :class="{ switched: $app.Theming.current != 'default' }" v-on:click="switchTheme()">
                <img src="@/data/images/theme-switch.png">
            </div>

            <span class="sign-separator desktop-element">
                |
            </span>

            <span class='lg-text'>
                <a :href='page.link' class="header-item">{{page.name}}</a>
                <img class="header-item header-title" :class="{ 'no-depends': !page.depends }" :src="page.icon"/>
            </span>

            <span class="sign-separator desktop-element">
                |
            </span>

            <div class="header-buttons">
                <span v-for="(value, index) in buttons" :key='index'>
                    <button class='header-button' v-on:click='loadPage(value.target)'>{{value.label}}</button>
                    <span class='header-sepo' v-if="index + 1 < buttons.length">/</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import { EVD_PAGE_LOAD_OK, QUE_THEME_SWITCH } from '@/data/scripts/events-types.js'

    // Default logo
    import logo from '@/data/images/Bash-logo-vector-01.svg';

    export default {
        data: () => {
            return {
                page: {
                    name: '#!AseWhy/Astecom',
                    link: 'https://github.com/AseWhy',
                    icon: logo
                },

                buttons: [

                ],

                homepage: 'route:router'
            }
        },

        methods: {
            switchTheme(){
                window.dispatchEvent(new Event(QUE_THEME_SWITCH));

                this.$forceUpdate();
            },

            loadPage(section, par) {
                if(section.substring(0, 6) === 'route:')
                    this.$app.PageManager.load(section.substring(6))
                else
                    this.$app.PageManager.goTo(section, par);
            }
        },

        mounted(){
            window.addEventListener(EVD_PAGE_LOAD_OK, e => {
                this.$set(this.$data, 'buttons', Array.concat( e.detail.name != 'router' ? [{
                    target: this.$data.homepage,
                    label: '🏠 Домой'
                }] : [], Array.from(e.detail.buttons)));

                this.$set(this.$data.page, 'icon', e.detail.logo.src)
                this.$set(this.$data.page, 'link', e.detail.title.link)
                this.$set(this.$data.page, 'name', e.detail.title.label)
                this.$set(this.$data.page, 'depends', e.detail.logo.themed)
            })
        }
    }
</script>

<style>
    .header {
        width: 100%;
        height: 3.5em;
        position: fixed;
        display: block;
        z-index: 1;
        left: 0;
        top: 0;
    }

    .header-buttons {
        grid-area: buttons;
    }

    .theme-switch {
        grid-area: theme;
    }

    .head-mask {
        display: grid;
        grid-area: mask;
        grid-template-areas: 'theme . lg . buttons';
        grid-template-rows: 3.5em;
        grid-template-columns: max-content max-content max-content max-content max-content;
        background-color: var(--default-color);
        line-height: 3.5em;
        height: 3.5em;
        user-select: none;
        gap: 0.25em;
        padding: 0;
    }

    .header-item {
        height: 100%;
    }

    .head-mask > * {
        height: 100%;
    }

    .head-mask > .left-menu {
        grid-area: menu;
    }

    .head-mask > .lg-text {
        grid-area: lg;
        width: max-content;
    }

    .head-mask .header-title {
        width: 3.5em;
        height: 3.5em;
    }

    .head-mask > span.sign-separator {
        width: 1.5em;
        max-width: 1.5em;
        text-align: center;
    }

    .head-mask .theme-switch {
        height: 2.5em;
        display: grid;
        width: 2em;
        margin: 0.5em 0 0.5em 0.5em;
        filter: var(--imgs-def-filter);
        overflow: hidden;
        grid-area: theme;
    }

    .head-mask .theme-switch img {
        width: 4em;
        height: 2em;
        top: 0.25em;
        left: 0;
        position: relative;
        pointer-events: none;
        transition: var(--base-transition);
    }

    .head-mask .theme-switch.switched img {
        left: -2em;
    }

    .head-mask .header-buttons {
        grid-area: buttons;
    }

    .head-mask .header-buttons > :not(:first-child)::marker {
        content: '/';
    }

    .head-mask .header-button {
        border: none;
        position: relative;
        overflow: hidden;
        background-color: var(--default-color);
        height: 100%;
    }

    .head-mask .header-button:hover {
        text-decoration: underline;
    }

    .head-mask .div-name {
        line-height: 1em;
        font-size: 3em;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .head-mask .renderpath {
        margin-top: auto;
        display: grid;
        text-transform: uppercase;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        width: fit-content;
        padding: 0.25em;
    }

    .head-mask .left-menu {
        width: 2em;
        text-align: center;
        font-size: 1.5em;
        line-height: 2.25em;
        grid-area: menu;
    }

    a {
        text-decoration: none;
        background-color: transparent;
        color: var(--sub-color);
    }

    img.header-item {
        filter: var(--imgs-def-filter);
    }

    img.header-item.no-depends {
        filter: none;
    }

    .container[ui='mobile'] .head-mask {
        grid-template-areas: 'menu lg . buttons theme';
        grid-template-columns: max-content max-content max-content max-content auto;
    }

    .container[ui='mobile'] .header .theme-switch {
        margin-left: auto;
        margin-right: 0.5em;
    }

    .container[ui='mobile'] .header-buttons {
        position: absolute;
        display: grid;
        left: -100%;
        width: 60%;
        height: calc(100% - 3.5em);
        grid-auto-flow: row;
        grid-auto-rows: 3.5em;
        top: 3.5em;
        background: var(--default-color);
        transition: var(--base-transition);
    }
</style>