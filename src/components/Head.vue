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
                </div>
                <div class="section-date" v-if="pageError.status ? false : pageSection.date != null">
                    От {{ pageSection.date }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { ImageHandler } from '@/data/scripts/main';
    import { GlitchProgram } from '@/data/programs/glitch';

    import { mapGetters } from 'vuex';

    export default {
        name: 'v-head',

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

    .section-path-data * {
        color: var(--default-color);
        background-color: var(--sub-color);
        padding: 0.25rem;
        margin: 0.25rem 0;
        width: fit-content;
        text-transform: uppercase;
    }

    .gl-version {
        color: var(--default-color);
        font-weight: 700;
    }
</style>