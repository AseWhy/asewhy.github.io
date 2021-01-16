<template>
    <div class="head">
        <canvas ref="rendertarget" class='render-header'>

        </canvas>

        <div class="front-content">
            <div class="gl-version"> Powered by WebGL 2.0 </div>

            <div class="section-path-data">
                <div class="section-name"> 
                    <h2> {{ name }} </h2>    
                </div>
                <div class="section-path">
                    {{ path }}
                </div>
                <div class="section-date" v-if="date != null">
                    От {{ date }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { EVD_SECTION_LOAD_OK, EVD_PAGE_LOAD_OK, EVD_PAGE_LOAD_ERROR } from '@/data/scripts/events-types.js';
    import { GlitchProgram } from '@/data/programs/glitch.js';

    export default {
        name: 'v-head',

        data(){
            return {
                name: 'Pending...',
                path: 'Pending...',
                date: 'Pending...'
            }
        },

        mounted(){
            this.$app.ImageHandler.draw(this.$refs.rendertarget);

            // Загрузка страницы прошла успешно
            this.$app.PageManager.on(EVD_PAGE_LOAD_OK, e => {
                if(!e.currently)
                    if(Array.isArray(e.header)) {
                        this.$app.ImageHandler.setTexture(e.header[ Math.floor(Math.random() * e.header.length) ]);
                    } else {
                        this.$app.ImageHandler.setTexture(e.header);
                    }
            });

            // Загрузка не прошла без ошибок
            this.$app.PageManager.on(EVD_PAGE_LOAD_ERROR, e => {
                this.$set(this, 'name', 'Error');
                this.$set(this, 'path', 'Error/' + e.code + '/' + e.message);
            });

            // Загрузка страницы была успешной
            this.$app.PageManager.on(EVD_SECTION_LOAD_OK, e => {
                this.$set(this, 'name', e.path[0]);
                this.$set(this, 'path', e.path.join('/'));
                this.$set(this, 'date', e.modified ? e.modified.toLocaleDateString() : null);
            });

            // Начинаем обработку этого холста
            this.$app.ImageHandler.enable(GlitchProgram);
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