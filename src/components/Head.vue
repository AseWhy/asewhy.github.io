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
                    <h4> {{ path }} </h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { EVD_SECTION_LOAD_START, EVD_PAGE_LOAD_OK } from '@/data/scripts/events-types.js';
    import { GlitchProgram } from '@/data/programs/glitch.js';

    export default {
        name: 'v-head',

        data(){
            return {
                name: 'Pending...',
                path: 'Pending...'
            }
        },

        mounted(){
            this.$app.ImageHandler.draw(this.$refs.rendertarget);

            window.addEventListener(EVD_PAGE_LOAD_OK, e => {
                if(Array.isArray(e.detail.header)) {
                    this.$app.ImageHandler.setTexture(e.detail.header[Math.floor(Math.random() * e.detail.header.length)]);
                } else {
                    this.$app.ImageHandler.setTexture(e.detail.header);
                }
            });

            window.addEventListener(EVD_SECTION_LOAD_START, e => {
                this.$set(this.$data, 'name', e.detail.path[0]);
                this.$set(this.$data, 'path', e.detail.path.join('/'));
            });

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