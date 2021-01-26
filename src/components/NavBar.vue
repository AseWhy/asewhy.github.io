<template>
    <div class="nav-bar" :class='{ active }'>
        <span class="nav-header"> <h1> {{ $locale['menu_nav'][pageSection.lang] }} </h1> <button class="hide-nav-bar" v-on:click="active = !active"> {{ active ? '❮❮' : '❯❯' }} </button> </span>

        <div class="nav-conteiner">
            <nav-node
                :children="pageData.sections"
            />
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    
    import NavNode from './NavNode.vue';

    export default {
        name: 'nav-bar',

        components: { 
            NavNode
        },

        computed: mapGetters([ 'pageData', 'pageSection' ]),

        data() {
            return {
                active: true
            }
        }
    }
</script>

<style>
    .content.single .nav-bar {
        display: none;
    }

    .nav-bar {
        grid-area: nav;
        width: 2.5rem;
    }

    .nav-bar.active {
        width: max-content;
    }

    .hide-nav-bar {
        background-color: var(--default-color);
        line-height: 1rem;
        font-size: 1.5rem;
        padding: 0.25rem;
        height: 2.5rem;
        margin: auto;
        border: none;
    }

    .hide-nav-bar:hover {
        background-color: var(--default-dirty-color);
    }

    .nav-bar .nav-header {
        display: grid;
        padding: 0.5rem 0.25rem 0;
        grid-template-areas: '. .';
        gap: 0.5rem;
    }

    .nav-bar .nav-header > h1 {
        display: none;
    }

    .nav-conteiner > .nav-member {
        padding: 0;
    }

    .nav-bar .nav-conteiner {
        display: none;
        position: sticky;
        overflow-y: scroll;
        height: calc(100vh - 5.5rem);
        padding: 0.5rem;
        top: 5rem;
    }

    .content.single .nav-bar {
        display: none;
    }

    .nav-member {
        padding-left: 0.5rem;
    }

    .nav-bar.active .nav-conteiner, .nav-bar.active .nav-header > h1 {
        display: block;
    }

    .container[ui='mobile'] .nav-bar {
        display: none;
    }
</style>