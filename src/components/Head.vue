<template>
    <div class="head">
        <img
            class='render-header'
            :src="Array.isArray(pageData.header) ? pageData.header[Math.floor(Math.random() * pageData.header.length)] : pageData.header" 
            v-if="!isWebGlSupports"
        />
        <canvas 
            ref="rendertarget" 
            class='render-header' 
            :src='Array.isArray(pageData.header) ? pageData.header[Math.floor(Math.random() * pageData.header.length)] : pageData.header'
            v-if="isWebGlSupports"
        />

        <head-front/>
    </div>
</template>

<script>
    import { ImageHandler } from '@/data/scripts/main';
    import { GlitchProgram } from '@/data/programs/glitch';

    import { mapGetters } from 'vuex';
    import Front from './head/Front';

    export default {
        name: 'v-head',

        components: {
            'head-front': Front
        },

        computed: mapGetters([ 'pageData', 'isWebGlSupports' ]),

        updated() {
            if(this.isWebGlSupports) {
                ImageHandler.setTexture(this.$refs.rendertarget.getAttribute('src'));
            }
        },

        mounted() {
            if(this.isWebGlSupports) {
                // Рисуем по ссылке на холсте
                ImageHandler.draw(this.$refs.rendertarget);
                // Начинаем обработку этого холста
                ImageHandler.enable(GlitchProgram);
            }
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
</style>