<template>
    <div class="front-content">
        <div class="gl-version"> Powered by WebGL 2.0 </div>

        <div class="section-info-data">
            <left-side/>
        </div>
    </div>
</template>


<script>
    import LeftSide from './LeftSide.vue'

    export default {
        components: {
            LeftSide
        },

        name: 'head-front'
    }
</script>

<style>
    .front-content {
        width: 100%;
        height: var(--height);
        top: calc(-0.4rem - var(--height));
        position: relative;
        padding: 0.5rem;
        display: grid;
    }

    .gl-version {
        color: var(--default-color);
        font-weight: 700;
    }

    .section-info-data {
        margin-top: auto;
        display: grid;
        grid-template-areas: '. .';
    }
</style>
