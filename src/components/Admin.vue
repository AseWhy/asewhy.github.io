<template>
    <div class="admin-controls">
        <main-page v-if="adminData.route === 'index'"/>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    import MainPage from './admin/MainPage'

    export default {
        name: 'v-admin',

        components: {
            'main-page': MainPage
        },

        methods: mapActions([ 'showBackButton', 'disableAdminMode', 'restoreOriginalsButtons' ]),

        computed: mapGetters([ 'adminData' ]),

        mounted(){
            const _ = this;

            _.showBackButton(() => {
                _.restoreOriginalsButtons();
                _.disableAdminMode();
            });
        }
    }
</script>

<style>

</style>