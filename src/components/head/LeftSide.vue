<template>
    <div class="leftside">
        <div class="section-name"> 
            <h2> {{ pageError.status ? 'Error' : pageData.name  }} </h2>    
        </div>

        <div class="section-path">
            {{ pageError.status ?  'Error/' + pageError.code + '/' + pageError.message : pageSection.path }}

            <div 
                class="localisation-snippets" 
                :lang="pageSection.lang"
                :lang_origin="pageSection.lang_origin"
                v-on:click="switchLang()"
            >
                <img src="@/data/images/langs-switch.jpg">
            </div>
        </div>

        <div 
            class="section-date" 
            v-if="
                pageError.status ? 
                    false :
                    pageSection.date != null
            "
        >
            {{ $locale['common_from'][pageSection.lang] }} {{ pageSection.date }}
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        methods: mapActions([ 'switchLang' ]),

        computed: mapGetters([ 'pageError', 'pageData', 'pageSection' ])
    }
</script>

<style>
    .section-info-data .section-path .localisation-snippets {
        overflow: hidden;
        padding: 0;
        margin: 0.25rem 0.5rem;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 20%;
        cursor: pointer;
    }

    .section-path {
        line-height: 2rem;
    }

    .section-info-data > .leftside * {
        color: var(--default-color);
        background-color: var(--sub-color);
        padding: 0.25rem;
        margin: 0.25rem 0;
        width: fit-content;
        text-transform: uppercase;
        display: flex;
    }

    .section-info-data .leftside .localisation-snippets > img {
        transition: var(--base-transition);
        position: relative;
        height: 100%;
        width: 200%;
        margin: 0px;
        left: 0px;
        padding: 0px;
    }

    .leftside .localisation-snippets[lang='en'] > img {
        left: -100%;
    }

    .leftside .localisation-snippets > img:hover {
        margin-left: -0.25rem;
    }

    .leftside .localisation-snippets[lang_origin='right'] > img:hover {
        margin-left: 0.25rem;
    }

    .section-info-data > .leftside {
        width: 100%;
    }
</style>