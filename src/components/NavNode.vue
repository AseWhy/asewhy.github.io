<template>
    <div class="nav-member">
        <div class="node-cont" v-for="(node, index) in children" :key="node.target + '~' + index">
            <button
                class="nav-action"
                :a-href="node.target"
            >
                {{ node.label }}
            </button>

            <nav-node
                v-if="node.children != null && node.children.length > 0"

                :children="node.children" 
            />
        </div>
    </div>
</template>

<script>    
    export default {
        name: 'nav-node',

        props: [ 'children' ]
    }
</script>

<style>
    .nav-action {
        border: none;
        background-color: var(--default-color);
        color: var(--sub-color);
        padding: 0.25rem 0.5rem;
        margin: 1pt 0;
        width: 100%;
        text-align: left;
    }

    .nav-action:hover {
        background-color: var(--default-dirty-color);
    }
</style>