<template>
    <div class="header-buttons" :class="{ active: headerMenuActive }">
        <div class="buttons-mask">
            <span 
                v-for="(value, index) in headerButtons" 
                :key='index' 
                :class="{ highlight: value.highlight }" 
                v-on:click="value.clicked && value.clicked() || hideMenu()"
            >
                <button 
                    class='header-button' 
                    :a-href='value.target'
                    :class="{
                        selected: headerData.selected == value.target
                    }"
                    :ref="headerData.selected == value.target ? 'movment' : null"
                >
                    {{ value.label[pageSection.lang] }}
                </button>

                <span 
                    class='header-sepo desktop-element' 
                    v-if="index + 1 < headerButtons.length"
                >
                    /
                </span>
            </span>
        </div>

        <div class="caret"></div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    function resize(){
        const caret = document.querySelector('.caret')
            , container = document.querySelector('.container');

        if(container && container.getAttribute('ui') == 'desktop')
            if(this.$refs.movment && this.$refs.movment[0]) {
                caret.style.left = this.$refs.movment[0].offsetLeft + 'px';
                caret.style.width = this.$refs.movment[0].offsetWidth + 'px';
            } else {
                caret.style.left = '0px';
                caret.style.width = '0px';
            }
    }

    let resize_t;
    let _rc = ResizeObserver;

    export default {
        name: 'head-buttons',

        computed: mapGetters([ 'headerMenuActive', 'headerData', 'pageSection', 'headerButtons' ]),

        methods: mapActions([ 'hideMenu' ]),

        async mounted() {
            resize_t = resize.bind(this);

            if(_rc == null)
                _rc = await import('resize-observer');

            new _rc(resize_t).observe(document.documentElement);

            resize_t();
        },

        updated: () => resize_t()
    }
</script>

<style>
    .header-buttons {
        grid-area: buttons;
        position: relative;
    }

    .header .caret {
        position: absolute;
        top: calc(100% - 0.25rem);
        height: 0.25rem;
        background: var(--sub-color);
        transition: var(--base-transition);
        z-index: 10;
    }

    .head-mask .header-buttons {
        grid-area: buttons;
        overflow-y: hidden;
        overflow-x: scroll;
    }

    .buttons-mask {
        width: max-content;
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
        outline: none;
    }

    .head-mask .header-button:hover {
        text-decoration: underline;
    }

    .container[ui='mobile'] .highlight .header-button {
        background-color: var(--default-dirty-color);
    }

    .container[ui='mobile'] .buttons-mask {
        display: grid;
        width: 0;
        height: calc(100vh - 3.5rem);
        grid-auto-flow: row;
        grid-auto-rows: 3.5rem;
        background: var(--default-semi-opacity);
        transition: var(--base-transition);
        backdrop-filter: blur(5rem);
        opacity: 0;
        overflow-x: hidden;
    }

    .container[ui='mobile'] .header-buttons {
        position: absolute;
        overflow: initial;
        left: 0;
        top: 4.5rem;
        height: max-content;
    }

    .container[ui='mobile'] .header-button {
        width: 100%;
        background: transparent;
    }

    .container[ui='mobile'] .header-buttons.active .buttons-mask {
        opacity: 1;
        width: min(80vw, 400pt);
    }

    @supports ((-webkit-backdrop-filter: blur(2rem)) or (backdrop-filter: blur(2rem))) {
        .container[ui='mobile'] .buttons-mask {
            background-color: var(--default-semi-opacity-1);
            backdrop-filter: blur(2rem);
        }
    }
</style>