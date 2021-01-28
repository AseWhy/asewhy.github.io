<template>
    <div class="head">
        <canvas ref="rendertarget" class='render-header'>

        </canvas>

        <div class="front-content">
            <div class="gl-version"> Powered by WebGL 2.0 </div>

            <div class="section-path-data">
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
        </div>
    </div>
</template>

<script>
    import { ImageHandler } from '@/data/scripts/main';
    import { GlitchProgram } from '@/data/programs/glitch';

    import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'v-head',

        methods: mapActions([ 'switchLang' ]),

        computed: mapGetters([ 'pageData', 'pageError', 'pageSection' ]),

        beforeUpdate() {
            const headers = this.$store.getters.pageData.header;

            if(Array.isArray(headers)) {
                ImageHandler.setTexture(headers[Math.floor(Math.random() * headers.length)]);
            } else {
                ImageHandler.setTexture(headers);
            }
        },

        mounted() {
            // Рисуем по ссылке на холсте
            ImageHandler.draw(this.$refs.rendertarget);
            // Начинаем обработку этого холста
            ImageHandler.enable(GlitchProgram);
        }
    }
</script>

<style>
    .head {
        --height: max(300pt, 10rem);
        max-height: var(--height);
        width: 100%;
        overflow: hidden;
    }

    .render-header {
        width: 100%;
        height: var(--height);
    }

    .section-path > .localisation-snippets {
        overflow: hidden;
        padding: 0;
        margin: 0.25rem 0.5rem;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 20%;
        cursor: pointer;
    }

    .localisation-snippets > img {
        transition: var(--base-transition);
        position: relative;
        height: 100%;
        width: 200%;
        margin: 0px;
        left: 0px;
        padding: 0px;
    }

    .localisation-snippets > img:hover {
        margin-left: -0.25rem;
    }

    .localisation-snippets[lang_origin='right'] > img:hover {
        margin-left: 0.25rem;
    }

    .localisation-snippets[lang='en'] > img{
        left: -100%;
    }

    .front-content {
        width: 100%;
        height: var(--height);
        top: calc(-0.4rem - var(--height));
        position: relative;
        padding: 0.5rem;
        display: grid;
    }

    .section-path-data {
        margin-top: auto;
    }

    .section-path {
        line-height: 2rem;
    }

    .section-path-data * {
        color: var(--default-color);
        background-color: var(--sub-color);
        padding: 0.25rem;
        margin: 0.25rem 0;
        width: fit-content;
        text-transform: uppercase;
        display: flex;
    }

    .gl-version {
        color: var(--default-color);
        font-weight: 700;
    }
</style>