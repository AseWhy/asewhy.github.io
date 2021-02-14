<template>
    <div class="content" :class="{ single: pageError.status ? true : pageData.single }">
        <nav-bar/>

        <content-error v-if="pageError.status"/>
        <content-view v-else/>
        
        <content-info/>
    </div>
</template>

<script>
    import NavBar from './NavBar';
    import Error from './content/Error';
    import View from './content/View';
    import Info from './content/Info';

    import { mapGetters } from 'vuex';

    export default {
        name: 'v-content',

        components: {
            NavBar,
            'content-error': Error,
            'content-view': View,
            'content-info': Info
        },

        computed: mapGetters([ 'pageError', 'pageData' ])
    }
</script>

<style>    
    .content {
        display: grid;
        grid-template-areas: 
                'nav content'
                'info info';
        grid-template-columns: auto auto;
        position: relative;
        gap: 0.5rem;
        width: 100%;
    }
    
    .content-data .preview {
        width: 300px;
        margin: 0.25rem;
        border: none;
        background-color: var(--default-color);
        border: 1px solid var(--sub-color);
        display: block;
        padding: 0.25rem;
        margin-top: 1rem;
        z-index: 0;
    }
    
    .content.single {
        grid-template-areas: 
                    'content'
                    'info';
        grid-template-columns: 100%;
    }

    .contentlink {
        color: skyblue;
        cursor: pointer;
    }
</style>